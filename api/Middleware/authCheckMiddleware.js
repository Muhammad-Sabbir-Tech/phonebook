// model
const {user} = require("../models/index")

// sequelize property
const {Op} = require("sequelize");
// package
const jwt = require('jsonwebtoken');
require('dotenv').config()

const authCheckMiddleware = async (req, res, next) => {
    try {
        // getting data
        const userId = req.headers.userid.toString()
        const token = req.headers.token

        const userInfo = await user.findOne({where: {id: {[Op.eq]: userId}}})

        // check account activate or not
        if (userInfo.account_status == "1") {

            const key = process.env.KEY
            //decode the token here
            var decoded = jwt.verify(token, key)

            if (decoded.id == userId) {
                next()
            } else {
                const response = {}
                response.status = "401"
                response.message = "un authorize"
                res.status(401).send(response).end()
            }

        } else {
            const response = {}
            response.status = "401"
            response.message = "un authorize"
            res.status(401).send(response).end()
        }

    } catch (e) {
        const response = {}
        response.status = "401"
        response.message = "un authorize"
        res.status(401).send(response).end()
    }
}

module.exports = authCheckMiddleware