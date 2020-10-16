import { normalizeString } from "./normalizeString"

test('Normalize string', () => {
    expect(normalizeString('Čiabuviai  $#%')).toEqual("ciabuviai")
    expect(normalizeString('@ŽČĘĖĮŠŲŪ();;\'  $#%')).toEqual("zceeisuu")
    expect(normalizeString('Andrius Mozūraitis')).toEqual("andriusmozuraitis")
})