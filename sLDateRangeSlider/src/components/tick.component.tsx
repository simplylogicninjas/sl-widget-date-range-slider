import React, { createElement } from "react";
import { SliderItem } from "react-compound-slider";

interface Props {
    key: string;
    tick: SliderItem;
    count: number;
    format: Function;
}

const SliderTick = ({ tick, count, format }: Props) => {
    const dynamicStyle = {
        "--tick-position": `${tick.percent}%`,
        "--tick-width": `${100 / count}%`,
        "--tick-margin-left": `${-(100 / count) / 2}%`
    } as React.CSSProperties;

    return (
        <React.Fragment>
            <div className={`slider-tick`} style={dynamicStyle}>
                <div className={"slider-tick__indicator"} />
                {format(tick.value)}
            </div>
        </React.Fragment>
    );
};

export default SliderTick;
