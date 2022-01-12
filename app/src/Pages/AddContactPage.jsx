import React from 'react';
import AuthedWrapper from "../Component/AuthedWrapper/authedWrapper";
import AddContactComponent from "../Component/AddContactComponent/addContactComponent";
import NavComponent from "../Component/NavComponent/NavComponent";

function AddContactPage(props) {
    return (
        <>
            {/*for checking login or not*/}
           <AuthedWrapper>
               <NavComponent/>
               <AddContactComponent/>
           </AuthedWrapper>
        </>
    );
}

export default AddContactPage;