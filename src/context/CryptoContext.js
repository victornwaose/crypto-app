import { createContext, useContext, useEffect, useState } from "react";

import { CoinList } from "../api/api";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState("NGN");
    const [symbol, setSymbol] = useState("NGN");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    console.log(currency, "currency ");

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
