const express=require("express")
const app=express();
const mongoose=require("mongoose")
const dotenv=require('dotenv')
const bodyParser=require('body-parser')
const routes=require('./routes/Auth.user')
const cors =require("cors");
const UploadRouter=require("./routes/UploadRoutes")

const UserRouter=require("./routes/UserRoute")
const PostRouter=require("./routes/PostRoutes")
const ChatRoute = require('./routes/ChatRoute.js')
const MessageRoute = require('./routes/MessageRoute.js')

//use image in front side
app.use(express.static('public'))
app.use('/images',express.static("images"))

app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true},))
app.use(cors())
dotenv.config();
  
const Port=process.env.PORT;
const db=process.env.MONGO_URL

mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


app.get("/",(req,res)=>{
    
    res.send("hii")
    
}
)
app.use('/auth',routes)
app.use("/user",UserRouter)
app.use("/post",PostRouter)
app.use("/upload",UploadRouter)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)


// console.log(typeof routes)

app.listen(port,()=>{
    console.log(`listening at ${Port}` )
})