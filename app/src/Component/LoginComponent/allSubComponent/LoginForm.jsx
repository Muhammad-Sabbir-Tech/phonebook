import React, {useContext, useRef, useState} from 'react';
import {useForm} from "react-hook-form";
import {Button, Card, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {AiOutlineLogin} from "@react-icons/all-files/ai/AiOutlineLogin";
import {emailRegex} from "../../../Utility/Regex";
import {LoginContext} from "../LoginComponent";
import Loader from "../../Loader/Loader";
import {useDispatch} from "react-redux";
import {loginAction} from "../../../Redux/Actions/RegAndLoginAction";


function LoginForm(props) {
    // hooks
    const loginFormRef = useRef()
    const dispatch = useDispatch()

    // context
    const {setLogStatus} = useContext(LoginContext)

    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    // states
    const [loader, setLoader] = useState("d-none")

    const onSubmit = (data, e) => {

        const payload = {
            data: data,
            reset: reset,
            setLoader: setLoader,
            loginFormRef: loginFormRef,
            setLogStatus:setLogStatus
        }

        dispatch(loginAction(payload))
    }


    return (
        <>
            <Container>
                <Row className="d-flex align-items-center justify-content-center">
                    <Col lg={4} md={6} sm={8} xs={12} className="mt-md-5 pt-md-5 mt-2">
                        <Card className="pt-3 pb-1">
                            <AiOutlineLogin className="loginPageIcon"/>
                            <h4 className="text-center text-dark">Login</h4>

                            <Form ref={loginFormRef} id="loginForm" className="mx-4 mt-3 "
                                  onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="demo@demo.com"
                                        {...register("email", {required: true, pattern: emailRegex})}
                                    />
                                    {errors.email && <span className="text-danger">
                                        {errors.email.type == "required" && "this field is required"}
                                        {errors.email.type == "pattern" && "please input a valid email"}
                                    </span>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="123456"
                                        {...register("password", {required: true, minLength: "6", maxLength: "12"})}
                                    />
                                    {errors.password && <span className="text-danger">
                                        {errors.password.type == "required" && "this field is required"}
                                        {errors.password.type == "minLength" && "password should minimum 6 char."}
                                        {errors.password.type == "maxLength" && "password should maximum 12 char"}
                                    </span>}
                                </Form.Group>


                                <Button variant="primary" className="mt-3  w-100" type="submit">
                                    <span className="d-inline-block">Login</span>
                                    <span className={loader}>
                                        <Loader/>
                                    </span>
                                </Button>

                                <div className="d-flex mt-1 mb-4 justify-content-between">
                                    <Link to="/" className=" text-center ">Dont have a account?</Link>
                                    <Link to="/" className=" text-center ">Forgot pass.</Link>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default LoginForm;