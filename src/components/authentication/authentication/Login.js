import { TextField, Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";

import { CryptoState } from "../../../context/CryptoContext";
import { auth } from "../../../Firebase";

const Login = ({ handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            console.log(result);
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

    return (
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
            />
            <TextField
                variant="outlined"
                type="password"
                label="Enter A Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
    );
};

export default Login;
