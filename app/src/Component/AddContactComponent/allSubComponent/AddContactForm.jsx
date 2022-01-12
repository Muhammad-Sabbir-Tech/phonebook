import React, {useContext, useRef, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {styled} from '@mui/material/styles';
import {Button, Col, Form, Row} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import AdditionalContacts from "./AdditionalContacts";
import {useForm} from "react-hook-form";
import {TiTick} from "@react-icons/all-files/ti/TiTick";
import {AddContactContext} from "../addContactComponent";
import {emailRegex} from "../../../Utility/Regex";
import {ErrorToast} from "../../../Utility/Toast";
import Loader from "../../Loader/Loader";
import {useDispatch} from "react-redux";
import {contactAddAction} from "../../../Redux/Actions/ContactAction";

const Input = styled('input')({
    display: 'none',
});

function AddContactForm(props) {
    // hooks
    const dispatch = useDispatch()

    // context api
    const {additionalNumber, setAdditionalNumber, setLogStatus} = useContext(AddContactContext)

    // ref
    const addFormRef = useRef()
    const contactSaveBtnRef = useRef()

    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    // state
    const [imageView, setImageView] = useState("")
    const [image, setImage] = useState("")
    const [loader, setLoader] = useState(false)

    // contact image on change
    const imageOnChange = (e) => {
        // showing the uploaded image
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImageView(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])

        // set the image in state for sending in form data
        setImage(e.target.files[0])

    }


    // add contact on submit
    const onSubmit = data => {
        // checking image validation eg : type, length
        let imageErr = false
        if (image.length != 0) {
            if (image.type != "image/png" && image.type != "image/jpg" && image.type != "image/jpeg") {
                imageErr = true
                ErrorToast("please chose png or jpg or jpeg")
            }
            if (image.size > 1048576) {
                imageErr = true
                ErrorToast("please compress your image less than 1 MB.")
            }
        }

        // checking additional numbers are null or not
        let additionalNumberErr = false
        if (additionalNumber.length != 0) {
            additionalNumber.map(data => {
                if (data.additional_number == "") {
                    additionalNumberErr = true
                }
            })
        }
        if (additionalNumberErr == true) {
            ErrorToast("please fill all aditional numbers or remove")
        }


        // checking additional number and image are validate or not by there error
        if (additionalNumberErr != true && imageErr != true) {
            // all form data
            const {name, identity, phn, address, email} = data
            const pf = image
            // making all aditional number an string array for sending form data
            const stringAdditionalNumbers = JSON.stringify(additionalNumber)

            const formData = new FormData()
            formData.append("name", name)
            formData.append("identity", identity)
            formData.append("phn", phn)
            formData.append("address", address)
            formData.append("email", email)
            formData.append("pf", pf)
            formData.append("additional", stringAdditionalNumbers)

            const payload = {
                formData: formData,
                setLoader: setLoader,
                setAdditionalNumber: setAdditionalNumber,
                reset: reset,
                addFormRef: addFormRef,
                setImageView: setImageView,
                setImage: setImage,
                setLogStatus: setLogStatus,
                contactSaveBtnRef: contactSaveBtnRef
            }

            dispatch(contactAddAction(payload))
        }
    }

    return (
        <>
            <div className="contactAddContainer d-flex flex-column  align-items-center mx-md-2 mt-3">

                {/*******form onSubmit*********/}
                <Col lg={6} md={10} sm={8} xs={12} className="d-flex addContactSubmit justify-content-end">
                    {/*this is submit button but hidden cz, its clicked from tick*/}
                    <button className="p-0 m-0 border-0" id="addFormSubmit" type="submit" form="addForm"></button>

                    {/*form submit clicked from here*/}
                    <Button ref={contactSaveBtnRef} className="p-0 px-3 m-0" onClick={e => {
                        document.getElementById("addFormSubmit").click()
                    }}>
                        {loader == false && <TiTick/>}
                        {loader && <Loader/>}
                    </Button>
                </Col>
                {/***********************************/}

                {/*image upload section*/}
                <Col lg={6} md={10} sm={8} className=" d-flex justify-content-center ">
                    <div id="imageViewer" className="imageViewer">
                        {/*uploader*/}
                        <label className="uploader" htmlFor="icon-button-file">
                            {/*image handler*/}
                            <Input accept="image/*" onClick={e => setImageView("")} onChange={e => imageOnChange(e)}
                                   id="icon-button-file"
                                   type="file"/>
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera/>
                            </IconButton>
                        </label>
                        {/*view image*/}
                        <img className="img-fluid" src={imageView}/>
                    </div>
                </Col>
                {/****/}


                {/*contact form*/}
                <Col lg={12} md={12} sm={12}>
                    <hr/>
                    <Form ref={addFormRef} id="addForm" onSubmit={handleSubmit(onSubmit)} className="mt-4">
                        <Row>
                            {/*contact name*/}
                            <Col lg={6} md={6} ms={12}>
                                <Col lg={6} md={12} sm={12}>
                                    <Form.Group className="mb-2" controlId="formBasicEmail">
                                        <TextField
                                            placeholder="type contact name"
                                            size="small"
                                            className="formField"
                                            id="outlined-number"
                                            label=""
                                            type="text"
                                            InputLabelProps={{
                                                shrink: false,
                                            }}
                                            {...register("name", {required: true, maxLength: 16})}
                                        />
                                        {/*field notation*/}
                                        <span className="EditNotation d-block text-end">name*</span>
                                        {/*error check*/}
                                        {errors.name && <span className="text-danger">
                                        {errors.name.type == "required" && "this field is required"}
                                            {errors.name.type == "maxLength" && "maximum length 16"}
                                    </span>}
                                    </Form.Group>
                                </Col>
                            </Col>

                            {/*contact identity*/}
                            <Col lg={6} md={6} ms={12}>
                                <Col lg={6} md={12} sm={12}>
                                    <Form.Group className="mb-2" controlId="formBasicEmail">
                                        <TextField
                                            placeholder="type contact identity"
                                            size="small"
                                            className="formField"
                                            id="outlined-number"
                                            label=""
                                            type="text"
                                            InputLabelProps={{
                                                shrink: false,
                                            }}
                                            {...register("identity")}
                                        />
                                        {/*field notation*/}
                                        <span className="EditNotation d-block text-end">identity</span>
                                    </Form.Group>
                                </Col>
                            </Col>
                        </Row>
                        <Row>
                            {/*contact phone number*/}
                            <Col lg={6} md={6} ms={12}>
                                <Col lg={6} md={12} sm={12}>
                                    <Form.Group className="mb-2" controlId="formBasicEmail">
                                        <TextField
                                            placeholder="type contact number"
                                            size="small"
                                            className="formField"
                                            id="outlined-number"
                                            label=""
                                            type="number"
                                            InputLabelProps={{
                                                shrink: false,
                                            }}
                                            {...register("phn", {required: true})}
                                        />
                                        {/*field notation*/}
                                        <span className="EditNotation d-block text-end">phone number*</span>
                                        {/*error check*/}
                                        {errors.phn && <span className="text-danger">
                                        {errors.phn.type == "required" && "this field is required"}
                                    </span>}
                                    </Form.Group>
                                </Col>
                            </Col>

                            {/*contact email*/}
                            <Col lg={6} md={6} ms={12}>
                                <Col lg={6} md={12} sm={12}>
                                    <Form.Group className="mb-2" controlId="formBasicEmail">
                                        <TextField
                                            placeholder="type contact email"
                                            size="small"
                                            className="formField"
                                            id="outlined-number"
                                            label=""
                                            type="text"
                                            InputLabelProps={{
                                                shrink: false,
                                            }}
                                            {...register("email", {pattern: emailRegex})}
                                        />
                                        {/*field notation*/}
                                        <span className="EditNotation d-block text-end">email</span>
                                        {/*error check*/}
                                        {errors.email && <span className="text-danger">
                                        {errors.email.type == "pattern" && "insert a valid email"}
                                    </span>}
                                    </Form.Group>
                                </Col>
                            </Col>
                        </Row>

                        <Row>
                            {/*contact address*/}
                            <Col lg={6} md={6} ms={12}>
                                <Col lg={6} md={12} sm={12}>
                                    <Form.Group className="mb-2" controlId="formBasicEmail">
                                        <TextField
                                            placeholder="type contact address"
                                            size="small"
                                            className="formField"
                                            id="outlined-number"
                                            label=""
                                            type="text"
                                            InputLabelProps={{
                                                shrink: false,
                                            }}
                                            {...register("address")}
                                        />
                                        {/*field notation*/}
                                        <span className="EditNotation d-block text-end">address</span>

                                    </Form.Group>
                                </Col>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                {/****/}

                <Row className="w-100">
                    {/*additional contact*/}
                    <Col lg={6} md={12} sm={8} xs={12} className="ps-0">
                        <AdditionalContacts/>
                    </Col>
                    <Col lg={6} md={10} sm={8} xs={12} className=""></Col>

                </Row>
            </div>
        </>
    );
}

export default AddContactForm;