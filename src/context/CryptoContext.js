import { onAuthStateChanged } from "@firebase/auth";
import { doc, onSnapshot } from "@firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

import { CoinList } from "../api/api";
import { auth, db } from "../Firebase";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState("NGN");
    const [symbol, setSymbol] = useState("NGN");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({
        open: "false",
        message: "",
        type: "success",
    });

    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        if (user) {
            const coinRef = doc(db, "watchlist", user.uid);

            var unsubscribe = onSnapshot(coinRef, (coin) => {
                if (coin.exists()) {
                    setWatchlist(coin?.data().coins);
                } else {
                    console.log("error");
                }
            });

            return () => {
                unsubscribe();
            };
        }
    }, [user]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, []);

    const fetchCoins = async () => {
        try {
            setLoading(true);
            const response = await fetch(CoinList(currency));
            if (response.ok) {
                const data = await response.json();
                setCoins(data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (currency === "NGN") setSymbol("NGN");
        else if (currency === "USD") setSymbol("USD");
    }, [currency]);
    return (
        <Crypto.Provider
            value={{
                currency,
                symbol,
                setCurrency,
                loading,
                setCoins,
                coins,
                fetchCoins,
                user,
                setUser,
                open,
                setOpen,
                setAlert,
                alert,
                watchlist,
            }}
        >
            {children}
        </Crypto.Provider>
    );
};

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
};
