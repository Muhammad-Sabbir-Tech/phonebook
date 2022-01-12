import React, {useContext} from 'react';
import TextField from "@mui/material/TextField";
import {AllContactContext} from "../AllContactComponent";

function SearchContact(props) {
    // context
    const {allContactData, setSearchKey} = useContext(AllContactContext)


    return (
        <>
            <TextField
                onChange={e=>setSearchKey(e.target.value)}
                size="small"
                className="contactSearch formField"
                id="outlined-number"
                label=""
                placeholder={"search from "+allContactData.length+" contacts"}
                type="text"
                InputLabelProps={{
                    shrink: false,
                }}
            />

        </>
    );
}

export default SearchContact;