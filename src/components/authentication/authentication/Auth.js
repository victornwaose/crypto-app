import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Box } from "@material-ui/core";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { useHistory } from "react-router";

import Login from "./Login";
import SignUp from "./SignUp";
import { auth } from "../../../Firebase";
import { CryptoState } from "../../../context/CryptoContext";

const Auth = () => {
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(true);
    const history = useHistory();
    const { setAlert } = CryptoState;
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
        google: {
            padding: 24,
            paddingTop: 0,
            display: "flex",
            fexDirection: "column",
            gap: 20,
            FontSize: 20,
        },
    }));
    const classes = useStyles();

    const googleProvider = new GoogleAuthProvider();

    const signWithGoogle = async () => {
        try {
            const res = signInWithPopup(auth, googleProvider);
            history.push("/");
            setAlert({
                open: true,
                message: `Sign Up Successful. Welcome ${res.user.displayName}`,
                type: "success",
            });
        } catch (error) {
            console.log(error);
        }
    };
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
            <h4 style={{ textAlign: "center" }}>OR</h4>{" "}
            <Box className={classes.google}>
                <GoogleButton
                    style={{ width: "100%", outline: "none" }}
                    onClick={signWithGoogle}
                />
            </Box>
        </div>
    );
};

export default Auth;
