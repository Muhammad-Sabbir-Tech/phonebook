import React from 'react';
import loader from "../../Asset/Loader/contactUpdateLoading.svg"

function ContactUpdateLoader(props) {
    return (
        <>
            <img className="contactUpdateLoader" src={loader}/>
        </>
    );
}

export default ContactUpdateLoader;