import useAuthStore from "../../store/authStore.jsx";
import {Navigate} from "react-router";

export default function ProtectedRoute({children}){
    const {user} = useAuthStore()
    if (!user) {
        return <Navigate to='/login' replace />;
    }


    return children;

}