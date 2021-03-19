import { deepMergeRight } from "./deepMerge";
import { entries } from "./entries";
import { isOneOf } from "./isOneOf";
import { toDate } from "./parse";
import { DeepPartial } from "./types";

interface PrettyMs {
    days: { unit: string },
    hours: { unit: string },
    minutes: { unit: string },
    seconds: { unit: string }
}

// P.Time.Day(200)
export namespace Time {
    /**
     * Converts seconds to milliseconds
     */
    export function Second(seconds: number) {
        return seconds * 1000;
    }

    /**
     * Converts minutes to milliseconds
     */
    export function Minute(minutes: number) {
        return Second(minutes) * 60;
    }

    /**
     * Converts hours to milliseconds
     */
    export function Hour(h: number) {
        return Minute(h) * 60;
    }

    /**
     * Converts days to milliseconds
     */
    export function Day(d: number) {
        return Hour(d) * 24;
    }
}

export function prettyMs(milliseconds: number, options?: DeepPartial<PrettyMs>): string {
    const seconds = Math.floor(milliseconds / 1000)
    const d_seconds = Math.floor(milliseconds / 1000) % 60
    const minutes = (seconds - d_seconds) / 60
    const d_minutes = minutes % 60
    const hours = (minutes - d_minutes) / 60

    const d_hours = hours % 24
    const days = (hours - d_hours) / 24

    const val = {
        seconds: d_seconds,
        minutes: d_minutes,
        hours: d_hours,
        days: days
    }

    const defaultUnit = {
        days: { unit: 'd' },
        hours: { unit: 'h' },
        minutes: { unit: 'min' },
        seconds: { unit: 's' }
    }

    const merged = deepMergeRight(defaultUnit, options || {})


    const entriesV = entries(merged)
        .filter(([k]) => {
            return isOneOf(k, ['days', 'hours', 'minutes', 'seconds'])
        })
        .filter(([k]) => {
            return val[k]
        })
        .map(([k, v]) => {
            return `${val[k]}${v.unit}`
        }).join(" ")

    return entriesV
}


/**
 * 
 * @param date 
 * @param from - {optional} time diff 
 */
export function prettyTimeDiff(date: number | Date | string, from: number = Date.now()): string {
    const validDate = toDate(date)
    if (validDate == null) {
        throw new Error(`${date} is not valid date format`)
    }

    const dateDiff = (from - validDate.getTime())
    const delta = Math.floor(dateDiff / 1000);
    const minute = 60,
        hour = minute * 60,
        day = hour * 24


    if (delta > 0) {
        if (delta < 30) return 'just now';

        if (delta < minute) return delta + ' seconds ago';

        if (delta < 2 * minute) return 'a minute ago'


        if (delta < hour) return Math.floor(delta / minute) + ' minutes ago';

        if (Math.floor(delta / hour) == 1) return '1 hour ago'

        if (delta < day) return Math.floor(delta / hour) + ' hours ago';

        if (delta < day * 2) return 'yesterday';

        return Math.floor(delta / day) + ' days ago';
    }

    const posDelta = Math.abs(delta)

    if (posDelta < 30) return 'just now';

    if (posDelta < minute) return `after ${delta} seconds`;

    if (posDelta < 2 * minute) return 'after one minute'
    if (posDelta < hour) return `after ${Math.floor(posDelta / minute)} minutes`;

    if (Math.floor(posDelta / hour) == 1) return 'after one hour'

    if (posDelta < day) return `after ${Math.floor(posDelta / hour)} hours`;

    if (posDelta < day * 2) return 'tomorrow';

    return `after ${Math.floor(delta / day)} days`;
}
