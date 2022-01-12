const nodemailer = require("nodemailer")
const fs = require("fs")

const rootRoute = (req, res) => {
    try {
        res.status(200).send("hello phoneBook").end()
    } catch (e) {
        res.send("err")
    }
}

module.exports = {
    rootRoute
}