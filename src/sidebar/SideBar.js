import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import { Button, Box, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { CryptoState } from "../context/CryptoContext";
import { signOut } from "@firebase/auth";
import { auth } from "../Firebase";

const useStyles = makeStyles({
    container: {
        width: 300,
        padding: 6,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
    },
    profile: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",
    },
    picture: {
        width: 150,
        height: 150,
        cursor: "pointer",
        backgroundColor: "#EEBC1D",
        objectFit: "contain",
    },
    logout: {
        height: "8%",
        width: "100%",
        backgroundColor: "#EEBC1D",
        marginTop: 20,
    },
    watchList: {
        flex: 1,
        width: "100%",
        backgroundColor: "grey",
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflowY: "scroll",
    },
});

export default function Sidebar() {
    const [state, setState] = useState({
        right: false,
    });
    const history = useHistory();
    const { user, setAlert } = CryptoState();
    const classes = useStyles();

    const logOut = () => {
        signOut(auth);
        setAlert({
            open: true,
            type: "success",
            message: "User Successfully LogOut ",
        });
        history.push("/login");
    };
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <div>
            {["right"].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        style={{
                            height: 38,
                            width: 38,
                            cursor: "pointer",
                            backgroundColor: "#EEBC1D",
                            wordWrap: "break-word",
                        }}
                        onClick={toggleDrawer(anchor, true)}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <div className={classes.container}>
                            <div className={classes.profile}>
                                <Avatar
                                    className={classes.picture}
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                />{" "}
                                <span
                                    style={{
                                        width: "100%",
                                        fontSize: 25,
                                        textAlign: "center",
                                        fontWeight: "bolder",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {user.displayName || user.email}
                                    <div className={classes.watchList}>
                                        <span
                                            style={{
                                                fontSize: 15,
                                                textShadow: "0 0 5px black",
                                            }}
                                        >
                                            WatchList
                                        </span>
                                    </div>
                                </span>
                            </div>
                        </div>{" "}
                        <Button
                            variant="contained"
                            className={classes.logOut}
                            onClick={logOut}
                        >
                            LogOut
                        </Button>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
