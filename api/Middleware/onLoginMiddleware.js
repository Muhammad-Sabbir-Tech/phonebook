require('dotenv').config()
const {user} = require("../models/index")
const {Op} = require("sequelize");


const onLoginMiddleware = async (req, res, next) => {
    try {
        const {email, password} = req.body

        const response = {}

        //checking user acount status
        const userInfo = await user.findOne({
            where: {
                email: {
                    [Op.eq]: email
                },
                password: {
                    [Op.eq]: password
                }
            }
        })

        //if user found
        if (userInfo != false) {
            //if acount active
            if (userInfo.account_status == "1") {
                // sending the user data to controller
                req.authedUserData = userInfo

                next()
            }
            //if acount not active
            else {
                response.status = "1"
                response.accountStatus = "0"
                response.message = "You are registered but account not activated !"
                res.status(200).send(response).end()
            }
        }//if user found block end
        else {
            response.status = "0"
            response.message = "user not found"
            res.status(200).send(response).end()
        }//if user not found block end

    } catch (e) {
        const response = {}
        response.status = "0"
        response.message = "user not found"
        res.status(200).send(response).end()
    }
}

module.exports = {
    onLoginMiddleware
}