import React, { useState } from "react";
import QRCode from 'qrcode.react';

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const QrCode = () => {
    const [value, setValue] = useState("");
    const [qrCode, setQrCode] = useState(null);

    function generate() {
        setQrCode(<QRCode value={value}/>);
    }

    return (
        <Container component="main" maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <TextField
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        variant="outlined"
                        required
                        fullWidth
                        id="value"
                        label="Encoding"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button fullWidth variant="contained" color="primary" onClick={generate}>
                        Generate QRCode
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {qrCode}
                </Grid>
            </Grid>
        </Container>
    );
};

export default QrCode;
