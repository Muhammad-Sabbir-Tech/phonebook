import React, {createContext, useEffect, useState} from 'react';
import LoginForm from "./allSubComponent/LoginForm";
import {ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {contactSlice} from "../../Redux/Slice/ContactSlice";


export const LoginContext = createContext()

function LoginComponent(props) {
    // hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //otp modal show
    const [logStatus, setLogStatus] = useState(false);

    // check login status for redirect from login
    useEffect(() => {
        // log status set true from login action if login success fully
        if (logStatus == true) {
            navigate("/dashboard")
        }
    }, [logStatus])

    useEffect(() => {
        dispatch(contactSlice.actions.getAllContactReducer([]))
    }, [])


    return (
        <>
            {/*context provider*/}
            <LoginContext.Provider value={{setLogStatus: setLogStatus}}>
                {/*login form*/}
                <LoginForm/>

                {/*toast container*/}
                <ToastContainer/>
            </LoginContext.Provider>
        </>
    );
}

export default LoginComponent;