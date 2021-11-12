import { Route, Redirect } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";

const PrivateRoute = ({ children, ...rest }) => {
    const { user } = CryptoState();

    return (
        <Route
            {...rest}
            render={() => (user ? children : <Redirect to="/login" />)}
        ></Route>
    );
};

export default PrivateRoute;
