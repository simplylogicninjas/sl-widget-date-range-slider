import { ReactElement, createElement } from "react";
import { SLDateRangeSliderPreviewProps } from "../typings/SLDateRangeSliderProps";

export function preview(_: SLDateRangeSliderPreviewProps): ReactElement {
    return <div />;
}

export function getPreviewCss(): string {
    return require("./ui/SLDateRangeSlider.css");
}
