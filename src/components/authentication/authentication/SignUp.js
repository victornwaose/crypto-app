import { createUserWithEmailAndPassword } from "@firebase/auth";
import React, { useState } from "react";
import { useHistory } from "react-router";
import {
    TextField,
    Box,
    Button,
    createTheme,
    makeStyles,
    ThemeProvider,
} from "@material-ui/core";

import { CryptoState } from "../../../context/CryptoContext";
import { auth } from "../../../Firebase";

const SignUp = ({ handleClose }) => {
    const useStyle = makeStyles((theme) => ({
        title: {
            color: "white",
        },
    }));
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useHistory();
    const { setAlert } = CryptoState();

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            setAlert({
                open: true,
                message: "passwords don't match",
                type: "error",
            });
            return;
        }
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            history.push("/");
            console.log(result);
            setAlert({
                open: true,
                message: `sign up successful, Welcome ${result.user.email}`,
                type: "success",
            });
        } catch (error) {}
    };

    const classes = useStyle();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <Box
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    color: "#fff",
                }}
                p={3}
            >
                <TextField
                    variant="outlined"
                    type="email"
                    label="Enter A Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    style={{ border: "1px solid  #fff", borderRadius: 5 }}
                />
                <TextField
                    variant="outlined"
                    type="email"
                    label="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ border: "1px solid  #fff", borderRadius: 5 }}
                    fullWidth
                />
                <TextField
                    variant="outlined"
                    type="password"
                    label="Enter A Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ border: "1px solid  #fff", borderRadius: 5 }}
                    fullWidth
                />
                <TextField
                    variant="outlined"
                    type="password"
                    color="success"
                    label="Confirm your Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                        border: "1px solid  #fff",
                        borderRadius: 5,
                        color: "#fff",
                    }}
                    fullWidth
                />
                <Button
                    variant="contained"
                    size="large"
                    style={{ background: "#EEBC1D", color: "#fff" }}
                    onClick={handleSubmit}
                >
                    SIGN UP
                </Button>
            </Box>
        </ThemeProvider>
    );
};

export default SignUp;
