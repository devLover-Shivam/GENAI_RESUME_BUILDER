const userModel = require("../models/user.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/** 
 * @name registerUserController
 * @description Register a new user
 * @access Public
*/
async function registerUserController(req,res){
    //destructure and get the username,email,password
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    //check whether the user is already existing or not

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{username},{email}]
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User Already Exists With This EMAIL or USERNAME"
        })
    }

    //now all the checks for a existing user is complete now we'll be registering a new user and bfore registering it we need to hash the password of the user first.

    const hash = await bcrypt.hash(password, 10);
    //now register a user and create user data with hashed password
    const user = await userModel.create({
        username,
        email,
        password:hash
    })
    //now create a token for the user for token based login system
    const token = jwt.sign(
        {id:user._id, username: user.username},
        process.env.JWT_SECRET_KEY,
        {expiresIn:"2d"}
    )
    //now set this token in the cookies
    res.cookie("token",token);

    res.status(201).json({
        message:"Hurray!!, User Registered Successfully!",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
        }
    })

}
/** 
 * @name loginUserController
 * @description login a existing user
 * @access Public
*/
async function loginUserController(req,res){
    const {email,password}=  req.body
    const user = await userModel.findOne({email})
    //check whether user even exists or not
    if(!user){
        return res.status(400).json({
            message:"Invalid Email or Password"
        })
    }
    //check entered password is valid or not
    const isPasswordValid = bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid Email or Password"
        })
    }

    //now create and set the token to cookie

     const token = jwt.sign(
        {id:user._id, username: user.username},
        process.env.JWT_SECRET_KEY,
        {expiresIn:"2d"}
    )
    
    res.cookie("token",token);

    res.status(201).json({
        message:"User Logged In Successfully!",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
        }
    })

}

module.exports = {registerUserController,
    loginUserController
};