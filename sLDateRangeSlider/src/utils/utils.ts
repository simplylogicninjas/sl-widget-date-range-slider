import {
    addDays,
    addHours,
    addMinutes,
    addMonths,
    addSeconds,
    addWeeks,
    addYears,
    differenceInMilliseconds,
    format,
    isAfter,
    isBefore
} from "date-fns";
import { SliderItem, HandleItem } from "react-compound-slider";
import * as d3 from "d3";
import { DateRangeDisabledInterval, TimeUnit } from "src/components/date-range-slider.interface";

export const formatTick = (ms: number, formatToken = "MMM dd"): string => {
    return format(new Date(ms), formatToken);
};

export const createSliderItem =
    (timelineStart: Date, timelineLength: number) =>
    (id: string, date: Date): SliderItem => {
        const percent = (differenceInMilliseconds(date, timelineStart) / timelineLength) * 100;
        const value = +format(date, "T");

        return {
            id,
            percent,
            value
        };
    };

export const getDisabledIntervals = (
    disabledIntervals: DateRangeDisabledInterval[],
    startInterval: Date,
    endInterval: Date
): Array<{
    id: string;
    source: SliderItem;
    target: SliderItem;
}> | null => {
    if (!disabledIntervals.length) {
        return null;
    }

    const timelineLength = differenceInMilliseconds(endInterval, startInterval);
    const getSliderItem = createSliderItem(startInterval, timelineLength);

    return disabledIntervals.map((interval, index) => {
        let { start, end } = interval;

        if (isBefore(start, startInterval)) {
            start = startInterval;
        }
        if (isAfter(end, endInterval)) {
            end = endInterval;
        }

        return {
            id: `disabled-track-${index}`,
            source: getSliderItem(`disabled-source-${index}`, start),
            target: getSliderItem(`disabled-target-${index}`, end)
        };
    });
};

export const validateValues = (values: number[], source: SliderItem, target: SliderItem): boolean => {
    const start = values[0];
    const end = values[1];
    const startInterval = source.value;
    const endInterval = target.value;

    if ((startInterval > start && endInterval <= end) || (startInterval >= start && endInterval < end)) {
        return true;
    }

    if (start >= startInterval && end <= endInterval) {
        return true;
    }

    const isStartInBlockedInterval = start > startInterval && start < endInterval && end >= endInterval;
    const isEndInBlockedInterval = end < endInterval && end > startInterval && start <= startInterval;

    return isStartInBlockedInterval || isEndInBlockedInterval;
};

export const getStepValue = (startDate: Date, timeUnit: TimeUnit, total = 1): number => {
    switch (timeUnit) {
        case "second":
            return differenceInMilliseconds(addSeconds(startDate, total), startDate);
        case "minute":
            return differenceInMilliseconds(addMinutes(startDate, total), startDate);
        case "hour":
            return differenceInMilliseconds(addHours(startDate, total), startDate);
        case "day":
            return differenceInMilliseconds(addDays(startDate, total), startDate);
        case "week":
            return differenceInMilliseconds(addWeeks(startDate, total), startDate);
        case "month":
            return differenceInMilliseconds(addMonths(startDate, total), startDate);
        case "year":
            return differenceInMilliseconds(addYears(startDate, total), startDate);
        default:
            return 0;
    }
};

const getNewValues = (curr: HandleItem[], next: HandleItem[], domain: number[]): HandleItem[] => {
    const currFirst = curr[0];
    const currLast = curr[curr.length - 1];
    const nextFirst = next[0];
    const nextLast = next[next.length - 1];

    if (nextFirst.key === nextLast.key) {
        return [...next];
    }

    const differenceInMilliseconds = currLast.val - currFirst.val;

    const firstHandleChanged = currFirst.val !== nextFirst.val;
    const lastHandleChanged = currLast.val !== nextLast.val;

    if (firstHandleChanged) {
        const nextLastVal = nextFirst.val + differenceInMilliseconds;

        if (nextLastVal > domain[1]) {
            return [...curr];
        }

        nextLast.val = nextLastVal;
    }

    if (lastHandleChanged) {
        const nextFirstVal = nextLast.val - differenceInMilliseconds;

        if (nextFirstVal < domain[0]) {
            return [...curr];
        }

        nextFirst.val = nextFirstVal;
    }

    return [...next];
};

export const lockStepMode = (curr: HandleItem[], next: HandleItem[], domain: number[]): HandleItem[] => {
    if (JSON.stringify(curr) !== JSON.stringify(next)) {
        return getNewValues(curr, next, domain);
    }

    return [...next];
};

export const getTotalTicks = (intervalUnit: TimeUnit, domain: number[], max: Date): number[] => {
    const ticksInterval: { [key: string]: d3.CountableTimeInterval } = {
        second: d3.timeSecond,
        minute: d3.timeMinute,
        hour: d3.timeHour,
        day: d3.timeDay,
        month: d3.timeMonth,
        week: d3.timeWeek,
        year: d3.timeYear
    };

    return d3
        .scaleTime()
        .domain(domain)
        .nice()
        .ticks(ticksInterval[intervalUnit])
        .filter(it => it < max)
        .map(date => +date);
};
