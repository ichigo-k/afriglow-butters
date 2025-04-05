import useAuthStore from "../../store/authStore.jsx";
import {Navigate} from "react-router";

export default function RedirectAuthenticatedUser ({ children }){
    const { isAuth, user } = useAuthStore();

    if (isAuth) {
        return <Navigate to='/' replace />;
    }

    return children;
};
