// add contact action
import axios from "axios";
import {AuthCheck} from "../../Utility/AuthCheck";
import {
    additionalAdd, deleteAdditionalNumber, deleteContact,
    getAllContact,
    saveContact,
    singleContactImageUpdate,
    singleFieldUpdate
} from "../../AllRoute/ApiRoute";
import {ErrorToast, SuccessToast} from "../../Utility/Toast";
import {contactSlice} from "../Slice/ContactSlice";


// get all contact
export const getAllContactAction = payload => dispatch => {


    // making headers by userId and token for checking authentication inside backend
    const headers = AuthCheck()

    // loading animation display
    payload && payload.setLoader(true)

    axios.get(getAllContact, {headers}).then(res => {
        if (res.data.status == true) {
            // setting the response inside slice state
            dispatch(contactSlice.actions.getAllContactReducer(res.data.data))

            // loading animation hide
            payload && payload.setLoader(false)
        } else {
            // loading animation hide
            payload && payload.setLoader(false)

            ErrorToast("something went wrong")
        }
    }).catch(err => {
        try {
            // if un authorize
            err.response.status == 401 && payload && payload.setLogStatus(false)

            // loading animation hide
            payload && payload.setLoader(false)

            console.log(err)
            ErrorToast("something went wrong")
        } catch (e) {
            // loading animation in button hide
            payload && payload.setLoader(false)

            console.log(err)
            ErrorToast("something went wrong")
        }
    })
}


// add contact
export const contactAddAction = payload => dispatch => {
    const {formData, setLoader, setAdditionalNumber, reset, addFormRef, setImageView, setImage, setLogStatus, contactSaveBtnRef} = payload

    const headers = AuthCheck()

    // contact save button disabled
    contactSaveBtnRef.current.disabled = true
    // loading animation in button display
    setLoader(true)

    axios.post(saveContact, formData, {headers}).then(res => {
        // if contact saved successfully
        if (res.data.status == true) {
            // update all contacts
            dispatch(getAllContactAction())

            // contact save button enable
            contactSaveBtnRef.current.disabled = false
            // loading animation in button hide
            setLoader(false)

            // remove all additional field from form
            setAdditionalNumber([])

            // form reset
            addFormRef.current.reset()
            reset()
            setImageView("")
            setImage("")


            SuccessToast("contact saved successfully!!")
        }
        // if contact not saved
        else if (res.data.status == false) {
            // contact save button enable
            contactSaveBtnRef.current.disabled = false
            // loading animation in button hide
            setLoader(false)

            ErrorToast("contact not saved!! try again.")
        } else {
            // contact save button enable
            contactSaveBtnRef.current.disabled = false
            // loading animation in button hide
            setLoader(false)

            SuccessToast("something went wrong !!")
        }
    }).catch(err => {
        try {
            // if un authorize
            err.response.status == 401 && setLogStatus(false)

            // contact save button enable
            contactSaveBtnRef.current.disabled = false
            // loading animation in button hide
            setLoader(false)

            console.log(err)
            ErrorToast("something went wrong !!")
        } catch (e) {
            // contact save button enable
            contactSaveBtnRef.current.disabled = false
            // loading animation in button hide
            setLoader(false)

            console.log(err)
            ErrorToast("something went wrong !!")
        }
    })
}

// contact single update
export const contactSingleUpdate = payload => dispatch => {
    const {data, setContactBasicLoader, contactBasicLoader, fieldName, setLogStatus, setAdditionalLoader, additionalLoader, index = ""} = payload

    //making header for axios
    const headers = AuthCheck()

    // loading animation setting
    fieldName == "name" && setContactBasicLoader({...contactBasicLoader, nameLoader: true})
    fieldName == "identity" && setContactBasicLoader({...contactBasicLoader, identityLoader: true})
    fieldName == "number" && setContactBasicLoader({...contactBasicLoader, numberLoader: true})
    fieldName == "address" && setContactBasicLoader({...contactBasicLoader, addressLoader: true})
    fieldName == "email" && setContactBasicLoader({...contactBasicLoader, emailLoader: true})

    // additional contact loading view
    if (fieldName == "additional") {
        const additionalLoaderArray = [...additionalLoader]
        additionalLoaderArray[index] = {
            spinner: " ",
            submit: "d-none",
            deleteSpinner: "d-none",
            delete: " "
        }
        setAdditionalLoader(additionalLoaderArray)
    }

    axios.post(singleFieldUpdate, data, {headers}).then(res => {

        if (res.data.status == true) {
            // reload all contact
            dispatch(getAllContactAction())

            // loading animation disable
            fieldName == "name" && setContactBasicLoader({...contactBasicLoader, nameLoader: false})
            fieldName == "identity" && setContactBasicLoader({...contactBasicLoader, identityLoader: false})
            fieldName == "number" && setContactBasicLoader({...contactBasicLoader, numberLoader: false})
            fieldName == "address" && setContactBasicLoader({...contactBasicLoader, addressLoader: false})
            fieldName == "email" && setContactBasicLoader({...contactBasicLoader, emailLoader: false})
            // additional contact loading hide
            if (fieldName == "additional") {
                const additionalLoaderArray = [...additionalLoader]
                additionalLoaderArray[index] = {
                    spinner: "d-none",
                    submit: " ",
                    deleteSpinner: "d-none",
                    delete: " "
                }
                setAdditionalLoader(additionalLoaderArray)
            }

            SuccessToast("updated success")
        } else {
            // loading animation disable
            fieldName == "name" && setContactBasicLoader({...contactBasicLoader, nameLoader: false})
            fieldName == "identity" && setContactBasicLoader({...contactBasicLoader, identityLoader: false})
            fieldName == "number" && setContactBasicLoader({...contactBasicLoader, numberLoader: false})
            fieldName == "address" && setContactBasicLoader({...contactBasicLoader, addressLoader: false})
            fieldName == "email" && setContactBasicLoader({...contactBasicLoader, emailLoader: false})
            // additional contact loading hide
            if (fieldName == "additional") {
                const additionalLoaderArray = [...additionalLoader]
                additionalLoaderArray[index] = {
                    spinner: "d-none",
                    submit: " ",
                    deleteSpinner: "d-none",
                    delete: " "
                }
                setAdditionalLoader(additionalLoaderArray)
            }

            ErrorToast("update failed! try again")
        }

    }).catch(err => {
        try {
            // if un authorize
            err.response.status == 401 && setLogStatus(false)

            // loading animation disable
            fieldName == "name" && setContactBasicLoader({...contactBasicLoader, nameLoader: false})
            fieldName == "identity" && setContactBasicLoader({...contactBasicLoader, identityLoader: false})
            fieldName == "number" && setContactBasicLoader({...contactBasicLoader, numberLoader: false})
            fieldName == "address" && setContactBasicLoader({...contactBasicLoader, addressLoader: false})
            fieldName == "email" && setContactBasicLoader({...contactBasicLoader, emailLoader: false})
            // additional contact loading hide
            if (fieldName == "additional") {
                const additionalLoaderArray = [...additionalLoader]
                additionalLoaderArray[index] = {
                    spinner: "d-none",
                    submit: " ",
                    deleteSpinner: "d-none",
                    delete: " "
                }
                setAdditionalLoader(additionalLoaderArray)
            }

            console.log(err)
            ErrorToast("something went wrong !!")
        } catch (e) {
            // loading animation disable
            fieldName == "name" && setContactBasicLoader({...contactBasicLoader, nameLoader: false})
            fieldName == "identity" && setContactBasicLoader({...contactBasicLoader, identityLoader: false})
            fieldName == "number" && setContactBasicLoader({...contactBasicLoader, numberLoader: false})
            fieldName == "address" && setContactBasicLoader({...contactBasicLoader, addressLoader: false})
            fieldName == "email" && setContactBasicLoader({...contactBasicLoader, emailLoader: false})
            // additional contact loading hide
            if (fieldName == "additional") {
                const additionalLoaderArray = [...additionalLoader]
                additionalLoaderArray[index] = {
                    spinner: "d-none",
                    submit: " ",
                    deleteSpinner: "d-none",
                    delete: " "
                }
                setAdditionalLoader(additionalLoaderArray)
            }

            console.log(err)
            ErrorToast("something went wrong !!")
        }
    })


}

// single contact image update
export const singleImageUpdateAction = payload => dispatch => {
    // getting parameter
    const {formData, setLogStatus, setImageLoader} = payload

    // setting headers
    const headers = AuthCheck()

    // set image image loader true
    setImageLoader(true)

    axios.post(singleContactImageUpdate, formData, {headers}).then(res => {
        if (res.data.status == true) {
            dispatch(getAllContactAction())

            // set image image loader false
            setImageLoader(false)

            SuccessToast("image updated.")
        } else {
            // set image image loader false
            setImageLoader(false)
            ErrorToast("something went wrong!! please try again.")
        }
    }).catch(err => {
        try {
            // if un authorize
            err.response.status == 401 && setLogStatus(false)

            // set image image loader false
            setImageLoader(false)
            console.log(err)
            ErrorToast("something went wrong !!")
        } catch (e) {
            // set image image loader false
            setImageLoader(false)
            console.log(err)
            ErrorToast("something went wrong !!")
        }
    })
}

// add additional action
export const addAdditionalAction = payload => disptch => {
    const {data, setEditClick, singleContact, setSingleContact, setLogStatus, setAddAdditionalLoader} = payload

    // setting headers
    const headers = AuthCheck()

    // loading animation display
    // setAddAdditionalLoader(true)


    axios.post(additionalAdd, data, {headers}).then(res => {
        // if data saved
        if (res.data.status == true) {
            // refresh all contact
            disptch(getAllContactAction())

            setEditClick(false)

            //getting all exist additional number
            let allAdditionalNumber = [...singleContact.additional_numbers]

            // set new additional number with exist additonal number
            allAdditionalNumber.push(...res.data.additionalNumbers)

            //get all single contact number for update state with all additional number
            const allSingleContact = {...singleContact}

            //update additional number
            allSingleContact.additional_numbers = [...allAdditionalNumber]

            //update state single contact state
            setSingleContact(allSingleContact)

            // loading animation hide
            setAddAdditionalLoader(false)
        }
        // if additional number not added
        else {
            ErrorToast("data not saved")
            // loading animation hide
            setAddAdditionalLoader(false)
        }
    }).catch(err => {
        try {
            // if un authorize
            err.response.status == 401 && setLogStatus(false)

            // loading animation hide
            setAddAdditionalLoader(false)

            console.log(err)
            ErrorToast("something went wrong !!")
        } catch (e) {
            // loading animation hide
            setAddAdditionalLoader(false)

            console.log(err)
            ErrorToast("something went wrong !!")
        }
    })

}


// delete additional number
export const deleteAdditionalNumberAction = payload => dispatch => {
    // receiving all params from payload
    const {data, setLogStatus, setEditClick, singleContact, setSingleContact, index, additionalLoader, setAdditionalLoader} = payload

    //making header
    const headers = AuthCheck()

    // delete loading view
    const allAdditionalLoader = [...additionalLoader]
    allAdditionalLoader[index] = {spinner: "d-none", submit: " ", deleteSpinner: " ", delete: "d-none"}
    setAdditionalLoader(allAdditionalLoader)

    axios.post(deleteAdditionalNumber, data, {headers}).then(res => {
        // if data deleted
        if (res.data.status == true) {
            // reload get all contact
            dispatch(getAllContactAction())

            setEditClick(false)

            const getAllAdditionalNumber = [...singleContact.additional_numbers]
            getAllAdditionalNumber.splice(index, 1)
            const updateAllSingleContact = {...singleContact}
            updateAllSingleContact.additional_numbers = getAllAdditionalNumber
            setSingleContact(updateAllSingleContact)
        }
        // if failed to delte
        else {
            // delete loading hide
            const allAdditionalLoader = [...additionalLoader]
            allAdditionalLoader[index] = {spinner: "d-none", submit: " ", deleteSpinner: "d-none", delete: ""}
            setAdditionalLoader(allAdditionalLoader)
            ErrorToast("number delete failed. please try again")
        }
    }).catch(err => {
        try {
            // if un authorize
            err.response.status == 401 && setLogStatus(false)

            // delete loading hide
            const allAdditionalLoader = [...additionalLoader]
            allAdditionalLoader[index] = {spinner: "d-none", submit: " ", deleteSpinner: "d-none", delete: ""}
            setAdditionalLoader(allAdditionalLoader)

            console.log(err)
            ErrorToast("something went wrong !!")
        } catch (e) {

            // delete loading hide
            const allAdditionalLoader = [...additionalLoader]
            allAdditionalLoader[index] = {spinner: "d-none", submit: " ", deleteSpinner: "d-none", delete: ""}
            setAdditionalLoader(allAdditionalLoader)

            console.log(err)
            ErrorToast("something went wrong !!")
        }
    })
}


// contact delete
export const contactDeleteAction = payload => dispatch => {
    const {data, deleteRef, setSingleContact, setLogStatus} = payload

    // making headers for check authentication
    const headers = AuthCheck()

    // delete btn disalbed
    deleteRef.current.disabled = true

    axios.post(deleteContact, data, {headers}).then(res => {

        // if contact delete success
        if (res.data.status == true) {
            //reload all contact
            dispatch(getAllContactAction())

            // delete btn enable
            deleteRef.current.disabled = false

            // resetting contact detail view
            setSingleContact([])
            dispatch(contactSlice.actions.getSingleContactReducer([]))

            SuccessToast("contact deleted")
        } else {
            // delete btn enable
            deleteRef.current.disabled = false

            ErrorToast("contact not deleted. please try again")
        }

    }).catch(err => {
        try {
            // if un authorize
            err.response.status == 401 && setLogStatus(false)

            // delete btn enable
            deleteRef.current.disabled = false

            console.log(err)
            ErrorToast("something went wrong !!")
        } catch (e) {
            // delete btn enable
            deleteRef.current.disabled = false

            console.log(err)
            ErrorToast("something went wrong !!")
        }
    })


}