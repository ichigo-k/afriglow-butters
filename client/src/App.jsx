import React, {useEffect} from 'react'
import {Route, Routes} from "react-router";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import useAuthStore from "./store/authStore.jsx";
import {LoaderCircle} from "lucide-react";
import RedirectAuthenticatedUser from "./components/auth/RedirectAuthenticatedUser.jsx";
import Shop from "./pages/user/Shop.jsx";
import Cart from "./pages/user/Cart.jsx";
import {UpdateData} from "./pages/user/UpdateData.jsx";
import {UserOrders} from "./pages/user/UserOrders.jsx";
import ViewOrder from "./pages/user/ViewOrder.jsx"
import Successful from "./pages/user/Sucessful.jsx";
import Error from "./pages/user/Error.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

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
       {/*<Route path={"/store"} element={<Shop/>} />*/}
       <Route path={"/cart"} element={<ProtectedRoute><Cart/></ProtectedRoute>} />
       <Route path={"/profile"} element={<ProtectedRoute><UpdateData/></ProtectedRoute>} />
       <Route path={"/orders"} element={<ProtectedRoute><UserOrders/></ProtectedRoute> } />
       <Route path={"/order/:id"} element={<ProtectedRoute><ViewOrder/></ProtectedRoute>}/>
       <Route path={"/success"} element={<Successful/>}/>
       <Route path={"/error"} element={<Error/>} />

   </Routes>
  )
}

export default App