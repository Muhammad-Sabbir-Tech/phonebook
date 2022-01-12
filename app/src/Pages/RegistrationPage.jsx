import React from 'react';
import RegistrationComponent from "../Component/RegistrationComponent/RegistrationComponent";
import UnAuthWrapped from "../Component/AuthedWrapper/UnAuthWrapped";

function RegistrationPage(props) {
    return (
        <>
            {/*checking logged out or not*/}
            <UnAuthWrapped>
                <RegistrationComponent/>
            </UnAuthWrapped>
        </>
    );
}

export default RegistrationPage;