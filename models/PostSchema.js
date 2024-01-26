const mongoose=require("mongoose")
const postModel=mongoose.Schema({

    userId:{
        type:String,required:true
    },
    desc:String,
    likes:[],
    image:String,
},
{
    timestamps:true
})

module.exports=mongoose.model("Posts",postModel)