import { ArgsType } from "./cache"
import { delay } from "./delay"

export interface RateLimiterOptions<F extends (...args: unknown[]) => Promise<unknown>> {
    rateLimitId: (...args: ArgsType<F>) => string
    concurrentRequests?: ((rateLimitId: string) => number) | number
    maxTotalRequests?: number
}

/**
 * Controls how many concurrent execution can be invoked. At any given time
 * @param errorHandler logic when to retry
 * @param request request function
 * @signature
 *    P.concurrent(fn, options)
 * @example
 *    const requestToEndpoint = async (endpoint: "A" | "B" | "C" | "D", data: any) => { ...  } 
 *    const rate = P.concurrent(requestToEndpoint, ({ rateLimitId: (endpoint) => endpoint, concurrentRequests: 2 })
 *    // Only two request are fired to endpoint A
 *    const endpoints = await Promise.all([{ endpoint: A, data: any }, ...].map(async (obj)=>{ 
 *      return rate(obj.endpoint, obj.data)
 *    }))
 * @category Utility, Promise
 */
export function concurrent<F extends (...args: unknown[]) => Promise<unknown>>(request: F, options: RateLimiterOptions<F>): F {
    const requestCount: Record<string, number> = {}
    const stats = {
        totalRequests: 0
    }

    const requestMiddleware = (async (...args) => {
        while (stats.totalRequests >= 50) {
            await delay(0)
        }
        const namespace = options.rateLimitId(...args as ArgsType<F>)
        if (requestCount[namespace] == null) {
            requestCount[namespace] = 0
        }

        const maxRequests = typeof options.concurrentRequests === 'function' ? options.concurrentRequests(namespace) : options.concurrentRequests ?? 3
        while (requestCount[namespace] >= maxRequests) {
            await delay(0)
        }
        requestCount[namespace] += 1
        stats.totalRequests += 1

        return request(...args).finally(() => {
            requestCount[namespace] -= 1
            stats.totalRequests -= 1
        })
    }) as F


    return requestMiddleware
}