import React, {useEffect} from 'react'
import {Route, Routes} from "react-router";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import useAuthStore from "./store/authStore.jsx";
import {LoaderCircle} from "lucide-react";
import RedirectAuthenticatedUser from "./components/auth/RedirectAuthenticatedUser.jsx";

function App() {

    const {isCheckingAuth, checkAuth} = useAuthStore()

    useEffect(() => {
        checkAuth()
    }, []);
    if (isCheckingAuth) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoaderCircle className="animate-spin w-8 h-8 text-primary" />
            </div>
        );
    }

    return (
   <Routes>
      <Route path={"/"} element={<Home/>}/>
       <Route path={"/signup"} element={<RedirectAuthenticatedUser><SignUp/> </RedirectAuthenticatedUser>} />
       <Route path={"/forgot-password"} element={<RedirectAuthenticatedUser> <ForgotPassword/> </RedirectAuthenticatedUser>}/>
       <Route path={"/reset-password/:id"} element={<RedirectAuthenticatedUser> <ResetPassword/> </RedirectAuthenticatedUser>} />
   </Routes>
  )
}

export default App