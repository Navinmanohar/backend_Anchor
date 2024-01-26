const express=require("express")
const router=express.Router();
const model =require("../models/Schema")
const bcrypt=require("bcrypt");
const jwt =require('jsonwebtoken')

 const getUser=async(req,res)=>{
    const id=req.params.id;
    // console.log(id);
    try{
        const user=await model.findById({_id:id}).select("-password");
        // console.log(user)
    if(user){
        // const {password,...otherDetail}=user._doc
           res.status(200).json(user);
        
    }
    else{
        res.send(400).json({message:"use not found"})
    }
    }catch(e){
        res.status(400).json({message:"internal error"})
    }
}

 const getAllUser=async(req,res)=>{
    try{
        let users=await model.find().select("-password");
        users=users.map((user)=>{
           return user;
        })
        res.status(200).json(users)
    }catch(e){
        console.log(e);
    }
}
 const updateUSer=async(req,res)=>{
    const id=req.params.id;

    const {_id,currentUseradminStatus,password}=req.body;
   try{
    if(id==_id||currentUseradminStatus)
    {
        if(password)
        {
               const salt=await bcrypt.genSalt(10);
               req.body.password=await bcrypt.hash(password,salt);
               const user=await model.findByIdAndUpdate({_id:id},req.body,{new:true}).select("-password")
              
                // console.log(user)
                const token=jwt.sign({username:user.username,id:user_id},"mern",{expireIn:'1h'})
                res.status(200).json({user,token});
        }else{
            res.status(404).json({message:"user not updated"})
        }
        
    }else{
        res.status(404).json({message:"You can update only own profile"})
    }
   }catch(e){
    res.status(404).json({message:"internal server error"})
   }
}

const deleteUSer=async(req,res)=>{
    const id=req.params.id;

    const {currentUserId,currentUseradminStatus,password}=req.body;

    try{
       if(currentUserId===id||currentUseradminStatus)
       {
         await model.findByIdAndRemove({_id:id})
         res.status(200).json({message:"deleted user succesfully"})
       }
       else{
        res.status(400).json({message:"you can delete own account"})
       }

    }catch(e){
        res.status(404).json({message:"internal server error"})
    }
}

const followUser=async(req,res)=>{
    const id=req.params.id;
    const {_id}=req.body;
    try{
        if(id===_id)
         {
            res.status(403).json({message:"action forbiden"})
         }
         else{
            const followUser=await model.findById(id);
            const followingUser=await model.findById(_id);
            if(!followUser. followers.includes(_id))
            {
               await    followUser.updateOne({$push:{followers:_id}});
               await   followingUser.updateOne({$push:{following:id}})
               res.status(200).json({message:"User followed"})

            }
            else{
                res.status(200).json({message:"USer already follow you"})
            }
             
         }
    }catch(e){
        res.status(404).json({message:"internal server error"})
    }
}


const unFollowUser=async(req,res)=>{
    const id=req.params.id;
    const {_id}=req.body;
    try{
        if(id===_id)
         {
            res.status(403).json({message:"action forbiden"})
         }
         else{
            const followUser=await model.findById(id);
            const followingUser=await model.findById(_id);
            if(followUser. followers.includes(currentUserId))
            {
               await    followUser.updateOne({$pull:{followers:_id}});
               await   followingUser.updateOne({$pull:{following:id}})
               res.status(200).json({message:"User unfollowed"})
               
            }
            else{
                res.status(200).json({message:"USer is not following you"})
            }
             
         }
    }catch(e){
        res.status(404).json({message:"internal server error"})
    }
}
module.exports={getUser,getAllUser,updateUSer,deleteUSer,followUser,unFollowUser};