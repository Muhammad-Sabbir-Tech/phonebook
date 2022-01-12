import React, {useContext} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap"
import {AiFillSetting} from "@react-icons/all-files/ai/AiFillSetting";
import {AiOutlineAppstore} from "@react-icons/all-files/ai/AiOutlineAppstore";
import {NavContext} from "../NavComponent";

function TopNavComponent(props) {
    // context api
    const {setShow, setLogStatus} = useContext(NavContext)

    // drawer show handle
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar className="navTop" bg="light">
                <Container className="topNav">
                    <Navbar.Brand href="#"><span className="brandName">P-Book</span></Navbar.Brand>
                    <Nav className="ms-auto d-flex">
                        <NavDropdown className="mb-1" title={<AiFillSetting className="topNavBar"/>}
                                     id="basic-nav-dropdown">
                            <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#">Security</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={e => setLogStatus(false)} href="#">Logout</NavDropdown.Item>
                        </NavDropdown>

                        {/*drawer show on click*/}
                        <div style={{width: "32px"}} className="nav-item d-flex align-items-center">
                            <AiOutlineAppstore onClick={e => handleShow()} className="topNavBar"/>
                        </div>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default TopNavComponent;