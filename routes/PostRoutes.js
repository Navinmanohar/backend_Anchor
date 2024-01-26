const express =require("express");
const PostRouter=express.Router();
const {createPost,getPost,updatepost,deletePost,likePost,getTimeLinePost}=require("../controller/postController")



PostRouter.post("/",createPost)
PostRouter.get("/:id",getPost)
PostRouter.put("/:id",updatepost)
PostRouter.delete("/:id",deletePost)
PostRouter.put("/:id/like",likePost)
PostRouter.get("/:id/timeline",getTimeLinePost)

module.exports=PostRouter; 