import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }

},{timestamps:true}); //mongoddb will also record timeof creation and timeof updte of the user


const User=mongoose.model('User',userSchema)
export default User;