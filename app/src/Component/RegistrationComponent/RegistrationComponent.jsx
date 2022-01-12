import React, {createContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import RegistrationForm from "./AllSubComponent/RegistrationForm";
import {ToastContainer} from "react-toastify";

export const RegistrationContext = createContext()

function RegistrationComponent(props) {
    //modal show
    const [show, setShow] = useState(false);

    // checking email stored or not in localStorage
    useEffect(() => {
        try {
            const email = localStorage.getItem("email")
            if (email.length > 4) {
                setShow(true)
            }
        } catch (e) {

        }
    }, [])

    return (
        <>
            <Container className="mt-5">
                {/*context providing*/}
                <RegistrationContext.Provider value={{show: show, setShow: setShow}}>

                    {/*registration form*/}
                    <RegistrationForm/>

                    {/*toast container*/}
                    <ToastContainer/>
                </RegistrationContext.Provider>
            </Container>
        </>
    );
}

export default RegistrationComponent;