import {contactSingleUpdate, singleImageUpdateAction} from "../../../Redux/Actions/ContactAction";
import {ErrorToast} from "../../../Utility/Toast";
import {emailRegex, numRegex} from "../../../Utility/Regex";


// name update click
export const nameTrigger = (contactUpdate, setContactBasicLoader, contactBasicLoader, setLogStatus, setEditClick, singleContact, setSingleContact) => dispatch => {
    // check name field null or not
    if (contactUpdate.name.length != 0) {
        const payload = {
            data: {name: contactUpdate.name, id: singleContact.id},
            setContactBasicLoader: setContactBasicLoader,
            contactBasicLoader: contactBasicLoader,
            fieldName: "name",
            setLogStatus: setLogStatus,
            setEditClick: setEditClick,
            singleContact: singleContact,
            setSingleContact: setSingleContact
        }
        dispatch(contactSingleUpdate(payload))
    } else {
        ErrorToast("nothing to update!!")
    }
}

// identity update click
export const identityTrigger = (contactUpdate, setContactBasicLoader, contactBasicLoader, setLogStatus, setEditClick, singleContact, setSingleContact) => dispatch => {
    const payload = {
        data: {identity: contactUpdate.identity, id: singleContact.id},
        setContactBasicLoader: setContactBasicLoader,
        contactBasicLoader: contactBasicLoader,
        fieldName: "identity",
        setLogStatus: setLogStatus,
        setEditClick: setEditClick,
        singleContact: singleContact,
        setSingleContact: setSingleContact
    }
    dispatch(contactSingleUpdate(payload))
}

// number update click
export const numberTrigger = (contactUpdate, setContactBasicLoader, contactBasicLoader, setLogStatus, setEditClick, singleContact, setSingleContact) => dispatch => {
// check name field null or not
    if (contactUpdate.number.length != 0 && numRegex.test(contactUpdate.number)) {
        const payload = {
            data: {number: contactUpdate.number, id: singleContact.id},
            setContactBasicLoader: setContactBasicLoader,
            contactBasicLoader: contactBasicLoader,
            fieldName: "number",
            setLogStatus: setLogStatus,
            setEditClick: setEditClick,
            singleContact: singleContact,
            setSingleContact: setSingleContact
        }
        dispatch(contactSingleUpdate(payload))
    } else {
        ErrorToast("nothing to update!!")
    }
}

// address update click
export const addressTrigger = (contactUpdate, setContactBasicLoader, contactBasicLoader, setLogStatus, setEditClick, singleContact, setSingleContact) => dispatch => {
// check name field null or not
    const payload = {
        data: {address: contactUpdate.address, id: singleContact.id},
        setContactBasicLoader: setContactBasicLoader,
        contactBasicLoader: contactBasicLoader,
        fieldName: "address",
        setLogStatus: setLogStatus,
        setEditClick: setEditClick,
        singleContact: singleContact,
        setSingleContact: setSingleContact
    }
    dispatch(contactSingleUpdate(payload))
}

// email update click
export const emailTrigger = (contactUpdate, setContactBasicLoader, contactBasicLoader, setLogStatus, setEditClick, singleContact, setSingleContact) => dispatch => {
    // check name field null or not
    if (contactUpdate.email.length != 0 && !emailRegex.test(contactUpdate.email)) {
        // check email valid or not
        ErrorToast("please insert a valid email")

    } else {
        const payload = {
            data: {email: contactUpdate.email, id: singleContact.id},
            setContactBasicLoader: setContactBasicLoader,
            contactBasicLoader: contactBasicLoader,
            fieldName: "email",
            setLogStatus: setLogStatus,
            setEditClick: setEditClick,
            singleContact: singleContact,
            setSingleContact: setSingleContact
        }
        dispatch(contactSingleUpdate(payload))
    }
}

// image updateClick
export const imageTrigger = (image, singleContact, setLogStatus, setImageLoader) => dispatch => {
// checking image validation eg : type, length
    let imageErr = false
    if (image.length != 0) {
        if (image.type != "image/png" && image.type != "image/jpg" && image.type != "image/jpeg") {
            imageErr = true
            ErrorToast("please chose png or jpg or jpeg")
        }
        if (image.size > 1048576) {
            imageErr = true
            ErrorToast("please compress your image less than 1 MB.")
        }
    }
    // if image has no error
    if (imageErr == false) {
        // setting image and id as a form data
        const formData = new FormData()
        formData.append("pf", image)
        formData.append("id", singleContact.id)
        // making payload for dispatch
        const payload = {
            formData: formData,
            setLogStatus: setLogStatus,
            setImageLoader: setImageLoader
        }
        dispatch(singleImageUpdateAction(payload))
    }
}

// additional update click
export const additionalTrigger = (additionalUpdate, singleContact, additionalLoader, setAdditionalLoader, setLogStatus, i) => dispatch => {

    // check name field null or not
    if (additionalUpdate.length != 0) {
        // check number or not
        if (numRegex.test(additionalUpdate[i].addition_number)) {
            const payload = {
                data: {
                    addition_number: additionalUpdate[i].addition_number,
                    id: singleContact.additional_numbers[i].contact_id,
                    additional_id: singleContact.additional_numbers[i].id
                },
                index: i,
                fieldName: "additional",
                additionalLoader: additionalLoader,
                setAdditionalLoader: setAdditionalLoader,
                setLogStatus: setLogStatus
            }
            // alert(JSON.stringify(payload))
            dispatch(contactSingleUpdate(payload))
        } else {
            ErrorToast("insert a valid number")
        }
    } else {
        ErrorToast("nothing to update!!")
    }
}