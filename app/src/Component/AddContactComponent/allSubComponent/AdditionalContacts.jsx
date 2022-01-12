import React, {useContext} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import {AddContactContext} from "../addContactComponent";
import {AiFillMinusCircle} from "@react-icons/all-files/ai/AiFillMinusCircle";

function AdditionalContacts(props) {
    // context
    const {additionalNumber, setAdditionalNumber} = useContext(AddContactContext)

    // add additional number
    const additionalNumberAddOnclick = () => {
        setAdditionalNumber([...additionalNumber, {additional_number: ""}])
    }

    // remove additional number
    const additionalNumberRemoveOnClick = (i) => {
        const additionalArray = [...additionalNumber]
        additionalArray.splice(i, 1)
        setAdditionalNumber(additionalArray)
    }

    // additional number onChange
    const additionalNumberOnChange = (e,i) => {
        const additionalArray = [...additionalNumber]
        additionalArray[i].additional_number = e.target.value
        setAdditionalNumber(additionalArray)
    }

    return (
        <>
            <hr className="mb-1"/>
            <button onClick={e => additionalNumberAddOnclick()}
                    className="p-0 m-0 bg-transparent text-primary border-0">additional number +
            </button>
            <hr className="mt-2 mb-1"/>
            <Row>
                {additionalNumber.map((data, i) => (
                    <Col className="mb-2 d-flex flex-column additionalRemove justify-content-between" lg={6} md={6}
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
                            onChange={e =>{
                                const index= i
                                additionalNumberOnChange(e,i)
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

export default AdditionalContacts;