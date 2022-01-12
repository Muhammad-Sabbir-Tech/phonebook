import React, {useEffect} from 'react';
import {AuthCheck} from "../../Utility/AuthCheck";
import {useNavigate} from "react-router-dom";

function AuthedWrapper(props) {
    const authData = AuthCheck()
    const navigate = useNavigate()

    useEffect(()=>{
        // false mean logged out
        if (authData == false){
            navigate("/login")
        }
    },[authData])



    //if login true
    if (authData != false){
        return (
            <>
                {props.children}
            </>
        );
    }else {
        return (<></>);
    }

}

export default AuthedWrapper;