import React, { createElement } from "react";
import { SliderItem } from "react-compound-slider";

interface Props {
    key: string;
    tick: SliderItem;
    count: number;
}

const SliderTickPoint = ({ tick, count }: Props) => {
    const dynamicStyle = {
        "--tick-position": `${tick.percent}%`,
        "--tick-width": `${100 / count}%`,
        "--tick-margin-left": `${-(100 / count) / 2}%`
    } as React.CSSProperties;

    return (
        <React.Fragment>
            <svg className={"slider-tick-point"} style={dynamicStyle} viewBox="0 0 50 50">
                <circle cx="50" cy="50" r="50" />
            </svg>
        </React.Fragment>
    );
};

export default SliderTickPoint;
