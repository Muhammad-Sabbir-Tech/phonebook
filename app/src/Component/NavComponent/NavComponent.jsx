import React, {createContext, useEffect, useState} from 'react';
import TopNavComponent from "./allSubComponent/TopNavComponent";
import Drawer from "./allSubComponent/Drawer";
import {useNavigate} from "react-router-dom";
import {RemoveLocalStorage} from "../../Utility/RemoveLocalStorage";


//create context API
export const NavContext = createContext()

function NavComponent(props) {
    // hooks
    const navigate = useNavigate()

    // drawer show state
    const [show, setShow] = useState(false)
    const [logStatus, setLogStatus] = useState(true)

    useEffect(()=>{
        if (logStatus == false){
            RemoveLocalStorage()
            navigate("/login")
        }
    },[logStatus])

    return (
        <>
            {/*context provide*/}
            <NavContext.Provider value={{setShow: setShow, show: show, setLogStatus}}>
                {/*topNav*/}
                <TopNavComponent/>

                {/*drawer*/}
                <Drawer/>
            </NavContext.Provider>
        </>
    );
}

export default NavComponent;