import {useContext, useEffect} from "react";
import { AuthContext } from "../context/AuthContext";
import {Navigate, useNavigate} from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    useEffect(() => {
        if (!user) navigate("/login");
    }, [user, navigate]);

    return user ? children : null;

};

export default PrivateRoute;
