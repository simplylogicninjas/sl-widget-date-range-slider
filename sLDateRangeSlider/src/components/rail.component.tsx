import React, { createElement } from "react";
import { GetRailProps } from "react-compound-slider";

const SliderRail = ({ getRailProps, disabled }: { getRailProps: GetRailProps; disabled: boolean }) => {
    return (
        <React.Fragment>
            <div
                className={`slider-rail slider-rail--outer ${disabled ? "slider-rail--disabled" : ""}`}
                {...getRailProps()}
            />
            <div className={"slider-rail slider-rail--inner"} />
        </React.Fragment>
    );
};

export default SliderRail;
