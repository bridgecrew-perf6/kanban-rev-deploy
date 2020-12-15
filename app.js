if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const router = require("./routes/index")
const errorHandler = require("./middlewares/errorHandler")
const cors = require('cors')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.get("/", (req,res) => res.status(200).json({msg:"success"}))
app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`start in port: ${PORT}`);
})