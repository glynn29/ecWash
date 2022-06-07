import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";

import image from "../../../assets/images/obi-wan.jpg"

const Page404 = () => {
    const [error, setError] = useState(false);

    useEffect(() => {
        const time = setTimeout(() => {
            setError(true);
        }, 1000);
        return () => {
            clearTimeout(time);
        };
    }, []);

    return (
        error ?
            <div style={{ textAlign: 'center' }}>
                <Typography variant={"h4"}>This is not the page you are looking for...</Typography>
                <img src={image} alt={"Oops"} />
            </div>
            :
            <div> </div>
    );
};

export default Page404;
