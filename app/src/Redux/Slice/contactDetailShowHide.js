import {createSlice} from "@reduxjs/toolkit";

export const contactDetailShowHide = createSlice({
    name: "contact detail show hide",
    initialState: {
        contactDetailShowInMobileView: "d-none",
        contactListShowInMobileView: ""
    },
    reducers: {
        manageContactDetail: (state, action) => {
            state.contactDetailShowInMobileView = action.payload.contactDetail
            state.contactListShowInMobileView = action.payload.contatactList
        }
    }
})