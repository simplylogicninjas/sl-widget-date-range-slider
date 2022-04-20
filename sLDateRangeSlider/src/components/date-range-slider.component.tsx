import React, { createElement, useCallback, useRef, useState } from "react";
import { Handles, Rail, Slider, Ticks, Tracks } from "react-compound-slider";
import { format } from "date-fns";
import { DateRangeSliderItem, DateRangeSliderProps } from "./date-range-slider.interface";
import SliderHandle from "./handle.component";
import SliderRail from "./rail.component";
import SliderTrack from "./track.component";
import SliderTick from "./tick.component";
import { getDisabledIntervals, getStepValue, getTotalTicks, lockStepMode, validateValues } from "src/utils/utils";

const DateRangeSlider = (props: DateRangeSliderProps) => {
    const [rangeHasError, setRangeHasError] = useState(false);
    const handlesRef = useRef<DateRangeSliderItem[]>([]);
    const activeHandleIdRef = useRef<string>();
    const domain = [+props.min, +props.max];
    const disabledTracks = getDisabledIntervals(props.disabledIntervals, props.min, props.max);

    const ticks = getTotalTicks(props.tickIntervalUnit, domain, props.max);
    const stepSize = getStepValue(props.values[0].value, props.stepUnit, props.stepSize);

    const formatTick = (ms: number) => {
        return format(new Date(ms), props.tickFormat);
    };

    const onValueChange = () => {
        handlesRef.current.forEach(handle => {
            if (props.onChange) {
                props.onChange(handle);
            }
        });
    };

    const checkForRangeError = useCallback(() => {
        if (disabledTracks?.length) {
            const changedValues = handlesRef.current.map(it => it.value);

            setRangeHasError(
                disabledTracks.some(({ source, target }) => validateValues(changedValues, source, target))
            );
        }
    }, [disabledTracks]);

    return (
        <div className={"slider"}>
            <Slider
                mode={props.lockStep ? (curr, next) => lockStepMode(curr, next, domain) : props.mode}
                step={stepSize}
                domain={domain}
                values={props.values.map(v => +v.value)}
                disabled={props.disabled}
            >
                <Rail>
                    {({ getRailProps }) => <SliderRail disabled={props.disabled} getRailProps={getRailProps} />}
                </Rail>
                <Handles>
                    {({ handles, getHandleProps }) => {
                        handles.forEach(handle => {
                            const handleRef = handlesRef.current.find(it => it.handleId === handle.id);

                            if (handleRef && handleRef.value !== handle.value) {
                                onValueChange();
                            }
                        });

                        handlesRef.current = handles.map((item, index) => {
                            return {
                                id: props.values[index].id,
                                handleId: item.id,
                                value: item.value
                            };
                        });

                        checkForRangeError();

                        return (
                            <React.Fragment>
                                {handles.map(handle => (
                                    <SliderHandle
                                        disabled={props.disabled}
                                        key={handle.id}
                                        handle={handle}
                                        domain={domain}
                                        getHandleProps={getHandleProps}
                                        showTooltip={props.enableTooltip}
                                        tooltipFormat={props.tooltipFormat ? props.tooltipFormat : "dd-MM-yyyy"}
                                        onFocus={handleId => {
                                            activeHandleIdRef.current = handleId;
                                        }}
                                    />
                                ))}
                            </React.Fragment>
                        );
                    }}
                </Handles>
                <Tracks left={false} right={false}>
                    {({ tracks, getTrackProps }) => (
                        <React.Fragment>
                            {tracks.map(({ id, source, target }) => (
                                <SliderTrack
                                    disabled={props.disabled}
                                    error={rangeHasError}
                                    key={id}
                                    source={source}
                                    target={target}
                                    getTrackProps={getTrackProps}
                                />
                            ))}
                        </React.Fragment>
                    )}
                </Tracks>

                {disabledTracks && (
                    <Tracks left={false} right={false}>
                        {({ getTrackProps }) => (
                            <React.Fragment>
                                {disabledTracks.map(({ id, source, target }) => (
                                    <SliderTrack
                                        disabled
                                        key={id}
                                        source={source}
                                        target={target}
                                        getTrackProps={getTrackProps}
                                    />
                                ))}
                            </React.Fragment>
                        )}
                    </Tracks>
                )}

                {
                    props.showTicks && (
                        <Ticks values={ticks}>
                            {({ ticks }) => (
                                <React.Fragment>
                                    {ticks.map(tick => (
                                        <SliderTick key={tick.id} tick={tick} count={ticks.length} format={formatTick} />
                                    ))}
                                </React.Fragment>
                            )}
                        </Ticks>
                    )
                }
            </Slider>
        </div>
    );
};

export default DateRangeSlider;
