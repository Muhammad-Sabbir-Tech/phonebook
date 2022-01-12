import {createSlice} from "@reduxjs/toolkit";

export const contactSlice = createSlice({
    name: "contacts",
    initialState: {
        allContacts: [],
        getSingleContact: []
    },
    reducers: {
        // get all contact reducer
        getAllContactReducer: (state, action) => {
            state.allContacts = action.payload
        },
        // get a single contact for view
        getSingleContactReducer: (state, action) => {
            state.getSingleContact = action.payload
        }
    }
})