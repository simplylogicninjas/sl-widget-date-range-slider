/**
 * This file was generated from SLDateRangeSlider.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue } from "mendix";

export interface HandlesType {
    handleId: string;
    handleValue: EditableValue<Date>;
    handleAction?: ActionValue;
}

export type StepUnitEnum = "second" | "minute" | "hour" | "day" | "week" | "month" | "year";

export type TickIntervalUnitEnum = "second" | "minute" | "hour" | "day" | "week" | "month" | "year";

export interface HandlesPreviewType {
    handleId: string;
    handleValue: string;
    handleAction: {} | null;
}

export interface SLDateRangeSliderContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    minDate: EditableValue<Date>;
    maxDate: EditableValue<Date>;
    handles: HandlesType[];
    tooltip: boolean;
    tooltipFormat: string;
    disabledIntervals?: ListValue;
    disabledIntervalStart?: ListAttributeValue<Date>;
    disabledIntervalEnd?: ListAttributeValue<Date>;
    stepUnit: StepUnitEnum;
    stepSize: number;
    lockStep: boolean;
    showTicks: boolean;
    tickIntervalUnit: TickIntervalUnitEnum;
    tickFormat: string;
}

export interface SLDateRangeSliderPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    minDate: string;
    maxDate: string;
    handles: HandlesPreviewType[];
    tooltip: boolean;
    tooltipFormat: string;
    disabledIntervals: {} | { type: string } | null;
    disabledIntervalStart: string;
    disabledIntervalEnd: string;
    stepUnit: StepUnitEnum;
    stepSize: number | null;
    lockStep: boolean;
    showTicks: boolean;
    tickIntervalUnit: TickIntervalUnitEnum;
    tickFormat: string;
}
