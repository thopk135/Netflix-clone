import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import { generateTokenandSetCookie } from '../utils/generateToken.js';
export const signup = async (req,res) =>{
    try {
        const {username,password,email} = req.body;
        const emailRegrx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegrx.test(email)){
            return res.status(400).json({error:"Invalid format email"});
        }

        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({error:"Username is already existing"});
        }

        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({error:"Email is already existing"});
        }

        if(username.length < 3 || username.length > 20){
            return res.status(400).json({
                error: "Username must be between 3 and 20 characters long",
            });
        }
        
        if(password.length<6){
            return res.status(400).json({error:"password must be at least 6 characters"});
        }

        const profilepic = ["/avt1.png","/avt2.png","/avt3.png"];
        const image = profilepic[Math.floor(Math.random()*profilepic.length)];
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User ({
            username: username,
            password: hashedPassword,
            email: email,
            image: image,
        })

        if(newUser){
            generateTokenandSetCookie(newUser._id,res);
            await newUser.save();
            res.status(200).json({success:true, 
                user: {
                    ...newUser._doc,
                    password:"",
                }
            });
        }

    } catch (error) {
        res.status(500).json({error:"Internal server"});
    }

}

export const login = async (req,res) =>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!email||!password) return res.status(400).json({success:false,message:"All fields are required"});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password||"");

        if(!user||!isPasswordCorrect){
            return res.status(400).json({message:"Invalid username or password"});
        }
        generateTokenandSetCookie(user._id,res);
        res.status(200).json({
            success:true,
            user:{
                ...user._doc,
                password:""
            }
        });
    } catch (error) {
        return res.status(500).json({message:"Fail to login"});
    }
}

export const logout = async (req,res) =>{
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({success:true,message:"Logout success"});
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server"});
    }
}

export const authCheck = async (req, res) => {
    try {
        res.status(200).json({success:true, user:req.user});
    } catch (error) {
        res.status(500).json({success:false, message:"Internal server"});
    }
}