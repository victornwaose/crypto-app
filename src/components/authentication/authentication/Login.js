import {
    TextField,
    Box,
    Button,
    createTheme,
    makeStyles,
    ThemeProvider,
} from "@material-ui/core";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useHistory } from "react-router";

import { CryptoState } from "../../../context/CryptoContext";
import { auth } from "../../../Firebase";

const Login = ({ handleClose }) => {
    const useStyle = makeStyles((theme) => ({
        title: {
            color: "white",
        },
    }));

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const { setAlert } = CryptoState();

    const handleSubmit = async () => {
        if (!email || !password) {
            setAlert({
                option: true,
                message: "please fill all fields",
                type: "error",
            });
            return;
        }
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            history.push("/");
            setAlert({
                option: true,
                message: `login successful, Welcome back ${result.user.email}`,
                type: "success",
            });
        } catch (error) {
            setAlert({
                option: true,
                message: error.message,
                type: "error",
            });
        }
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
            {" "}
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
                    label="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    style={{ border: "1px solid  #fff", borderRadius: 5 }}
                    className={classes.title}
                />
                <TextField
                    variant="outlined"
                    type="password"
                    label="Enter A Password"
                    color="#Secondary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ border: "1px solid  #fff", borderRadius: 5 }}
                    className={classes.title}
                    fullWidth
                />
                <Button
                    variant="contained"
                    size="large"
                    style={{ background: "#EEBC1D", color: "#fff" }}
                    onClick={handleSubmit}
                >
                    Sign-In
                </Button>
            </Box>
        </ThemeProvider>
    );
};

export default Login;
