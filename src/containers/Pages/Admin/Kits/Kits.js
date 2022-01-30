import React, { useState } from "react";
import { firestore } from "../../../../firebase";

const Kits = () => {
    const [jsonData, setJson] = useState(null);

    function trim(thing) {
        return thing.trim();
    }

    function lowerCase(thing) {
        const firstLetter = thing.charAt(0);
        const lowerCaseWord = thing.substring(1, thing.length)
            .toLowerCase();
        console.log(firstLetter + lowerCaseWord);
        return firstLetter + lowerCaseWord;
    }

    const insertRow = (row, batch) => {
        const name = trim(row.name);
        const category = lowerCase(trim(row.category));

        const partRef = firestore.collection('parts')
            .doc();
        batch.set(partRef, {
            name,
            category,
            amount: 1
        });
    };

    async function parser() {
        var dataList = JSON.parse(jsonData);
        let count = 0;
        let batch;
        const list = dataList.Sheet1;

        for (let i = 0; i < list.length; i++) {
            const row = list[i];
            if (count === 0) {
                console.log("creating new batch");
                batch = firestore.batch();
            }
            count++;
            console.log(row, count);

            insertRow(row, batch);
            if (count === 300 || i === list.length -1) {
                console.log("committing");
                await batch.commit()
                    .then(function () {
                        count = 0;
                        console.log("commited");
                    })
                    .catch(error => console.log(error));
            }
        }
    }

    return (
        <div style={{margin: 'auto', width: '200px'}}>
            <ol>
                <li>download excel sheet</li>
                <li>Go to <a
                    href={'https://beautifytools.com/excel-to-json-converter.php'}>https://beautifytools.com/excel-to-json-converter.php</a>
                </li>
                <li>click 'Browse' and select you excel sheet</li>
                <li>select all (ctr + a) the JSON that appeared and copy it</li>
                <li>Paste it into this text box below and click upload</li>
                <li>Magic</li>
            </ol>
            <textarea onChange={(event => setJson(event.target.value))} rows={30} cols={30}/>
            <button onClick={parser}>Upload</button>
        </div>
    );
};

export default Kits;
