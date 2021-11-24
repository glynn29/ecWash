import React, { useState, useEffect } from "react";

export default function useFetch(firebaseRef) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            let tempData = [];
            setLoading(true);
            const response = await firebaseRef.get();
            response.forEach(order => {
                tempData.push({...order.data(), id: order.id});
            });
            setLoading(false);
            setData(tempData);
        })();
    }, []);

    return [data, isLoading];
}
