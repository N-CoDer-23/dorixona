const express = require("express");
const {connect} = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors({
   origin: ['http://localhost:7000'],
   methods: ["GET","POST","PUT","DELETE"],
   credentials: true
}))

async function connectToDB(){
    await connect(process.env.MONGO_URI)
    .then(()=> console.log("MongoDb is connected"))
    .catch(()=> console.log("MongoDB in not connected"))
 }
 connectToDB()

 app.get('/', (req, res)=>{
    res.json("Hi NodeJs!")
 })

 // ----Routers--------
const {users} = require('./routes/user')
const pharm = require('./routes/pharm')

app.use('/users', users);
app.use('/pharm', pharm);


// ------PORT---------
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
   console.log(`Server http://localhost:${PORT} portda ishga tushdi`);
})
