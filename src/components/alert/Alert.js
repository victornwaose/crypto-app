import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import { CryptoState } from "../../context/CryptoContext";

const Alert = () => {
    const { alert, setAlert } = CryptoState();

    // const handleClick = (event, reason) => {
    //     setOpen(true);
    // };
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert({ open: false });
    };

    return (
        <Snackbar
            open={alert?.open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <MuiAlert
                onClose={handleClose}
                elevation={10}
                variant="filled"
                severity={alert?.type}
            >
                {alert?.message}
            </MuiAlert>
        </Snackbar>
    );
};

export default Alert;
