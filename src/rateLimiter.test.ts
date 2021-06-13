import { concurrent } from './rateLimiter';
import { range } from './range';
import { delay } from './delay';

describe("rateLimiter", () => {

    test("Check if correct logic", async () => {
        const request = {
            a: 0,
            b: 0
        }
        const mainCall = async (endpoint: keyof typeof request) => {
            request[endpoint]++
            await delay(100)
            expect(request[endpoint] <= 10).toEqual(true)
            expect(request.a + request.b).toBeLessThanOrEqual(15)
            return ""
        }

        const rateLimited = concurrent(mainCall, {
            concurrentRequests: 10,
            maxTotalRequests: 15,
            rateLimitId: (q) => q
        })

        await Promise.all(
            range(0, 100).map(async (index) => {
                const id = index % 2 === 0 ? "a" : "b"
                await rateLimited(id)
                request[id]--
                return
            })
        )

    })
})