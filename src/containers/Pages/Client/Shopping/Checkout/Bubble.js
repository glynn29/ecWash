import React from "react";

import * as classes from "./Checkout.module.css";

export const Bubble = ({ left = 10, top = 10, size = 60 }) => (
    <div className={classes.Bubble} style={{ top: top + '%', left: left + '%', height: size + 'px', width: size + 'px' }}>
        <div><span className={classes.Dot}></span></div>
    </div>
);
