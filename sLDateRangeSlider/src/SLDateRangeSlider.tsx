import { ReactElement, createElement, useEffect, useState } from "react";

import { SLDateRangeSliderContainerProps } from "../typings/SLDateRangeSliderProps";
import DateRangeSlider from "./components/date-range-slider.component";
import {
    DateRangeDisabledInterval,
    DateRangeSliderItem,
    DateRangeSliderProps,
    DateRangeSliderValue
} from "./components/date-range-slider.interface";

import "./ui/SLDateRangeSlider.css";

export function SLDateRangeSlider(props: SLDateRangeSliderContainerProps): ReactElement {
    const [dateRangeSliderProps, setDateRangeSliderProps] = useState<DateRangeSliderProps>();

    const getDisabledIntervals = (): DateRangeDisabledInterval[] => {
        const { disabledIntervals, disabledIntervalStart, disabledIntervalEnd } = props;

        if (disabledIntervals && disabledIntervals.items && disabledIntervalStart && disabledIntervalEnd) {
            return disabledIntervals.items.map(item => {
                const start = disabledIntervalStart.get(item).value ?? new Date();
                const end = disabledIntervalEnd.get(item).value ?? new Date();

                return {
                    start,
                    end
                };
            });
        } else {
            return [];
        }
    };

    const updateDateRangeSliderProps = () => {
        const { maxDate, minDate, handles, tickFormat } = props;

        if (maxDate.value && minDate.value) {
            const values: DateRangeSliderValue[] = handles.map(item => {
                return {
                    id: item.handleId,
                    value: item.handleValue.value ?? new Date()
                };
            });

            const updatedDateRangeSliderProps: DateRangeSliderProps = {
                disabled: props.handles.every(handle => handle.handleValue.readOnly),
                tickIntervalUnit: props.tickIntervalUnit,
                stepUnit: props.stepUnit,
                stepSize: props.stepSize,
                showTicks: props.showTicks,
                tickFormat,
                tooltipFormat: props.tooltipFormat,
                lockStep: props.lockStep,
                mode: 2,
                enableTooltip: props.tooltip,
                max: maxDate.value,
                min: minDate.value,
                values,
                disabledIntervals: getDisabledIntervals()
            };

            setDateRangeSliderProps({ ...updatedDateRangeSliderProps });
        }
    };

    const onSliderValueChange = (item: DateRangeSliderItem) => {
        const handleObject = props.handles.find(it => it.handleId === item.id);

        if (handleObject) {
            handleObject.handleValue.setValue(new Date(item.value));
            if (handleObject.handleAction && handleObject.handleAction.canExecute) {
                handleObject.handleAction.execute();
            }
        }
    };

    useEffect(() => {
        updateDateRangeSliderProps();
    }, [props.maxDate.value, props.minDate.value, props.disabledIntervals?.items]);

    return (
        <div id={props.name} className={props.class} style={props.style}>
            {dateRangeSliderProps && (
                <DateRangeSlider {...dateRangeSliderProps} onChange={item => onSliderValueChange(item)} />
            )}
        </div>
    );
}
