const express = require("express")
const Router = require("./Router/Router")
const bodyParser = require('body-parser')
const cors = require("cors")

const app = express()

// sate static storage
app.use("/images", express.static("./images/"))

app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(Router)

//global error handler
app.use((err, req, res, next) => {
    if (err){
        console.log(err)
        res.status(500).send("error occured").end()
    }else {
        res.send("1")
    }
})

app.listen(5000, (err) => {
    err ? console.log("something went wrong") : console.log("server run successfully")
})