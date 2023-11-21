import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = ({ }) => {
    // if (!localStorage.getItem('token')) {
    //     return <Navigate to="/" />;
    // }
    return <div><Outlet /></div>;
};

export default ProtectedRoutes