import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  email: {type:String,required: true,unique:true,lowercase: true, 
    trim: true },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date }

  
});

export default mongoose.model("User", userSchema);
