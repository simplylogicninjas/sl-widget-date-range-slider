import * as d3 from "d3";
import React, { createElement } from "react";
import { Ticks } from "react-compound-slider";
import SliderTickPoint from "./tick-point.component";

interface Props {
    max: Date;
    domain: number[];
}

const TicksOnRail = ({ domain, max }: Props) => {
    const sliderTicks = d3
        .scaleTime()
        .domain(domain)
        .nice()
        .ticks(d3.timeWeek)
        .filter(it => it < max)
        .map(date => +date);

    return (
        <Ticks values={sliderTicks}>
            {({ ticks }) => (
                <React.Fragment>
                    {ticks.map(tick => (
                        <SliderTickPoint key={tick.id} tick={tick} count={ticks.length} />
                    ))}
                </React.Fragment>
            )}
        </Ticks>
    );
};

export default TicksOnRail;
