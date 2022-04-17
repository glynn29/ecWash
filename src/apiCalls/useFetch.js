import React, { useEffect, useState } from "react";

export default function useFetch(firebaseRef) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            let tempData = [];
            setLoading(true);
            const response = await firebaseRef.get();
            response.forEach(row => {
                tempData.push({...row.data(), id: row.id});
            });
            setLoading(false);
            setData(tempData);
        })();
    }, []);

    return [data, isLoading];
}
