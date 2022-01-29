import React, {useState} from "react";
import {firestore} from "../../../../firebase";

const Kits = () => {
    const [jsonData, setJson] = useState(null);

    function trim(thing) {
        return thing.trim();
    }

     function lowerCase(thing) {
        const firstLetter = thing.charAt(0);
        const lowerCaseWord = thing.substring(1, thing.length).toLowerCase();
        console.log(firstLetter + lowerCaseWord);
        return firstLetter + lowerCaseWord;
     }

    const insertRow = (row) => {
        const name = trim(row.name);
        const category = lowerCase(trim(row.category));

        firestore.collection('parts')
            .add({
                     name,
                     category,
                     amount: 1
                 })
            .catch(error => {
                console.log(error)
            });
        console.log("part ADDED");
    };

    function parser() {
        var dataList = JSON.parse(jsonData);
        dataList.Sheet1.forEach(row => {
            console.log(row);
            insertRow(row);
        });
    }

    return (
        <div style={{margin: 'auto', width: '200px'}}>
            <ol>
                <li>download excel sheet</li>
                <li>Go to <a href={'https://beautifytools.com/excel-to-json-converter.php'}>https://beautifytools.com/excel-to-json-converter.php</a></li>
                <li>click 'Browse' and select you excel sheet</li>
                <li>select all (ctr + a) the JSON that appeared and copy it</li>
                <li>Paste it into this text box below and click upload</li>
                <li>Magic</li>
            </ol>
            <textarea onChange={(event => setJson(event.target.value))} rows={50} cols={30}/>
            <button onClick={parser}>Upload</button>
        </div>
    );
};

export default Kits;
