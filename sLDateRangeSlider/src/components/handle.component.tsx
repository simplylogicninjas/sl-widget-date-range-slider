import { format } from "date-fns";
import React, { createElement, useEffect, useState } from "react";
import { GetHandleProps, SliderItem } from "react-compound-slider";

interface Props {
    key: string;
    handle: SliderItem;
    domain: number[];
    disabled?: boolean;
    showTooltip: boolean;
    tooltipFormat: string;
    getHandleProps: GetHandleProps;
    onFocus: (handleId: string) => void;
}

const formatTooltip = (ms: number, tooltipFormat: string) => {
    return format(new Date(ms), tooltipFormat);
};

const SliderHandle = ({
    handle: { id, value, percent },
    domain: [min, max],
    disabled,
    showTooltip,
    tooltipFormat,
    getHandleProps,
    onFocus
}: Props) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const dynamicStyle = {
        "--handle-position": `${percent}%`
    } as React.CSSProperties;

    useEffect(() => {
        document.addEventListener("pointerup", () => setTooltipVisible(false));

        return () => {
            document.removeEventListener("pointerup", () => setTooltipVisible(false));
        };
    }, []);

    return (
        <React.Fragment>
            <button
                className={`slider-handle ${disabled ? "is-disabled" : ""}`}
                style={dynamicStyle}
                role={"slider"}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                disabled={disabled}
                onFocus={() => {
                    onFocus(id);
                    setTooltipVisible(true);
                }}
                onBlur={() => setTooltipVisible(false)}
                onPointerDown={() => setTooltipVisible(true)}
                {...getHandleProps(id)}
            >
                {showTooltip && (
                    <div
                        role={"tooltip"}
                        className={`slider-handle__tooltip ${tooltipVisible ? "slider-handle__tooltip--visible" : ""}`}
                    >
                        {formatTooltip(value, tooltipFormat)}
                    </div>
                )}
                <div className={"slider-handle__inner"} />
            </button>
        </React.Fragment>
    );
};

export default SliderHandle;
