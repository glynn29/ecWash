import React from "react";
import Compressor from "compressorjs";
import { GoogleSpreadsheet } from "google-spreadsheet";


const QUALITY = .65;
const PART_LENGTH = 512;
const CATEGORY_LENGTH = 128;

export const handleFileUpload = (uploadTask, setProgress) => {
    try {
        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed', (snapshot) => {
                              let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                              setProgress(progress);
                          },
                          (error) => {

                              reject(error.message);
                          },
                          () => {
                              uploadTask.snapshot.ref.getDownloadURL()
                                  .then((downloadURL) => {
                                      resolve(downloadURL);
                                  });
                          });
        });
    } catch (e) {
        return Promise.reject(e);
    }
};

export const compressFile = (image, isPart = true) => {
    let quality, width, height;

    if (isPart) {
        quality = QUALITY;
        width = PART_LENGTH;
        height = PART_LENGTH;
    } else {
        quality = QUALITY;
        width = CATEGORY_LENGTH;
        height = CATEGORY_LENGTH;
    }

    return new Promise((resolve, reject) => {
        if (image.size / 1024 < 100) { // check if image is less than 100 kb
            resolve(image);
        } else {
            new Compressor(image, {
                quality: quality,
                maxWidth: width,
                maxHeight: height,
                success: (compressedResult) => {
                    resolve(compressedResult);
                },
                error(err) {
                    reject(err.message);
                }
            });
        }
    });
};

export async function loadSheetsData(sheetId) {
    const sheetsConfig = JSON.parse(process.env.REACT_APP_SHEETS_CONFIG);
    const email = sheetsConfig.email;
    const PK = sheetsConfig.PK;
    const spreadSheetId = sheetsConfig.spreadSheetId;
    const doc = new GoogleSpreadsheet(spreadSheetId);

    const credentials = { client_email: email, private_key: PK };
    await doc.useServiceAccountAuth(credentials)
        .catch(error => console.log(error));

    await doc.loadInfo()
        .catch(error => console.log(error)); // loads document properties and worksheets

    const sheet = await doc.sheetsById[sheetId];
    const headers = await sheet.getRows({ limit: 1 });
    const realHeaders = Object.keys(headers[0])
        .filter(header => !header.startsWith("_"));
    console.log(headers);
    console.log(realHeaders);
    const data = await sheet.getRows();
    let dataList = [];
    data.forEach(row => {
        let rowData = {};
        realHeaders.forEach(header => {
            //scan for x or other data for given email per row, trim to null
            rowData[header] = row[header] === undefined ? "" : row[header].trim();
        })
        dataList.push(rowData);
    })

    return JSON.stringify(dataList);
}
