import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Filters = (props) => {
    const [jsonData, setJsonData] = useState("");

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
                        minRows={30}/>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Create Filters
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Filters
