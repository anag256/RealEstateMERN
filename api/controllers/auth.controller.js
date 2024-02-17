import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
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
