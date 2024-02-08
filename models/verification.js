const mongoose=require("mongoose");
const bcrypt=require("bcrypt")

const VerificationSchema=mongoose.Schema({
    username:{
    //    type:mongoose.Schema.Types.ObjectId,
       type:String,
    //    ref:"Users",
       required:true
    },
    otp:
    {
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        expires:3600,
        default:Date.now()
    }
   

  
},{timestamps:true}

)

VerificationSchema.pre('save', async function (next) {
  if (this.isModified('otp')) {
    const hashedToken = await bcrypt.hash(this.otp, 8);
    this.otp = hashedToken;
  }
  next();
});

// VerificationSchema.methods.compareToken=async ()=>{
// const result=await bcrypt.compareSync(token,this.token)
// return result;
// }
module.exports=mongoose.model("Verification",VerificationSchema);
