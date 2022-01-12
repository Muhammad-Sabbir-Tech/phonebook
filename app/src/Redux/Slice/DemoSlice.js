import {createSlice} from "@reduxjs/toolkit";

export const DemoSlice = createSlice({
    name: "demo",
    initialState: {
        test: "n/a"
    },
    reducers: {
        testSlice: (state, action) => {
            state.test = action.payload
        }
    }
})