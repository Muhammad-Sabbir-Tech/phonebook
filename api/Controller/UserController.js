const {user} = require("../models/index")
var jwt = require('jsonwebtoken');
require('dotenv').config()
const {Op} = require("sequelize");


// user registration
const userOnReg = async (req, res, next) => {
    try {
        //getting value from body
        const {
            fullName,
            address,
            postalCode,
            phone,
            email,
            password
        } = req.body

        //insert user data here
        const saveUser = await user.create({
            full_name: fullName,
            address: address,
            postal_code: postalCode,
            phone: phone,
            email: email,
            password: password
        })

        const response = {}

        // if user created
        if (saveUser) {
            response.status = "1"
            response.message = "user registered successfully ! please login."
            res.status(200).send(response).end()
        } else {
            response.status = "0"
            response.message = "registration failed"
            res.status(200).send(response).end()
        }

    } catch (e) {
        try {
            if (e.errors[0].type == "unique violation") {
                const response = {}
                response.status = "11"
                response.message = "duplicate"
                response.detail = "you input a duplicate email"
                res.status(200).send(response).end
            } else {
                res.status(404).send(e).end()
            }
        } catch (e) {
            res.status(404).send(e).end()
        }
    }
}

//user login
const userOnLogin = async (req, res) => {
    try {
        // getting authed user data from on login middleware
        const userInfo = req.authedUserData

        const response = {}

        // processing generate token
        const key = process.env.KEY
        var token = jwt.sign({
            id: userInfo.id,
            full_name: userInfo.full_name,
            accountStatus: userInfo.account_status
        }, key, {expiresIn: '8h'});

        var decoded = jwt.verify(token, key)

        response.status = "1"
        response.accountStatus = userInfo.account_status
        response.message = "log in successful"
        response.token = token
        response.decode = decoded
        res.status(200).send(response)

    } catch (e) {
        const response = {}
        response.status = "0"
        response.message = "user not found"
        res.status(404).send(response)
    }
}


module.exports = {
    userOnReg,
    userOnLogin,
}