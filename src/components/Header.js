import React from "react";
import { useHistory, Link } from "react-router-dom";
import {
    AppBar,
    Container,
    createTheme,
    makeStyles,
    MenuItem,
    Select,
    Toolbar,
    Typography,
    ThemeProvider,
    Button,
} from "@material-ui/core";
import { CryptoState } from "../context/CryptoContext";
import SideBar from "../sidebar/SideBar";

const Header = () => {
    const useStyle = makeStyles((theme) => ({
        title: {
            flex: 1,
            color: "gold",
            fontFamily: "Montserrat",
            fontWeight: "bold",
            cursor: "pointer",
            [theme.breakpoints.down("md")]: {
                h4: "h5",
                marginTop: "9",
            },
            [theme.breakpoints.down("sm")]: {
                h4: "h5",
                marginTop: "9",
            },
            [theme.breakpoints.down("xs")]: {
                h4: "h5",
                marginTop: "9",
            },
        },
    }));

    const { currency, setCurrency, user } = CryptoState() || {};

    const classes = useStyle();

    const history = useHistory();
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
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <Typography
                            onClick={() => history.push("/")}
                            className={classes.title}
                            variant="h6"
                        >
                            Crypto-Tracker
                        </Typography>
                        <Select
                            variant="outlined"
                            style={{ width: 100, height: 40, marginRight: 15 }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="NGN">Naira</MenuItem>
                        </Select>{" "}
                        {user ? (
                            <SideBar />
                        ) : (
                            <Link to="/login">
                                <Button
                                    variant="contained"
                                    color="#fff"
                                    style={{
                                        width: 85,
                                        height: 40,
                                        marginLeft: 15,
                                        backgroundColor: "#EEBC1D",
                                    }}
                                >
                                    Login
                                </Button>
                            </Link>
                        )}
                    </Toolbar>{" "}
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default Header;
