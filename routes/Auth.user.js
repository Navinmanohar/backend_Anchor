const express=require("express");
const routes=express.Router();
const {registerUser,loginUser,verifyEmail}=require('../controller/AuthController')


routes.post('/register',registerUser) 
routes.post('/login',loginUser)
routes.post("/verify-email",verifyEmail)
module.exports=routes;  