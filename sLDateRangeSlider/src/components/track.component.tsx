import classNames from "classnames";
import React, { createElement } from "react";
import { GetTrackProps, SliderItem } from "react-compound-slider";

interface Props {
    key: string;
    source: SliderItem;
    target: SliderItem;
    disabled?: boolean;
    error?: boolean;
    getTrackProps: GetTrackProps;
}

const SliderTrack = ({ source, target, disabled, error, getTrackProps }: Props) => {
    const dynamicStyle = {
        "--track-width": `${target.percent - source.percent}%`,
        "--track-position": `${source.percent}%`
    } as React.CSSProperties;

    const className = classNames({
        "slider-track": true,
        "slider-track--disabled": !!disabled,
        "slider-track--error": !!error
    });

    return <div className={className} style={dynamicStyle} {...getTrackProps()} />;
};

export default SliderTrack;
