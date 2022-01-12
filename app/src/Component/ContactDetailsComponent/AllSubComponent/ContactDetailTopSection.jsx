import React, {useContext, useRef} from 'react';
import {ContactDetailsContext} from "../ContactDetailsComponent";
import {AiOutlineArrowLeft} from "@react-icons/all-files/ai/AiOutlineArrowLeft";
import {contactDetailShowHide} from "../../../Redux/Slice/contactDetailShowHide";
import {useDispatch} from "react-redux";
import {Button} from "react-bootstrap";
import {AiFillDelete} from "@react-icons/all-files/ai/AiFillDelete";
import {AiFillEdit} from "@react-icons/all-files/ai/AiFillEdit";
import {contactSlice} from "../../../Redux/Slice/ContactSlice";
import {ImCross} from "@react-icons/all-files/im/ImCross";
import {contactDeleteAction} from "../../../Redux/Actions/ContactAction";

function ContactDetailTopSection(props) {
    // ref
    const deleteRef = useRef()

    // hooks
    const dispatch = useDispatch()

    // context api
    const {setEditClick, editClick, singleContact, setSingleContact, setLogStatus} = useContext(ContactDetailsContext)

    // hide contact detail by back click in mobile view
    const contactDetailHide = () => {
        const payload = {
            contactDetail: "d-none",
            contatactList: ""
        }

        dispatch(contactDetailShowHide.actions.manageContactDetail(payload))
    }

    // contact detail edit click
    const contactDetailEditOnClick = () => {
        setEditClick(!editClick)

        // resetting view
        if (editClick == true) {

            //resetting single contact
            setSingleContact([])
            dispatch(contactSlice.actions.getSingleContactReducer([]))

            const payload = {
                contactDetail: "d-none",
                contatactList: ""
            }

            dispatch(contactDetailShowHide.actions.manageContactDetail(payload))
        }

    }

    // contact delete
    const deleteOnClick = () => {
        const payload = {
            data: {contactId: singleContact.id},
            deleteRef: deleteRef,
            setSingleContact: setSingleContact
        }
        dispatch(contactDeleteAction(payload))
    }

    return (
        <>
            <div className='w-100'>
                {/*back from contact detail and edit button*/}
                <div className="d-flex w-100 align-items-center justify-content-between">
                    {/*back from contact detail*/}
                    <AiOutlineArrowLeft onClick={e => contactDetailHide()}
                                        className="d-block d-md-none contactDetailBackIcon contactDetailIcons "/>
                    {/*contact detail back icon hide on midium screen and this span show on midium screen in white text for manage this flex*/}
                    <span className="text-white d-none d-md-block">.</span>

                    {/*edit btn */}
                    <div className="d-flex align-items-center">
                        {/*delete button*/}
                        <Button ref={deleteRef} className="m-0 p-0 deleteButton bg-transparent border-0">
                            <AiFillDelete onClick={e => {
                                deleteOnClick()
                            }} className="contactDeleteIcon"/>
                        </Button>

                        {/*edit hit*/}
                        <span onClick={e => contactDetailEditOnClick()}
                              className="contactDetailEdit text-primary">{editClick ?
                            <ImCross className="contactEditIcon"/> :
                            <AiFillEdit className="contactEditIcon"/>}</span>
                    </div>
                </div>
                {/************/}
            </div>
        </>
    );
}

export default ContactDetailTopSection;