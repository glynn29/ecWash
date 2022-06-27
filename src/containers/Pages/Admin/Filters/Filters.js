import React, { useEffect, useState } from "react";
import { withSnackbar } from "notistack";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";

import { firestore } from "../../../../firebase";
import CustomLinearProgress from "../../../../components/UI/LinearProgress/CustomLinearProgress";
import { loadSheetsData } from "../../../../components/UI/Helper/Helper";

const Filters = (props) => {
    const [jsonData, setJsonData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");
    const practiceSheetId = 0;
    const prodSheetId = 1848568875;
    const currentSheetId = prodSheetId;


    useEffect(() => {
        loadSheetsData(currentSheetId)
            .then(response => {
                setJsonData(response);
            })
            .catch(error => console.log(error));
    }, []);

    function addPartFilter(row) {
        const usersToFilter = [];
        const filters = Object.keys(row)
            .filter(item => item.includes('@') && row[item].trim() !== "");
        filters.forEach(user => {
            usersToFilter.push(user);
        });

        console.log(usersToFilter);
        firestore.collection("parts")
            .doc(row.id)
            .collection("filters")
            .doc("filter")
            .set({ usersToFilter })
            .catch(error => setError(error));
    }

    function parser() {
        console.log("parsing");
        const list = JSON.parse(jsonData);
        console.log(list);
        let count = 0;

        setIsLoading(true);
        for (let i = 0; i < list.length; i++) {
            const row = list[i];
            let progress = ((i + 1) / list.length) * 100;
            setProgress(progress);
            count++;
            addPartFilter(row);
            if (count % 400 === 0) { //let firebase cool down
                setTimeout(function () {
                    console.log("timeout")
                }, 10000);
            }
        }
        setIsLoading(false);
        props.enqueueSnackbar('Filters Created', {
            variant: "success",
            autoHideDuration: 9000,
            TransitionComponent: Slide,
            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
        });
        console.log("complete");
    }

    return (
        <Container>
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
                        minRows={30}
                        maxRows={30} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={() => loadSheetsData(currentSheetId)}
                        fullWidth
                        variant="contained"
                        style={{ color: "white", backgroundColor: "green" }}
                    >
                        Refresh Data
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={() => parser()}
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isLoading || jsonData.length < 1}
                    >
                        Create Filters
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {isLoading && <CustomLinearProgress value={progress} />}
                </Grid>
                <Grid item xs={12}>
                    {error && <Typography color={"error"}>{error}</Typography>}
                </Grid>
            </Grid>
        </Container>
    );
};

export default (withSnackbar(Filters))
