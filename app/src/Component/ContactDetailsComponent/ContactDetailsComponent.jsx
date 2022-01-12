import React, {createContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import AllContactComponent from "../AllContacts/AllContactComponent";

import {ToastContainer} from "react-toastify";
import ContactDetails from "./AllSubComponent/ContactDetails";
import {useDispatch, useSelector} from "react-redux";
import {contactDetailShowHide} from "../../Redux/Slice/contactDetailShowHide";
import {useNavigate} from "react-router-dom";
import {RemoveLocalStorage} from "../../Utility/RemoveLocalStorage";

//create context
export const ContactDetailsContext = createContext()

function ContactDetailsComponent(props) {
    // hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // manage contactlist and contact detail in mobile view
    const {contactDetailShowInMobileView, contactListShowInMobileView} = useSelector(state => state.contactDetailShowHide)

    // redux store
    const singleContactFromStore = useSelector(state => state.contacts.getSingleContact)

    // state
    const [logStatus, setLogStatus] = useState(true)
    const [singleContact, setSingleContact] = useState([])
    const [editClick, setEditClick] = useState(false)
    const [imageLoader, setImageLoader] = useState(false)
    const [additionalLoader, setAdditionalLoader] = useState([])
    const [addAdditionalLoader, setAddAdditionalLoader] = useState(false)
    const [contactBasicLoader, setContactBasicLoader] = useState({
        nameLoader: false,
        identityLoader: false,
        numberLoader: false,
        addressLoader: false,
        emailLoader: false
    })
    const [contactUpdate, setContactUpdate] = useState({name: "", identity: "", number: "", address: "", email: ""})
    const [additionalUpdate, setAdditionalUpdate] = useState([])
    const [additionalNumber, setAdditionalNumber] = useState([])


    //load single contact for view from redux store
    useEffect(() => {
        setSingleContact(singleContactFromStore)
    }, [singleContactFromStore])

    // checking authentication
    useEffect(() => {
        if (logStatus == false) {
            RemoveLocalStorage()
            navigate("/login")
        }
    }, [logStatus])

    // manage by default visiable contact detail on render
    useEffect(() => {
        //reset single contact array in every render
        setSingleContact([])

        const payload = {
            contactDetail: "d-none",
            contatactList: ""
        }
        dispatch(contactDetailShowHide.actions.manageContactDetail(payload))
    }, [])


    // setting all sub field like edit field detail view
    useEffect(() => {
        if (singleContact.length != 0) {
            setAdditionalLoader([])
            const data = {...singleContact}

            //seting data for edit field
            setContactUpdate({
                name: data.name,
                identity: data.identity,
                number: data.cell_number,
                address: data.address,
                email: data.email
            })

            //setting additional num delete Spinners for additional number edit
            if (data.additional_numbers != " ") {
                // makeing a new additional number array for getting additional numbers only
                let additionalNewArray = []

                // for magnage additional submit, loader, delete loader, delete
                let additionalLoader = []


                data.additional_numbers.map((value, i) => {
                    additionalNewArray = [...additionalNewArray, {addition_number: value.additional_number}]
                    additionalLoader = [...additionalLoader, {
                        spinner: "d-none",
                        submit: " ",
                        deleteSpinner: "d-none",
                        delete: " "
                    }]
                })
                setAdditionalUpdate(additionalNewArray)
                setAdditionalLoader(additionalLoader)
            }
        }
    }, [singleContact])


    return (
        <>
            {/*context provider*/}
            <ContactDetailsContext.Provider
                value={{
                    singleContact: singleContact,
                    setSingleContact: setSingleContact,
                    editClick: editClick,
                    setEditClick: setEditClick,
                    contactUpdate: contactUpdate,
                    setContactUpdate: setContactUpdate,
                    additionalUpdate: additionalUpdate,
                    setAdditionalUpdate: setAdditionalUpdate,
                    contactBasicLoader: contactBasicLoader,
                    setContactBasicLoader: setContactBasicLoader,
                    setLogStatus: setLogStatus,
                    setImageLoader: setImageLoader,
                    imageLoader: imageLoader,
                    additionalLoader: additionalLoader,
                    setAdditionalLoader: setAdditionalLoader,
                    additionalNumber: additionalNumber,
                    setAdditionalNumber: setAdditionalNumber,
                    addAdditionalLoader: addAdditionalLoader,
                    setAddAdditionalLoader: setAddAdditionalLoader,

                }}>

                <Container className="sidebarContainer " fluid={true}>
                    <Row>
                        {/*all contacts section*/}
                        <Col className={"d-md-block ps-0 pe-1 " + contactListShowInMobileView} lg={3} md={4} sm={12}>
                            <AllContactComponent/>
                        </Col>
                        {/*detail contacts section*/}
                        <Col lg={9} md={8} sm={12}
                             className={contactDetailShowInMobileView + " ps-3 ps-md-0 d-md-block"}>
                            <ContactDetails/>
                        </Col>
                    </Row>

                    {/*toast container*/}
                    <ToastContainer/>
                </Container>

            </ContactDetailsContext.Provider>
        </>
    );
}

export default ContactDetailsComponent;