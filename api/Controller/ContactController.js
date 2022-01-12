require('dotenv').config()
const fs = require("fs")
const {Op} = require("sequelize");
//model
const {contact_number, additional_number} = require("../models/index")


//save new contact
const saveContact = async (req, res) => {
    try {
        // getting userId
        const userId = req.headers.userid.toString()

        // get data from body
        const {
            name,
            identity,
            phn,
            address,
            email,
            additional = []
        } = req.body
        let imageUrl = "0"
        if (req.file) {
            // make image url
            imageUrl = process.env.IMAGE_URL + req.file.filename
        }

        //data insert
        const contact = await contact_number.create({
            image_link: imageUrl,
            name: name,
            identity: identity,
            cell_number: phn,
            address: address,
            email: email,
            user_id: userId
        })

        const response = {}

        // if contact saved
        if (contact != false) {
            response.status = true
            response.mimeType = true
            response.message = "contact saved"


            // if additional number not null
            if (additional.length != 0) {

                // additional number parameter example. eg : additional_number: number
                // it is making the additional array  from - additional[{additional_number:"017000"}]
                // to - additional[{additional_number:"017000", contact_id:"id", user_id:"id"}]

                // making the string additional to a json format for insert.
                const additionalArray = JSON.parse(additional)

                additionalArray.map((data, i) => {
                    additionalArray[i].contact_id = contact.id
                    additionalArray[i].user_id = userId
                })

                // insert additional number
                await additional_number.bulkCreate(additionalArray)
            }

            res.status(200).send(response).end()
        } else {
            //if data not save, file delete from storage
            req.file && fs.rmSync(process.env.IMAGE_LOCATION + req.file.filename)

            response.status = false
            response.mimeType = true
            response.message = "contact not saved"
            res.status(200).send(response)
        }

    } catch (e) {
        //if data not save file delete from storage
        req.file && fs.rmSync("images/" + req.file.filename)

        res.send(e).end()
    }
}

// get all Contact
const getAllContact = async (req, res) => {
    try {
        // making relation
        contact_number.hasMany(additional_number, {foreignKey: "contact_id", sourceKey: "id"})
        additional_number.belongsTo(contact_number, {foreignKey: "contact_id", targetKey: "id"})

        const userId = req.headers.userid

        const result = await contact_number.findAll({
            order: [
                ['name', 'ASC']
            ],
            where: {
                user_id: {
                    [Op.eq]: userId
                }
            },
            include: [{model: additional_number}]
        })

        const response = {}
        response.status = true
        response.message = "success"
        response.data = result

        res.status(200).send(response)

    } catch (e) {
        const response = {}
        response.status = false
        response.message = "failed"

        res.send(response)
    }
}

// contact single field update
const singleFieldUpdate = async (req, res) => {
    try {
        const userId = req.headers.userid
        const {name = "", identity = " ", number = "", address = " ", email = " ", id = "", addition_number = " ", additional_id = ""} = req.body

        const response = {}
        response.status = true

        // name updating
        if (name.length != 0 && id.length != 0) {
            const nameUpdate = await contact_number.update({name: name}, {
                where: {
                    id: {[Op.eq]: id},
                    user_id: {[Op.eq]: userId}
                }
            })

            // if update success
            if (nameUpdate != false) {
                response.message = "name updated successfully"
                res.status(200).send(response)
            } else {
                response.status = false
                response.message = "name update failed"
                res.send(response)
            }

        }
        // identity updating
        else if (identity != " " && id.length != 0) {
            const identityUpdate = await contact_number.update({identity: identity}, {
                where: {
                    id: {[Op.eq]: id},
                    user_id: {[Op.eq]: userId}
                }
            })

            // if update success
            if (identityUpdate != false) {
                response.message = "identity updated successfully"
                res.status(200).send(response)
            } else {
                response.status = false
                response.message = "identity update failed"
                res.send(response)
            }
        }
        // number updating
        else if (number.length != 0 && id.length != 0) {
            const numberUpdate = await contact_number.update({cell_number: number}, {
                where: {
                    id: {[Op.eq]: id},
                    user_id: {[Op.eq]: userId}
                }
            })

            // if update success
            if (numberUpdate != false) {
                response.message = "number updated successfully"
                res.status(200).send(response)
            } else {
                response.status = false
                response.message = "number update failed"
                res.send(response)
            }
        }
        // address updating
        else if (address != " " && id.length != 0) {
            const addressUpdate = await contact_number.update({address: address}, {
                where: {
                    id: {[Op.eq]: id},
                    user_id: {[Op.eq]: userId}
                }
            })

            // if update success
            if (addressUpdate != false) {
                response.message = "address updated successfully"
                res.status(200).send(response)
            } else {
                response.status = false
                response.message = "address update failed"
                res.send(response)
            }
        }
        // email updating
        else if (email != " " && id.length != 0) {
            const emailUpdate = await contact_number.update({email: email}, {
                where: {
                    id: {[Op.eq]: id},
                    user_id: {[Op.eq]: userId}
                }
            })

            // if update success
            if (emailUpdate != false) {
                response.message = "email updated successfully"
                res.status(200).send(response)
            } else {
                response.status = false
                response.message = "email update failed"
                res.send(response)
            }
        }
        // additional number update
        else if (addition_number != " " && id.length != 0 && additional_id.length != 0) {
            const additionalUpdate = await additional_number.update({
                additional_number: addition_number
            }, {
                where: {
                    id: {[Op.eq]: additional_id},
                    contact_id: {[Op.eq]: id},
                    user_id: {[Op.eq]: userId}
                }
            })

            // if update success
            if (additionalUpdate != false) {
                response.message = "additional number updated successfully"
                res.status(200).send(response)
            } else {
                response.status = false
                response.message = "additional number update failed"
                res.send(response)
            }
        } else {
            response.status = false
            response.message = "please send a valid field"

            res.send(response)
        }


    } catch (e) {
        const response = {}
        response.status = false
        response.message = "failed"

        res.send(response)
    }
}


//single contact image update
const singleContactImageUpdate = async (req, res) => {
    try {

        // receiving parameter
        const userId = req.headers.userid
        const {id} = req.body

        // response
        const response = {}

        // creating new image link
        const newImageLink = req.file ? process.env.IMAGE_URL + req.file.filename : "0"

        // getting exist image data
        const existImageLink = await contact_number.findOne({
            where: {
                id: {[Op.eq]: id},
                user_id: {[Op.eq]: userId}
            }
        })

        // exist image location getting varriable
        let existImageName = ""

        // if exist image found
        if (existImageLink.image_link.length > 10) {
            // making exist image location for delete
            existImageName = process.env.IMAGE_LOCATION + existImageLink.image_link.split("/").pop()
        }// exist image found block end

        // update image link by new link
        const updateImageLink = await contact_number.update({image_link: newImageLink}, {
            where: {
                id: {[Op.eq]: id},
                user_id: {[Op.eq]: userId}
            }
        })

        // if image link updated
        if (updateImageLink != false) {
            // delete the old image from disk
            existImageLink.image_link.length > 10 && fs.rmSync(existImageName)
            response.status = true
            response.message = "image updated successfully"
            res.send(response)
        }
        // if imgage link not updated
        else {
            // delete the new stored image from disk
            req.file && fs.rmSync(process.env.IMAGE_LOCATION + req.file.filename)
            response.status = false
            response.message = "image update failed"
            res.send(response)
        }

    } catch (e) {
        const response = {}
        // delete the new image from disk
        req.file && fs.rmSync(process.env.IMAGE_LOCATION + req.file.filename)
        response.status = false
        response.message = "image update failed"
        res.send(response)

    }
}

// add additional number
const additionalAdd = async (req, res) => {
    try {
        //getting paremeter
        const {numbers} = req.body

        const response = {}

        // save all additional number
        const additionalNumber = await additional_number.bulkCreate(numbers)

        // if saved success
        if (additionalNumber.length != 0) {
            response.status = true
            response.message = "additional number add successfully"
            response.additionalNumbers = additionalNumber
            res.json(response)
        } else {
            response.status = false
            response.message = "additional save failed"
            res.send(response)
        }

    } catch (e) {
        const response = {}
        response.status = false
        response.message = "additional save failed"
        res.send(response)
    }
}

// delete additional number
const deleteAdditionalNumber = async (req, res) => {
    try {
        // receiving parameter
        const userId = req.headers.userid
        const {contact_id, id} = req.body

        const response = {}

        // delete additional number from db
        const deleteAdditional = await additional_number.destroy({
            where: {
                id: {[Op.eq]: id},
                contact_id: {[Op.eq]: contact_id},
                user_id: {[Op.eq]: userId}
            }
        })

        // if delete success
        if (deleteAdditional != false) {
            response.status = true
            response.message = "delete success"
            res.send(response)
        } else {
            response.status = false
            response.message = "delete failed"
            res.send(response)
        }


    } catch (e) {
        const response = {}
        response.status = false
        response.message = "delete failed"
        res.send(response)
    }
}

// delete contact
const deleteContact = async (req, res) => {
    try {
        // receiving parameter
        const userId = req.headers.userid
        const {contactId} = req.body

        const response = {}

        // getting contact info for check image
        const contactInfo = await contact_number.findOne({
            where: {
                id: {[Op.eq]: contactId},
                user_id: {[Op.eq]: userId}
            }
        })

        // getting this contact info for delete image
        if (contactInfo != false) {
            // image delete process
            const imageName = contactInfo.image_link.split("/").pop()
            const imageLocation = process.env.IMAGE_LOCATION + imageName
            imageName.length > 10 && fs.rmSync(imageLocation)

            //delete contact
            const deleteCotnact = await contact_number.destroy({
                where: {
                    id: {[Op.eq]: contactId},
                    user_id: {[Op.eq]: userId}
                }
            })
            // if delete success
            if (deleteCotnact != false) {
                // delete contact id
                const deleteAdditional = await additional_number.destroy({
                    where: {
                        contact_id: {[Op.eq]: contactId},
                        user_id: {[Op.eq]: userId}
                    }
                })

                response.status = true
                response.message = "contact deleteed"
                res.send(response)
            }
            // if delete failed
            else {
                response.status = false
                response.message = "contact delete failed"
                res.send(response)
            }
        }// getting this contact info for delete image block end
        else {
            response.status = false
            response.message = "contact delete failed"
            res.send(response)
        }


    } catch (e) {
        const response = {}
        response.status = false
        response.message = "contact delete failed"
        res.send(response)
    }
}


module.exports = {
    saveContact,
    getAllContact,
    singleFieldUpdate,
    singleContactImageUpdate,
    additionalAdd,
    deleteAdditionalNumber,
    deleteContact
}
