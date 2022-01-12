const Router = require("express").Router()

// middleware
const {onLoginMiddleware} = require("../Middleware/onLoginMiddleware")
const contactImageUploadMiddleware = require("../Middleware/contactImageUploadMiddleware")
const authCheckMiddleware = require("../Middleware/authCheckMiddleware")

// controller
const {rootRoute} = require("../Controller/Dashboard")
const {userOnReg, userOnLogin} = require("../Controller/UserController")
const {
    saveContact,
    getAllContact,
    singleFieldUpdate,
    singleContactImageUpdate,
    additionalAdd,
    deleteAdditionalNumber,
    deleteContact
} = require("../Controller/ContactController")


Router.get("/", rootRoute)

// user Route
Router.post("/reg", userOnReg)
Router.post("/login", onLoginMiddleware, userOnLogin)

// contact route
Router.post("/saveContact", authCheckMiddleware, contactImageUploadMiddleware, saveContact)
Router.get("/getAllContact", authCheckMiddleware, getAllContact)
Router.post("/singleFieldUpdate", authCheckMiddleware, singleFieldUpdate)
Router.post("/singleContactImageUpdate", authCheckMiddleware, contactImageUploadMiddleware, singleContactImageUpdate)
Router.post("/additionalAdd", authCheckMiddleware, additionalAdd)
Router.post("/deleteAdditionalNumber", authCheckMiddleware, deleteAdditionalNumber)
Router.post("/deleteContact", authCheckMiddleware, deleteContact)


//export from here
module.exports = Router