import React, {createContext, useEffect, useState} from 'react';
import AllContactList from "./allSubComponent/AllContactList";
import {useNavigate} from "react-router-dom";
import {RemoveLocalStorage} from "../../Utility/RemoveLocalStorage";
import {useDispatch, useSelector} from "react-redux";
import {getAllContactAction} from "../../Redux/Actions/ContactAction";
import SearchContact from "./allSubComponent/searchContact";

// create all contact context
export const AllContactContext = createContext()

function AllContactComponent(props) {
    // hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // state
    const [logStatus, setLogStatus] = useState(true)
    const [loader, setLoader] = useState(false)
    const [searchKey, setSearchKey] = useState("")

    //all contacts from redux
    const allContactData = useSelector(state => state.contacts.allContacts)

    // checking user authentic or not
    useEffect(() => {
        if (logStatus == false) {
            RemoveLocalStorage()
            navigate("/login")
        }
    }, [logStatus])

    // call axios for get all contacts
    useEffect(() => {
        const payload = {
            setLogStatus: setLogStatus,
            setLoader: setLoader
        }
        dispatch(getAllContactAction(payload))
    }, [])

    return (
        <>
            {/*provide context*/}
            <AllContactContext.Provider value={{
                logStatus: logStatus,
                loader: loader,
                allContactData: allContactData,
                searchKey: searchKey,
                setSearchKey: setSearchKey,
            }}>
                <div className="allContacts">
                    <SearchContact/>
                    <AllContactList/>
                </div>
            </AllContactContext.Provider>
        </>
    );
}

export default AllContactComponent;