import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Button, Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@material-ui/core";

import { firestore, getTimestamp, storageRef } from "../../../../firebase";
import CustomLinearProgress from "../../../../components/UI/LinearProgress/CustomLinearProgress";
import { compressFile, handleFileUpload, loadSheetsData } from "../../../../components/UI/Helper/Helper";
import useStyles from "../../../../components/UI/Styles/formStyle";

const Kits = (props) => {
    const partsSheetId = 1848568875;
    const cutSheetCategoriesSheetId = 1276001093;
    const cutSheetSheetId = 1236189348;
    const categoriesSheetSheetId = 962331847;
    const styles = useStyles();
    const [isPartUpload, setPartUpload] = useState("1");
    const [tempPictureUrls, setTempPictureUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");
    const [jsonData, setJsonData] = useState("");
    const [sheetId, setSheetId] = useState(partsSheetId);

    useEffect(() => {
        loadSheetsData(sheetId)
            .then(res => {
                setJsonData(res);
            })
            .catch(error => console.log(error));
    }, [sheetId]);

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

        setIsLoading(true);
        for (let i = 0; i < files.length; i++) {
            let progress = ((i + 1) / files.length) * 100;
            setProgress(progress);
            await compressFile(files[i], isPartUpload === "1")
                .then(res => compressedFiles.push(res))
                .catch(err => {
                    console.log(err, files[i]);
                });
        }
        setIsLoading(false);
        setTempPictureUrls(compressedFiles);
        console.log(compressedFiles);
    }

    const addPart = async (part) => {
        const name = part.name.trim();
        const category = capitalize(part.category.trim());
        const categoryIndex = props.categories.findIndex(categoryItem => categoryItem.name === category);
        const categoryId = props.categories[categoryIndex].id;
        const details = part.details ? part.details.trim() : null;
        let pictures = [];
        const partRef = firestore.collection('parts')
            .doc();

        const picname = part.picname ? part.picname.trim() : null;
        if (picname) {
            const picIndex = tempPictureUrls.findIndex(tempPic => tempPic.name.split(".")[0] === picname);
            const pic = tempPictureUrls[picIndex];
            try {
                const uploadTask = storageRef.child('parts')
                    .child(categoryId)
                    .child(partRef.id)
                    .child(picname)
                    .put(pic);
                setIsLoading(true);
                await handleFileUpload(uploadTask, setProgress)
                    .then(function (url) {
                        pictures.push({ pictureUrl: url, pictureName: picname });
                    })
                    .catch(function (error) {
                        console.log(error);
                        setError(error);
                    });
                setIsLoading(false);
            } catch (e) {
                console.log(e.message);
            }
        }

        const timestamp = getTimestamp();
        const partObj = {
            name,
            categoryId,
            details: details,
            pictures,
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
        const categoryName = capitalize(category.name.trim());
        let pictureUrl = null;
        const categoryRef = firestore.collection('categories')
            .doc();
        let picname = null;
        if (category.picname) {
            picname = category.picname.trim();
            const picIndex = tempPictureUrls.findIndex(tempPic => tempPic.name.split(".")[0] === picname);
            const pic = tempPictureUrls[picIndex];
            try {
                const uploadTask = storageRef.child('categories')
                    .child(categoryRef.id)
                    .put(pic);
                setIsLoading(true);
                await handleFileUpload(uploadTask, setProgress)
                    .then(function (url) {
                        pictureUrl = url;
                    })
                    .catch(function (error) {
                        setError(error);
                        console.log(error);
                    });
                setIsLoading(false);
            } catch (e) {
                console.log(e.message);
            }
        }

        const categoryObj = {
            name: categoryName,
            pictureUrl: pictureUrl,
            pictureName: picname
        };

        firestore.collection('categories')
            .doc(categoryRef.id)
            .set(categoryObj);
    };

    async function parser(event) {
        console.log(isPartUpload);
        event.preventDefault();
        const list = JSON.parse(jsonData);
        let count = 0;

        if (isPartUpload === "1") {
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
        } else if (isPartUpload === "2"){
            list.forEach(category => addCategory(category));
        } else if (isPartUpload === "3") {
            console.log("entered");
            list.forEach(category => addCutSheetCategories(category));
        }
    }

    const addCutSheetCategories = async (category) => {
        let pictureUrl = null;
        let picname = null;
        if (category.picname) {
            picname = category.picname.trim();
            const picIndex = tempPictureUrls.findIndex(tempPic => tempPic.name.split(".")[0] === picname);
            const pic = tempPictureUrls[picIndex];
            try {
                setIsLoading(true);
                const uploadTask = storageRef.child('cutsheets')
                    .child('categories')
                    .child(category.id)
                    .put(pic);
                await handleFileUpload(uploadTask, setProgress)
                    .then(function (url) {
                        pictureUrl = url;
                        console.log(picname);
                        console.log(pictureUrl);
                    })
                    .catch(function (error) {
                        setError(error);
                        console.log(error);
                    });
                setIsLoading(false);
            } catch (e) {
                console.log(e.message);
            }
        }
    }


    function downloadImages() {
        const element = document.createElement("a");
        const poop = tempPictureUrls.slice(1, tempPictureUrls.length);
        const file = new Blob([tempPictureUrls], {type: "application/zip"});
        element.href = URL.createObjectURL(file);
        element.download = "pictures.zip";
        document.body.appendChild(element);
        element.click();
    }

    const handleRadioOnChange= (event) => {
        const radioValue = event.target.value;
        setPartUpload(radioValue);
        setJsonData("");

        switch (radioValue) {
            case "1":
                setSheetId(partsSheetId);
                break;
            case "2":
                setSheetId(categoriesSheetSheetId);
                break;
            case "3":
                setSheetId(cutSheetCategoriesSheetId);
                break;
            default:
                setSheetId(0);
        }
    }

    return (
        <Container>
            <form onSubmit={parser}>
                <Grid container spacing={2}>
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
                            minRows={20}
                            maxRows={20} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset" required>
                            <FormLabel component="legend">Upload for:</FormLabel>
                            <RadioGroup row={true} name="uploadType" value={isPartUpload} onChange={handleRadioOnChange}>
                                <FormControlLabel value="1" control={<Radio required/>} label="Parts" />
                                <FormControlLabel value="2" control={<Radio required/>} label="Categories" />
                                <FormControlLabel value="3" control={<Radio required/>} label="Cut Sheet Categories" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        Choose Picture Directory: <input disabled={isPartUpload === ""} accept="image/png, image/jpeg" type="file" name="files[]" id="files" multiple directory=""
                                                         webkitdirectory="" mozdirectory="" onChange={setAllPics} />
                    </Grid>
                    {/*<Grid item xs={12}>*/}
                    {/*    <Button*/}
                    {/*        onClick={downloadImages}*/}
                    {/*        fullWidth*/}
                    {/*        variant="contained"*/}
                    {/*        color="primary"*/}
                    {/*    >*/}
                    {/*        Download Pictures*/}
                    {/*    </Button>*/}
                    {/*</Grid>*/}
                    <Grid item xs={12}>
                        <Button
                            onClick={() => loadSheetsData(sheetId)}
                            fullWidth
                            variant="contained"
                            className={styles.editButton}
                        >
                            Refresh Data
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type={"submit"}
                            disabled={tempPictureUrls.length < 1 || isLoading || jsonData.length < 1}
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Upload
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {isLoading && <CustomLinearProgress value={progress} />}
                    </Grid>
                    <Grid item xs={12}>
                        {error && <Typography color={"error"}>{error}</Typography>}
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        categories: state.categories.categories,
    };
};

export default connect(mapStateToProps)(Kits);
