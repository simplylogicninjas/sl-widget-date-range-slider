export type TimeUnit = "second" | "hour" | "minute" | "hour" | "day" | "week" | "month" | "year";

export interface DateRangeSliderValue {
    id: string;
    value: Date;
}

export interface DateRangeSliderItem {
    id: string;
    handleId: string;
    value: number;
}

export interface DateRangeDisabledInterval {
    start: Date;
    end: Date;
}

export interface DateRangeSliderProps {
    disabled: boolean;
    stepUnit: TimeUnit;
    stepSize: number;
    showTicks: boolean;
    tickIntervalUnit: TimeUnit;
    tickFormat: string;
    tooltipFormat?: string;
    lockStep: boolean;
    min: Date;
    max: Date;
    mode: 1 | 2;
    enableTooltip: boolean;
    values: DateRangeSliderValue[];
    disabledIntervals: DateRangeDisabledInterval[];
    onChange?: (item: DateRangeSliderItem) => void;
}
