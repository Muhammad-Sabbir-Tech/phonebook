import React, {useContext, useEffect} from 'react';
import {AllContactContext} from "../AllContactComponent";
import GetDataLoader from "../../Loader/GetDataLoader";
import {useDispatch} from "react-redux";
import {contactDetailShowHide} from "../../../Redux/Slice/contactDetailShowHide";
import {contactSlice} from "../../../Redux/Slice/ContactSlice";

function AllContactList(props) {
    // hooks
    const dispatch = useDispatch()

    // context api data
    const {
        loader,
        allContactData,
        searchKey,
    } = useContext(AllContactContext)


    // consact show hide in mobile view and detail show
    const contactListHide = (data) => {

        // checking the Route is dashboard or not
        if (window.location.hash == "#/dashboard") {
            const payload = {
                contactDetail: "d-block",
                contatactList: "d-none"
            }
            dispatch(contactDetailShowHide.actions.manageContactDetail(payload))

            // setting a single data for showing details
            dispatch(contactSlice.actions.getSingleContactReducer(data))

        }// checking route block end


    }

    return (
        <>
            <div className="contactList">
                {/*if data found, you can search contacts by this filter method using search key*/}
                {allContactData.length != 0 && allContactData.filter((data) => {
                    if (searchKey == "") {
                        return data
                    } else if (data.name.toLowerCase().includes(searchKey.toLowerCase()) || data.cell_number.includes(searchKey.toLowerCase())) {
                        return data
                    }
                }).map((data, i) => (
                    <div onClick={e => contactListHide(data)}
                         className="d-flex align-items-center singleContactRow me-1 me-md-0">
                        {/*if image not null*/}
                        {data.image_link.length > 10 && <img className="img-fluid contactImg" src={data.image_link}/>}

                        {/*if image null*/}
                        {data.image_link.length < 10 &&
                        <div className="contactLetter d-flex align-items-center justify-content-center"><span>
                            {data.name.split("")[0]}
                        </span></div>}

                        <div className="ms-3 d-flex flex-column">
                            <span className="allContactName">{data.name}</span>
                            <span className="text-muted number">{data.cell_number}</span>
                        </div>
                    </div>
                ))}

                {/*loading animation*/}
                {loader == true && <div className="d-flex justify-content-center">
                    <GetDataLoader/>
                </div>}

            </div>
        </>
    );
}

export default AllContactList;