const mongoose=require("mongoose");

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        // require:true
    },
    
    password:{
        type:String,
        // require:true
        },

    firstname:{
        type:String,
        // require:true
},
    lastname: {
            type:String,
            // require:true
      },
      isAdmin:{
          type:Boolean,
          default:false
      },
      profilePicture:String,
      coverPicture: String,
      about:String,
      lovesIn:String,
      worksAt:String,
      relationship:String,
      country:String,
      followers:[],
      following:[],
      varified:{
        type:Boolean,
        default:false
    },
  
},

    {timestamps:true}

)
module.exports=mongoose.model("Users",UserSchema);
