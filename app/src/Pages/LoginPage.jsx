import React from 'react';
import LoginComponent from "../Component/LoginComponent/LoginComponent";
import UnAuthWrapped from "../Component/AuthedWrapper/UnAuthWrapped";


function LoginPage(props) {

    return (
        <>
            {/*checking logged out or not*/}
            <UnAuthWrapped>
                <LoginComponent/>
            </UnAuthWrapped>
        </>
    );
}

export default LoginPage;