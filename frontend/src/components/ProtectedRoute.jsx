

import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    const isLoggedIn = localStorage.getItem("authToken");

    return isLoggedIn ? <Outlet/> : <Navigate to="/connexion"/>
}

export default ProtectedRoute