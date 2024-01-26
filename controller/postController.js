const mongoose=require("mongoose")
const postModel=require("../models/PostSchema");
const model=require("../models/Schema")

const createPost=async(req,res)=>{
    const newPost=new postModel(req.body);
    try{

       await newPost.save(); 
       res.status(200).json(newPost)
    }catch(e){
        res.status(404).json({message:"internal server error"+e})
    }
}

const getPost=async(req,res)=>{
    const id=req.params.id;
    try{
        const post=await postModel.findById({_id:id})
        res.status(200).json(post)
    }catch(error)
    {
        res.status(500).json(error)
    }
}

const updatepost=async(req,res)=>{
    const postId=req.params.id;
    const {userId}=req.body
    try{
        const post=await postModel.findById(postId);
        if(post.id===userId)
        {
            await post.updateOne({$set:req.body})
            res.status(200).json({message:"post updated"});
        }
        else{
            res.status(500).json({message:"action forbidden"})
        }
    }catch(e)
    {
        res.status(500).json(error)
    }
}

const deletePost=async(req,res)=>{
    const id=req.params.id;
    const {userId}=req.body;

    try{
          const post=await postModel.findById({_id:id})
          if(post.userId===userId)
          {
            await post.deleteOne();
            res.status(200).json({message:"post deleted"})
          }
          else{
            res.status(403).json({message:"action forbidden"})
          }

    }catch(e)
    {
        res.status(500).json(error)
    }

}

const likePost=async(req,res)=>{
    const id=req.params.id;
    const {userId}=req.body;

    try{
          const post=await postModel.findById({_id:id})
          if(!post.likes.includes(userId))
          {
            await post.updateOne({$push :{likes:userId }});
            res.status(200).json({message:"Post likes"})
          }
          else{
            await post.updateOne({$pull :{likes:userId }});
            res.status(200).json({message:"Post DisLikes"})
          }

    }catch(e)
    {
        res.status(500).json(error)
    }

}

//time line post

const getTimeLinePost=async(req,res)=>{
    const userId=req.params.id;
    try{
        const currentUSerPosts=await postModel.find({userId:userId})
        const followingPosts=await model.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(userId),
                },
                
           },
          {
                    $lookup:{
                        from:"posts",
                        localField:"following",
                        foreignField:"userId",
                        as:"followingPosts",
                    },
          },
          {
                    $project:{
                        followingPosts:1,
                        _id:0
                 
                       }
           }
                
            
        ])
        const allPosts = currentUSerPosts.concat(...followingPosts[0]?.followingPosts);

const sortedPosts = allPosts.sort((a, b) => {
  return new Date(b.createdAt) - new Date(a.createdAt);
});

res.status(200).json(sortedPosts);

    }catch(e)
    {
    console.log(e)
    }
}


module.exports={createPost,getPost,updatepost,deletePost,likePost,getTimeLinePost}