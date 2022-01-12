import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom"
import RegistrationPage from "../Pages/RegistrationPage";
import AddContactPage from "../Pages/AddContactPage";
import LoginPage from "../Pages/LoginPage";
import ContactDetailsPage from "../Pages/ContactDetailsPage";


function AppRoute(props) {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/registration"/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/dashboard" element={<ContactDetailsPage/>}/>
                <Route path="/addContact" element={<AddContactPage/>}/>
            </Routes>
        </>
    );
}

export default AppRoute;