import React, {createContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import AllContactComponent from "../AllContacts/AllContactComponent";
import AddContactForm from "./allSubComponent/AddContactForm";
import {ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {RemoveLocalStorage} from "../../Utility/RemoveLocalStorage";

export const AddContactContext = createContext()

function AddContactComponent(props) {
    // hooks
    const navigate = useNavigate()

    // additional number array
    const [additionalNumber, setAdditionalNumber] = useState([])
    const [logStatus, setLogStatus] = useState(true)

    // checking login or not lifecycle
    useEffect(() => {
        if (logStatus == false){
            RemoveLocalStorage()
            navigate("/login")
        }
    }, [logStatus])

    return (
        <>
            {/*context provider*/}
            <AddContactContext.Provider
                value={{
                    additionalNumber: additionalNumber,
                    setAdditionalNumber: setAdditionalNumber,
                    setLogStatus: setLogStatus
                }}>

                <Container className="sidebarContainer " fluid={true}>
                    <Row>
                        {/*all contacts section*/}
                        <Col className="d-none ps-0 d-md-block pe-1" lg={3} md={4} sm={12}>
                            <AllContactComponent/>
                        </Col>
                        {/*add contacts section*/}
                        <Col lg={9} md={8} sm={12}>
                            <AddContactForm/>
                        </Col>
                    </Row>

                    {/*toast container*/}
                    <ToastContainer/>
                </Container>

            </AddContactContext.Provider>
        </>
    );
}

export default AddContactComponent;