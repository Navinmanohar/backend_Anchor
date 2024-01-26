const express=require("express")
const UserRouter=express.Router();
const {getUser,getAllUser,updateUSer,deleteUSer,followUser,unFollowUser}=require("../controller/userController.js")
const authMiddleware=require("../middleware/authMiddleware.js")



UserRouter.get("/:id",getUser)
UserRouter.get("/",getAllUser)
UserRouter.put("/:id",updateUSer)
UserRouter.delete("/:id",deleteUSer)
UserRouter.put("/:id/follow",followUser)
UserRouter.put("/:id/unfollow",unFollowUser)

module.exports=UserRouter;
