import axios from "axios";
import {login, reg} from "../../AllRoute/ApiRoute";
import {ErrorToast, SuccessToast} from "../../Utility/Toast";


//account on reg
export const regAction = payload => dispatch => {
    const {data, regBtnRef, regFormRef, reset, setLoader} = payload

    // registration btn disabled
    regBtnRef.current.disabled = true

    // loading animation show
    setLoader("")

    axios.post(reg, data).then(res => {
        try {
            //registered success
            if (res.data.status == 1) {

                // registration btn enabled
                regBtnRef.current.disabled = false

                // loading animation hide
                setLoader("d-none")

                SuccessToast("Account registered. Please login")

                // REG form reset
                regFormRef.current.reset()
                reset()
            }
            //duplicate email
            else if (res.data.status == 11) {
                // registration btn enabled
                regBtnRef.current.disabled = false

                // loading animation hide
                setLoader("d-none")

                ErrorToast("This email has already an account !")
            }
            // failed to create account
            else if (res.data.status == 0) {
                // registration btn enabled
                regBtnRef.current.disabled = false

                // loading animation hide
                setLoader("d-none")

                ErrorToast("Something went wrong ! please try again !!")
            } else {
                // registration btn enabled
                regBtnRef.current.disabled = false

                // loading animation hide
                setLoader("d-none")

                ErrorToast("something went wrong !!!")
            }
        } catch (e) {
            // registration btn enabled
            regBtnRef.current.disabled = false

            // loading animation hide
            setLoader("d-none")

            ErrorToast("something went wrong !!!")
        }
    }).catch(err => {
        // registration btn enabled
        regBtnRef.current.disabled = false

        // loading animation hide
        setLoader("d-none")

        console.log(err)
        ErrorToast("something went wrong !!!")
    })
}

//account login
export const loginAction = payload => dispatch => {
    const {data, setLoader,setLogStatus, reset, loginFormRef} = payload

    // loading animation view
    setLoader("d-inline-block")

    axios.post(login, data).then(res => {
        // account found and activated
        if (res.data.status == 1 && res.data.accountStatus == 1) {
            // loading animation hide
            setLoader("d-none")

            // setting localstorage for login authentication
            localStorage.setItem("verify", res.data.token)
            localStorage.setItem("logData", JSON.stringify(res.data.decode))

            // set login status true for redirect from login page
            setLogStatus(true)

            // form Reset
            loginFormRef.current.reset()
            reset()

        }
        // account not found
        else if (res.data.status == 0) {
            // loading animation hide
            setLoader("d-none")

            ErrorToast("User Not Found")
        }
        // account found but not activated
        else if (res.data.status == 1 && res.data.accountStatus == 0) {
            // loading animation hide
            setLoader("d-none")

            ErrorToast("Account is not activated ! please contact with authority.")
        }
        // something else
        else {
            // loading animation hide
            setLoader("d-none")

            ErrorToast("Something went wrong!!")
        }

    }).catch(err => {
        // loading animation hide
        setLoader("d-none")
        console.log(err)

        ErrorToast("Something went wrong !!")
    })
}