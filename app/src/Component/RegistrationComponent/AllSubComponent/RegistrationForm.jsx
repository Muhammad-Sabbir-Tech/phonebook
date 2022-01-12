import React, {useContext, useRef, useState} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {emailRegex} from "../../../Utility/Regex";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {regAction} from "../../../Redux/Actions/RegAndLoginAction";
import Loader from "../../Loader/Loader";

function RegistrationForm(props) {
    // hooks
    const dispatch = useDispatch()

    // ref
    const regBtnRef = useRef()
    const regFormRef = useRef()

    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const [checkStatus, setCheckStatus] = useState(true)
    const [loader, setLoader] = useState("d-none")

    const onSubmit = data => {
        const payload = {
            data: data,
            regBtnRef:regBtnRef,
            reset:reset,
            regFormRef:regFormRef,
            setLoader:setLoader
        }
        dispatch(regAction(payload))
    }


    return (
        <>

            <Row className="d-flex justify-content-center">
                <Col lg={6} md={8} sm={12} xs={12}>
                    <h5 className="text-muted">REGISTRATION FORM </h5>
                    <hr/>
                    <Form ref={regFormRef} onSubmit={handleSubmit(onSubmit)} className="mt-4">
                        <Row>
                            <Col lg={6} md={6} sm={6} xs={12}>
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <TextField
                                        className="formField"
                                        id="outlined-number"
                                        label="Full name *"
                                        type="text"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...register("fullName", {required: true, minLength: "3", maxLength: "32"})}
                                    />
                                    {errors.fullName && <span className="text-danger">
                                        {errors.fullName.type == "required" && "this field is required"}
                                        {errors.fullName.type == "minLength" && "this field will minimum 3 char."}
                                        {errors.fullName.type == "maxLength" && "this field will maximum 32 char."}
                                    </span>}
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={12}>
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <TextField
                                        className="formField"
                                        id="outlined-number"
                                        label="Phone No. *"
                                        type="text"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...register("phone", {required: true})}
                                    />
                                    {errors.phone && <span className="text-danger">
                                        {errors.phone.type == "required" && "this field is required"}
                                    </span>}
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={12}>
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <TextField
                                        className="formField"
                                        id="outlined-number"
                                        label="Address"
                                        type="text"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...register("address")}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={12}>
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <TextField
                                        className="formField"
                                        id="outlined-number"
                                        label="Postal code"
                                        type="text"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...register("postalCode")}
                                    />
                                </Form.Group>
                            </Col>
                            <hr/>
                            <Col lg={6} md={6} sm={6} xs={12}>
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <TextField
                                        className="formField"
                                        id="outlined-number"
                                        label="Email *"
                                        type="text"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...register("email", {required: true, pattern: emailRegex})}
                                    />
                                    {errors.email && <span className="text-danger">
                                        {errors.email.type == "required" && "this field is required"}
                                        {errors.email.type == "pattern" && "please insert a valid email"}
                                    </span>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={6} xs={12}>
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <TextField
                                        className="formField"
                                        id="outlined-number"
                                        label="Password *"
                                        type="text"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...register("password", {required: true, minLength: "6", maxLength: "12"})}
                                    />
                                    {errors.password && <span className="text-danger">
                                        {errors.password.type == "required" && "this field is required"}
                                        {errors.password.type == "minLength" && "this field will minimum 6 char."}
                                        {errors.password.type == "maxLength" && "this field will maximum 12 char."}
                                    </span>}
                                </Form.Group>
                            </Col>
                            <Col className="mb-4 d-flex align-items-start" lg={12} md={12} sm={12} xs={12}>
                                <Checkbox onClick={e => setCheckStatus(!checkStatus)} className="ps-0"
                                          defaultChecked={checkStatus}/>
                                <span style={{fontSize: "14px"}} className="text-muted">We'll not share any of your privacy to others but, for security reasons we'll record your every movement.</span>
                            </Col>
                        </Row>

                        <Button ref={regBtnRef} className="mb-2" disabled={checkStatus == true ? false : true} type="submit"
                                variant="contained">Register
                            <span className={loader}><Loader/></span>
                        </Button><br/>
                        <Link to="/login" className="">Already have an account ?</Link>
                    </Form>

                </Col>
            </Row>
        </>
    );
}

export default RegistrationForm;