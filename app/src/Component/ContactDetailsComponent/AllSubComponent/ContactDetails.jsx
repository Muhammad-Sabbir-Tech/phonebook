import React, {useContext, useEffect, useState} from 'react';
import {BiPhoneCall} from "@react-icons/all-files/bi/BiPhoneCall";
import {Col, Row} from "react-bootstrap";
import {BiCurrentLocation} from "@react-icons/all-files/bi/BiCurrentLocation";
import {AiOutlineMail} from "@react-icons/all-files/ai/AiOutlineMail";
import {useDispatch} from "react-redux";
import {ContactDetailsContext} from "../ContactDetailsComponent";
import {AiFillContacts} from "@react-icons/all-files/ai/AiFillContacts";
import ContactDetailTopSection from "./ContactDetailTopSection";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {styled} from "@mui/material/styles";
import {TiTickOutline} from "@react-icons/all-files/ti/TiTickOutline";
import {AiFillMinusCircle} from "@react-icons/all-files/ai/AiFillMinusCircle";
import ContactUpdateLoader from "../../Loader/ContactUpdateLoader";
import {
    contactSingleUpdate,
    deleteAdditionalNumberAction,
    singleImageUpdateAction
} from "../../../Redux/Actions/ContactAction";
import {ErrorToast} from "../../../Utility/Toast";
import {emailRegex, numRegex} from "../../../Utility/Regex";
import {
    additionalTrigger,
    addressTrigger, emailTrigger,
    identityTrigger, imageTrigger,
    nameTrigger,
    numberTrigger
} from "../ContactDetailBtnTrigger/ContactDetailBtnTrigger";
import ContactDetailAddAdditionalContact from "./ContactDetailAddAdditionalContact";

const Input = styled('input')({
    display: 'none',
});

function ContactDetails(props) {
    // hooks
    const dispatch = useDispatch()

    // context
    const {
        singleContact,
        setSingleContact,
        setEditClick,
        editClick,
        contactUpdate,
        setContactUpdate,
        setAdditionalUpdate,
        additionalUpdate,
        contactBasicLoader,
        setContactBasicLoader,
        setLogStatus,
        setImageLoader,
        imageLoader,
        additionalLoader,
        setAdditionalLoader,
        setAdditionalNumber,
    } = useContext(ContactDetailsContext)

    // state
    const [imageView, setImageView] = useState("")
    const [image, setImage] = useState("")

    // edit action false in every render lifecycle
    useEffect(() => {
        setEditClick(false)
        setImageView("")
        setImage("")
        setAdditionalLoader([])
        setAdditionalNumber([])
    }, [singleContact])


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

    return (
        <>
            <div className="contactAddContainer d-flex flex-column  align-items-center ms-md-3 mt-3">
                {singleContact.length != 0 && <div className='w-100'>

                    {/*back from contact detail and edit button*/}
                    <ContactDetailTopSection/>
                    {/************/}


                    <div className="text-center w-100">
                        {/*contact avatar showing in detail*/}
                        {editClick == false ? <div>
                                {singleContact.image_link.length > 10 &&
                                <img className="pf" src={singleContact.image_link} alt=""/>}
                                {singleContact.image_link.length < 10 &&
                                <div className="contactDetailLetter d-flex align-items-center justify-content-center">
                                    <p className="mb-0">{singleContact.name.split("")[0]}</p>
                                </div>}
                            </div> :

                            // edit contact image field
                            <div className="imagefiledBox">
                                <div id="imageViewer" className="m-auto d-inline-block imageViewer">
                                    {/*uploader*/}
                                    <label className="uploader" htmlFor="icon-button-file">
                                        {/*image handler*/}
                                        <Input accept="image/*" onClick={e => {
                                            setImageView("")
                                            setImage("")
                                        }} onChange={e => imageOnChange(e)} id="icon-button-file" type="file"/>
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera/>
                                        </IconButton>
                                    </label>
                                    {/*view image*/}
                                    <img className="img-fluid" src={imageView}/>
                                </div>


                                {/*contact image submit*/}
                                {imageLoader == false ? <TiTickOutline onClick={e => {
                                        dispatch(imageTrigger(image, singleContact, setLogStatus, setImageLoader))
                                    }} className="contactImageUpdate"/> :
                                    <div>
                                        <div className="imageLoader ">uploading...</div>
                                    </div>}
                                {/**************/}

                            </div>
                        }

                        <div></div>
                        {/*contact basic data*/}
                        {/*contact name*/}
                        {editClick == false ? <h4 className="contactName mb-0">{singleContact.name}</h4> :
                            // name edit
                            <Row className="w-100 d-flex  justify-content-center">
                                <Col lg={3} md={6} sm={12} className="ms-4 mt-2">

                                    {/*****delete and update button*****/}
                                    <dvi className="d-flex justify-content-end">
                                        {contactBasicLoader.nameLoader == false ? <TiTickOutline onClick={e => {
                                            dispatch(nameTrigger(contactUpdate, setContactBasicLoader, contactBasicLoader, setLogStatus, setEditClick, singleContact, setSingleContact))
                                        }} className="contactUpdateBtn"/> : <ContactUpdateLoader/>}
                                    </dvi>
                                    {/***************/}


                                    {/*edit field*/}
                                    <TextField
                                        placeholder="type contact name"
                                        defaultValue={singleContact.name}
                                        onChange={e => setContactUpdate({...contactUpdate, name: e.target.value})}
                                        size="small"
                                        className="formField"
                                        id="outlined-number"
                                        label=""
                                        type="text"
                                        InputLabelProps={{
                                            shrink: false,
                                        }}
                                    />
                                    <span className="EditNotation d-block text-end">name*</span>
                                </Col>

                            </Row>}

                        {/*contact identity*/}
                        {editClick == false ?
                            <p className="mt-0 pt-0 text-muted identity">{singleContact.identity.length != 0 ? singleContact.identity : "n/a"}</p> :
                            // edit onctact identity
                            <Row className="w-100 d-flex  justify-content-center">
                                <Col lg={3} md={6} sm={12} className="ms-4 mt-2">

                                    {/*********delete and update button***********/}
                                    <dvi className="d-flex justify-content-end">
                                        {contactBasicLoader.identityLoader == false ? <TiTickOutline onClick={e => {
                                            dispatch(identityTrigger(contactUpdate, setContactBasicLoader, contactBasicLoader, setLogStatus, setEditClick, singleContact, setSingleContact))
                                        }} className="contactUpdateBtn"/> : <ContactUpdateLoader/>}
                                    </dvi>
                                    {/*************/}

                                    {/*edit field*/}
                                    <TextField
                                        placeholder="type contact identity"
                                        defaultValue={singleContact.identity}
                                        onChange={e => setContactUpdate({...contactUpdate, identity: e.target.value})}
                                        size="small"
                                        className="formField"
                                        id="outlined-number"
                                        label=""
                                        type="text"
                                        InputLabelProps={{
                                            shrink: false,
                                        }}
                                    />
                                    <span className="EditNotation d-block text-end">Identity</span>
                                </Col>
                            </Row>}
                        <hr className="mt-3"/>
                    </div>

                    {/*contact number detail and additional number*/}
                    <Row className="w-100 ">
                        <Col lg={6} md={6} sm={12} className="">
                            {/*conatact number*/}
                            {editClick == false ? <div>
                                    <div className="d-flex align-items-center">
                                        <BiPhoneCall className="contactDetailIcons me-3"/>
                                        <a href="tel:01789096018"
                                           className="detailText text-decoration-none">{singleContact.cell_number}</a>
                                    </div>
                                    <span className="detailNotation">number</span>
                                </div> :
                                // number edit
                                <Row className="w-100 d-flex  ">
                                    <Col lg={6} md={12} sm={12} className="ms-4 mt-2 p-0">

                                        {/************delete and update button**********/}
                                        <dvi className="d-flex justify-content-end">
                                            {contactBasicLoader.numberLoader == false ? <TiTickOutline onClick={e => {
                                                dispatch(numberTrigger(contactUpdate, setContactBasicLoader, contactBasicLoader, setLogStatus, setEditClick, singleContact, setSingleContact))
                                            }} className="contactUpdateBtn"/> : <ContactUpdateLoader/>}
                                        </dvi>
                                        {/**********************/}

                                        {/*edit field*/}
                                        <TextField
                                            placeholder="type contact number"
                                            defaultValue={singleContact.cell_number}
                                            onChange={e => setContactUpdate({...contactUpdate, number: e.target.value})}
                                            size="small"
                                            className="formField"
                                            id="outlined-number"
                                            label=""
                                            type="number"
                                            InputLabelProps={{
                                                shrink: false,
                                            }}
                                        />
                                        <span className="EditNotation d-block text-end">phone number*</span>
                                    </Col>
                                </Row>}

                            {/*contact address*/}
                            {editClick == false ? <div>
                                    <div className="d-flex align-items-center mt-4">
                                        <BiCurrentLocation className="contactDetailIcons me-3"/>
                                        <address
                                            className="detailText text-decoration-none mb-0">{singleContact.address.length != 0 ? singleContact.address : "n/a"}</address>
                                    </div>
                                    <span className="detailNotation">address</span>
                                </div> :
                                // address edit field
                                <Row className="w-100 d-flex  ">
                                    <Col lg={6} md={12} sm={12} className="ms-4 mt-2 p-0">

                                        {/*********update button********/}
                                        <div className="d-flex justify-content-end">
                                            {contactBasicLoader.addressLoader == false ? <TiTickOutline onClick={e => {
                                                dispatch(addressTrigger(contactUpdate, setContactBasicLoader, contactBasicLoader, setLogStatus, setEditClick, singleContact, setSingleContact))
                                            }} className="contactUpdateBtn"/> : <ContactUpdateLoader/>}
                                        </div>
                                        {/******************/}


                                        {/*edit field*/}
                                        <TextField
                                            placeholder="type contact address"
                                            defaultValue={singleContact.address}
                                            onChange={e => setContactUpdate({
                                                ...contactUpdate,
                                                address: e.target.value
                                            })}
                                            size="small"
                                            className="formField"
                                            id="outlined-number"
                                            label=""
                                            type="text"
                                            InputLabelProps={{
                                                shrink: false,
                                            }}
                                        />
                                        <span className="EditNotation d-block text-end">address</span>
                                    </Col>
                                </Row>}

                        </Col>

                        <Col lg={6} md={6} sm={12} className="">
                            {/*contact email*/}
                            {editClick == false ? <div>
                                    <div className="d-flex align-items-center">
                                        <AiOutlineMail className="contactDetailIcons me-3"/>
                                        <a href="mailto:g.shanto18@gmail.com"
                                           className="detailText text-decoration-none">{singleContact.email.length != 0 ? singleContact.email : "n/a"}</a>
                                    </div>
                                    <span className="detailNotation">email</span>
                                </div> :
                                // email edit field
                                <Row className="w-100 d-flex  ">
                                    <Col lg={6} md={12} sm={12} className="ms-4 ms-md-2 mt-2 p-0">

                                        {/********delete and update button*******/}
                                        <dvi className="d-flex justify-content-end">
                                            {contactBasicLoader.emailLoader == false ? <TiTickOutline onClick={e => {
                                                dispatch(emailTrigger(contactUpdate, setContactBasicLoader, contactBasicLoader, setLogStatus, setEditClick, singleContact, setSingleContact))
                                            }} className="contactUpdateBtn"/> : <ContactUpdateLoader/>}
                                        </dvi>
                                        {/****************/}

                                        {/*edit field*/}
                                        <TextField
                                            placeholder="type contact email"
                                            defaultValue={singleContact.email}
                                            onChange={e => setContactUpdate({...contactUpdate, email: e.target.value})}
                                            size="small"
                                            className="formField "
                                            id="outlined-number"
                                            label=""
                                            type="text"
                                            InputLabelProps={{
                                                shrink: false,
                                            }}
                                        />
                                        <span className="EditNotation d-block text-end">email</span>
                                    </Col>
                                </Row>
                            }

                            {/*additional number lable*/}
                            <hr className="mb-0"/>
                            <span className="detailNotation ms-0">additional numbers -></span>
                            <hr className="mt-2"/>

                            {/*all additional numbers*/}
                            {singleContact.additional_numbers.length != 0 ? singleContact.additional_numbers.map((data, i) => {
                                if (editClick == false) {
                                    //additional number detail view
                                    return <div className="mb-2">
                                        <div className="d-flex align-items-center">
                                            <BiPhoneCall className="contactDetailIcons me-3"/>
                                            <a href="tel:01789096018"
                                               className="detailText text-decoration-none">{data.additional_number}</a>
                                        </div>
                                        <span className="detailNotation">additional</span>
                                    </div>
                                } else {
                                    // additional edit field
                                    return <Row className="w-100 d-flex  ">
                                        <Col lg={6} md={12} sm={12} className="ms-4 ms-md-2 mt-2 p-0">

                                            {/*****delete and update button*******/}
                                            <dvi className="d-flex justify-content-end">
                                                {/*additional update*/}
                                                <TiTickOutline onClick={e => {
                                                    dispatch(additionalTrigger(additionalUpdate, singleContact, additionalLoader, setAdditionalLoader, setLogStatus, i))
                                                }} className={"contactUpdateBtn " + additionalLoader[i]?.submit}/>
                                                {/*additional update spinner*/}
                                                <span
                                                    className={"d-flex align-items-center me-1 " + additionalLoader[i]?.spinner}><ContactUpdateLoader/></span>

                                                {/*additional delete*/}
                                                <AiFillMinusCircle
                                                    onClick={e => {
                                                        const payload = {
                                                            data: data,
                                                            setLogStatus: setLogStatus,
                                                            setEditClick: setEditClick,
                                                            singleContact: singleContact,
                                                            setSingleContact: setSingleContact,
                                                            index: i,
                                                            additionalLoader: additionalLoader,
                                                            setAdditionalLoader: setAdditionalLoader
                                                        }
                                                        dispatch(deleteAdditionalNumberAction(payload))

                                                    }}
                                                    className={"contactDltBtn " + additionalLoader[i]?.delete}/>
                                                <span
                                                    className={"d-flex align-items-center me-1 " + additionalLoader[i]?.deleteSpinner}><ContactUpdateLoader/></span>
                                            </dvi>
                                            {/***********************/}

                                            {/*edit field*/}
                                            <TextField
                                                placeholder="type additional number"
                                                defaultValue={data.additional_number}
                                                onChange={e => {
                                                    const additionalArray = [...additionalUpdate]
                                                    additionalArray[i] = {addition_number: e.target.value}
                                                    setAdditionalUpdate(additionalArray)
                                                }}
                                                size="small"
                                                className="formField "
                                                id="outlined-number"
                                                label=""
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: false,
                                                }}
                                            />
                                            <span className="EditNotation d-block text-end">additional number</span>
                                        </Col>
                                    </Row>
                                }
                            }) : <p className="text-muted mt-2">no additional number</p>}

                            {/*additional number*/}
                            {editClick == true && <ContactDetailAddAdditionalContact/>}


                        </Col>
                    </Row>
                </div>}
                {singleContact.length == 0 &&
                <div className="mt-5 pt-5 d-flex flex-column justify-content-center align-items-center">
                    <AiFillContacts className="contactDetailNoPreview"/>
                    <span className="text-muted">dosen't select any contact</span>
                </div>}

            </div>
        </>
    );
}

export default ContactDetails;