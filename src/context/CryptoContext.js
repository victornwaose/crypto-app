import { onAuthStateChanged } from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { CoinList } from "../api/api";
import { auth } from "../Firebase";

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
    console.log(coins);

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
