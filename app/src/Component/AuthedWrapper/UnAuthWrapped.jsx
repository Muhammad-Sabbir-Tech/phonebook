import React, {useEffect} from 'react';
import {AuthCheck} from "../../Utility/AuthCheck";
import {useNavigate} from "react-router-dom";

function UnAuthWrapped(props) {
    const authData = AuthCheck()
    const navigate = useNavigate()

    useEffect(() => {
        // !false mean logged in
        if (authData != false) {
            navigate("/dashboard")
        }
    }, [authData])

    //if login false
    if (authData == false){
        return (
            <>
                {props.children}
            </>
        );
    }else {
        return (<></>);
    }
}

export default UnAuthWrapped;