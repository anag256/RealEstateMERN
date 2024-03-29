import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res,next) => {
  const { username, password, email } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10); // salt no-no of rounds for creating salt which is going to be combined with powd
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully.");
  } catch (error) {
   next(error);
  }
};

export const signin= async (req,res,next)=>{
  const {email,password}=req.body;
  try{
    const validUser=await User.findOne({email})
    if(!validUser) return next(errorHandler(404,"User not found"))
    const validPassword=bcryptjs.compareSync(password,validUser.password);
    if(!validPassword) return next(errorHandler(401,'Wrong credentials'));
    const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
    const validuserObj=validUser.toObject()
    delete validuserObj.password;
    res.cookie('access_token',token,{httpOnly:true,
      // expires:new Date(Date.now()+24*60*60*1000)
    }).status(200).json(validuserObj);
  }
  catch(e){
    next(e)
  }
}
export const google=async (req,res,next)=>{

  try{
    const user= await User.findOne({email:req.body.email})
    if(user){
      const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
      const validuserObj=user.toObject()
      delete validuserObj.password;
      res.cookie('access_token',token,{httpOnly:true,
        // expires:new Date(Date.now()+24*60*60*1000)
      }).status(200).json(validuserObj);
    }
    else{
      //since no pwd from google but in model pwd is mandatory hence create random pwd
      const generatedPwd=Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8);
      const hashedPwd=bcryptjs.hashSync(generatedPwd,10);
      const newUser=new User({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),email:req.body.email,password:hashedPwd,avatar:req.body.photo})
     console.log(newUser)
      await newUser.save();
     const validuserObj=newUser.toObject()
     delete validuserObj.password;
     res.cookie('access_token',token,{httpOnly:true,
      // expires:new Date(Date.now()+24*60*60*1000)
    }).status(200).json(validuserObj);
    }
    }
    catch(e){
      next(e);
    }
  }

