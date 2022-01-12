import React, {useContext} from 'react';
import {NavContext} from "../NavComponent";
import {Offcanvas} from "react-bootstrap";
import {Link} from "react-router-dom";

function Drawer(props) {
    // context api
    const  {show, setShow} = useContext(NavContext)

    // drawer handle close
    const handleClose = () => setShow(false);

    return (
        <>
            <div className="drawer">
                <Offcanvas show={show} end onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title  className="">Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="d-flex flex-column align-items-center justify-content-center" >
                       <Link to="/dashboard">All contacts</Link>
                       <Link to="/addContact">Add contact</Link>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    );
}

export default Drawer;