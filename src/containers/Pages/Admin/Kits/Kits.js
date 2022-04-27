import React, { useState } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import Compressor from "compressorjs";

import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import { firestore, storageRef } from "../../../../firebase";
import CustomLinearProgress from "../../../../components/UI/LinearProgress/CustomLinearProgress";
import { handleFileUpload } from "../../../../components/UI/Helper/Helper";

const Kits = (props) => {
    const [isPartUpload, setPartUpload] = useState(true);
    const [tempPictureUrls, setTempPictureUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [jsonData, setJsonData] = useState("");
    // JSON.stringify({"parts": [
    //     {
    //         "name": "AIR CYLINDER: 10in -Air Cylinder",
    //         "category": "Air cylinder",
    //         "details": "Used for wraps",
    //         "amount": "1",
    //         "picname": "IMG_0178"
    //     },
    //     {
    //         "name": "AIR CYLINDER: 3in -Air Cylinder",
    //         "category": "Air cylinder",
    //         "details": "Used on blower blast gates",
    //         "amount": "1",
    //         "picname": "IMG_0180"
    //     },
    //     {
    //         "name": "AIR CYLINDER: 8in -Air Cylinder",
    //         "category": "Air cylinder",
    //         "details": "Used on tire shine",
    //         "amount": "1",
    //         "picname": "IMG_0179"
    //     }
    // ]}));

    function trim(thing) {
        return thing.trim();
    }

    function capitalize(word) {
        const capWord = word.toLowerCase()
            .split(" ")
            .map(part => part[0].toUpperCase() + part.substring(1))
            .join(" ");
        console.log(capWord);
        return capWord;
    }

    async function setAllPics(event) {
        let compressedFiles = [];
        const files = event.target.files;
        console.log(files.length);

        let quality;
        let width;
        let height;
        if (isPartUpload) {
            quality = .65;
            width = 512;
            height = 512;
        } else {
            quality = .65;
            width = 128;
            height = 128;
        }
        setIsLoading(true);
        for (let i = 0; i < files.length; i++) {
            let progress = ((i + 1) / files.length) * 100;
            setProgress(progress);
            await compressFile(files[i], quality, width, height)
                .then(res => compressedFiles.push(res))
                .catch(err => {
                    console.log(err, files[i]);
                });
        }
        setIsLoading(false);
        setTempPictureUrls(compressedFiles);
        console.log(compressedFiles);
    }

    const compressFile = (image, quality, width, height) => {
        return new Promise((resolve, reject) => {
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
        });
    };

    const addPart = async (part) => {
        const name = trim(part.name);
        const category = capitalize(trim(part.category));
        const categoryIndex = props.categories.findIndex(categoryItem => categoryItem.name === category);
        const categoryId = props.categories[categoryIndex].id;
        const details = part.details ? trim(part.details) : null;
        let pictureUrls = [];
        const partRef = firestore.collection('parts')
            .doc();

        const picname = part.picname ? trim(part.picname) : null;
        if (picname) {
            const picIndex = tempPictureUrls.findIndex(tempPic => tempPic.name.split(".")[0] === picname);
            const pic = tempPictureUrls[picIndex];
            try {
                const uploadTask = storageRef.child('parts')
                    .child(categoryId)
                    .child(partRef.id)
                    .put(pic);
                await handleFileUpload(setIsLoading, setProgress, setError, uploadTask)
                    .then(function (url) {
                        pictureUrls.push(url);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } catch (e) {
                console.log(e.message);
            }
        }

        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const partObj = {
            name,
            categoryId,
            details: details,
            pictureUrls,
            pictureName: picname,
            amount: 1,
            createdAt: timestamp,
            updatedAt: timestamp
        };

        console.log(partObj);
        firestore.collection('parts')
            .doc(partRef.id)
            .set(partObj);

    };

    const addCategory = async (category) => {
        console.log(category);
        const categoryName = capitalize(trim(category.name));
        let pictureUrl = null;
        const categoryRef = firestore.collection('categories')
            .doc();
        if (category.picname) {
            const picname = trim(category.picname);
            const picIndex = tempPictureUrls.findIndex(tempPic => tempPic.name.split(".")[0] === picname);
            const pic = tempPictureUrls[picIndex];
            try {
                const uploadTask = storageRef.child('categories')
                    .child(categoryRef.id)
                    .put(pic);
                await handleFileUpload(uploadTask)
                    .then(function (url) {
                        pictureUrl = url;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } catch (e) {
                console.log(e.message);
            }
        }

        const categoryObj = {
            name: categoryName,
            pictureUrl: pictureUrl
        };
        firestore.collection('categories')
            .doc(categoryRef.id)
            .set(categoryObj);
    };

    async function parser() {
        const dataList = JSON.parse(jsonData);
        const listKey = Object.keys(dataList)[0];
        const list = dataList[listKey];
        let count = 0;

        if (isPartUpload) {
            for (let i = 0; i < list.length; i++) {
                const row = list[i];
                let progress = ((i + 1) / list.length) * 100;
                setProgress(progress);
                count++;
                addPart(row); //add await to make it take forever...
                if (count % 400 === 0) {
                    setTimeout(function () {
                        console.log("timeout")
                    }, 10000);
                }
            }
        } else {
            list.forEach(category => addCategory(category));
        }
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <ol>
                    <li>download excel sheet</li>
                    <li>Go to <a href={'https://beautifytools.com/excel-to-json-converter.php'}
                                 target={"_blank"}>https://beautifytools.com/excel-to-json-converter.php</a>
                    </li>
                    <li>click 'Browse' and select you excel sheet</li>
                    <li>select all (ctr + a) the JSON that appeared and copy it</li>
                    <li>Paste it into this text box below and click upload</li>
                    <li>Magic</li>
                </ol>
                <Grid item xs={12}>
                    <TextField
                        autoFocus
                        value={jsonData}
                        onChange={event => setJsonData(event.target.value)}
                        id="outlined-textarea"
                        label="Json Data"
                        multiline
                        variant="outlined"
                        fullWidth
                        rows={30}/>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox
                            value={isPartUpload}
                            checked={isPartUpload}
                            onChange={() => setPartUpload((prevState) => !prevState)}
                            color="primary"/>}
                        label="Check for part, uncheck for category"
                    />
                </Grid>
                <Grid item xs={12}>
                    Choose Picture Directory: <input accept="image/png, image/jpeg" type="file" name="files[]" id="files" multiple directory=""
                                                     webkitdirectory="" mozdirectory="" onChange={setAllPics}/>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={parser}
                        disabled={tempPictureUrls.length < 0 || isLoading}
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Upload
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {isLoading && <CustomLinearProgress value={progress}/>}
                </Grid>
            </Grid>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        categories: state.categories.categories,
    };
};

export default connect(mapStateToProps)(Kits);
