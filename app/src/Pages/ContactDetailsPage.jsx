import React from 'react';
import AuthedWrapper from "../Component/AuthedWrapper/authedWrapper";
import NavComponent from "../Component/NavComponent/NavComponent";
import ContactDetailsComponent from "../Component/ContactDetailsComponent/ContactDetailsComponent";

function ContactDetailsPage(props) {
    return (
        <>
            {/*checking authentication*/}
            <AuthedWrapper>
                <NavComponent/>
                <ContactDetailsComponent/>
            </AuthedWrapper>
        </>
    );
}

export default ContactDetailsPage;