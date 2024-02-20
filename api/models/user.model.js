import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://cdn.vectorstock.com/i/preview-1x/20/76/man-avatar-profile-vector-21372076.jpg"

    }

},{timestamps:true}); //mongoddb will also record timeof creation and timeof updte of the user


const User=mongoose.model('User',userSchema)
export default User;