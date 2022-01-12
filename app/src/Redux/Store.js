import {configureStore} from "@reduxjs/toolkit";
import {DemoSlice} from "./Slice/DemoSlice";
import {contactSlice} from "./Slice/ContactSlice";
import {contactDetailShowHide} from "./Slice/contactDetailShowHide";

export const Store = configureStore({
    devTools: true,
    reducer: {
        demo: DemoSlice.reducer,
        contacts: contactSlice.reducer,
        contactDetailShowHide: contactDetailShowHide.reducer
    }
})