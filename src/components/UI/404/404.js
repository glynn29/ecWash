import React, {useEffect, useState} from "react";

import image from "../../../assets/images/obi-wan.jpg"

const Page404 = () => {
    const [error, setError] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setError(true);
        }, 1000)
    }, []);
    return(
        error ?
            <div style={{textAlign: 'center'}}>
                <h1>This is not the page you are looking for</h1>
                <img src={image} alt={"Jedi"}/>
            </div>
            :
            <div> </div>
    );
};

export default Page404;
