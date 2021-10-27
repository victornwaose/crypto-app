import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core";

import Login from "./Login";
import SignUp from "./SignUp";

const Auth = () => {
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const useStyles = makeStyles((theme) => ({
        paper: {
            backgroundColor: theme.palette.background.paper,
        },
    }));
    const classes = useStyles();
    return (
        <div>
            <AppBar
                position="static"
                style={{ backgroundColor: "black", color: "white" }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                >
                    <Tab label="LOGIN" />
                    <Tab label="SIGN-UP" />
                </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <SignUp handleClose={handleClose} />}
        </div>
    );
};

export default Auth;
