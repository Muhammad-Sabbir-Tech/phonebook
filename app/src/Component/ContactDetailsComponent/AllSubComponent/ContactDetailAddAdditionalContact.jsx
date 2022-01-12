import React, {useContext} from 'react';
import {ContactDetailsContext} from "../ContactDetailsComponent";
import {Button, Col, Row} from "react-bootstrap";
import {AiFillMinusCircle} from "@react-icons/all-files/ai/AiFillMinusCircle";
import TextField from "@mui/material/TextField";
import Loader from "../../Loader/Loader";
import {numRegex} from "../../../Utility/Regex";
import {ErrorToast, SuccessToast} from "../../../Utility/Toast";
import {useDispatch} from "react-redux";
import {addAdditionalAction} from "../../../Redux/Actions/ContactAction";

function ContactDetailAddAdditionalContact(props) {

    // context
    const {setEditClick, additionalNumber, setAdditionalLoader, setAdditionalNumber, singleContact, setSingleContact, addAdditionalLoader, setAddAdditionalLoader, setLogStatus} = useContext(ContactDetailsContext)

    // hooks
    const dispatch = useDispatch()

    // add additional number
    const additionalNumberAddOnclick = () => {
        setAdditionalNumber([...additionalNumber, {
            additional_number: "",
            contact_id: singleContact.id,
            user_id: singleContact.user_id

        }])
    }

    // remove additional number
    const additionalNumberRemoveOnClick = (i) => {
        const additionalArray = [...additionalNumber]
        additionalArray.splice(i, 1)
        setAdditionalNumber(additionalArray)
    }

    // additional number onChange
    const additionalNumberOnChange = (e, i) => {
        const additionalArray = [...additionalNumber]
        additionalArray[i].additional_number = e.target.value
        setAdditionalNumber(additionalArray)
    }

    // additional submit
    const additionalNumberSubmit = () => {

        let additionalNumberErr = false
        // checking all additionalNumbers are valid or not
        additionalNumber.map(data => {
            if (!numRegex.test(data.additional_number)) {
                additionalNumberErr = true
            }
        })
        additionalNumberErr == true && ErrorToast("please provide a valid number!!")

        // if numbers are all valud
        if (additionalNumberErr != true) {
            const payload = {
                data: {numbers: additionalNumber},
                singleContact: singleContact,
                setSingleContact: setSingleContact,
                setLogStatus: setLogStatus,
                setAddAdditionalLoader: setAddAdditionalLoader,
                setEditClick: setEditClick,
                setAdditionalLoader: setAdditionalLoader
            }
            dispatch(addAdditionalAction(payload))
        }
    }

    return (
        <>
            <hr className="mb-1"/>

            {/*additional button section*/}
            <div className="d-flex justify-content-between align-items-center">
                {/*additional field add*/}
                <button onClick={e => additionalNumberAddOnclick()}
                        className="p-0 m-0 bg-transparent text-primary border-0">additional number +
                </button>

                {/*additional number submit*/}
                {additionalNumber.length != 0 &&
                <div>
                    {addAdditionalLoader == false ? <Button onClick={e => additionalNumberSubmit()}
                                                            className="btn-primary btn-sm mt-1 p-1">Submit</Button> :
                        <Button className="btn-primary btn-sm mt-1 px-2"> <Loader/> </Button>
                    }


                </div>
                }
            </div>
            {/*************************/}

            <hr className="mt-2 mb-1"/>

            <Row>
                {additionalNumber.map((data, i) => (
                    <Col className="mb-2 d-flex flex-column additionalRemove justify-content-between" lg={6} md={12}
                         sm={12}>
                        <button id="additionalRemove"
                                onClick={e => {
                                    const index = i
                                    additionalNumberRemoveOnClick(index)
                                }} className="p-0 m-0 border-0 ms-auto bg-transparent text-danger">
                            <AiFillMinusCircle className="additionalRemove"/>
                        </button>
                        <TextField
                            placeholder="type additional number"
                            value={data.additional_number}
                            onChange={e => {
                                const index = i
                                additionalNumberOnChange(e, i)
                            }}
                            size="small"
                            className="formField"
                            id="outlined-number"
                            label=""
                            type="number"
                            InputLabelProps={{
                                shrink: false,
                            }}
                        />
                        {/*field notation*/}
                        <span className="EditNotation d-block text-end">additional number*</span>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default ContactDetailAddAdditionalContact;