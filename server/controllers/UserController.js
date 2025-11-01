import User from "../models/UserModel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'})
    return token ;
}

// controller for user registration
//POST: /api/users/register
export const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body ;

        // check if all required fields are present
        if(!name || !email || !password){
            return res.status(400).json({
                message: "missing required field"
            })
        }
        // check if user already exist
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message : "User already exist"
            })
        }

        // create new user
        const handlePassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name , email, password: hashedPassowrd
        })

        // retunr success message
        const token = generateToken(newUser._id);
        newUser.password = undefined;

        return res.status(201).json({
            message: "User created successfully",
            token,
            user: newUser
        })
    } catch (error) {
        return res.status(400).json({
            message: "error.message"
        })
    }
}

// constroller for user login
// POST: '/api/user/login

export const loginUser = async(req, res) => {
    try {
        const {email , password} = req.body ;

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "Invalid email or password"})
        }

        if(!user.comparePassword(password)){
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const token = generateToken(user._id)
        user.password = undefined;

        return res.status(200).json({
            message: "Login successfully",
            token, user
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

// controller for getting user by id
// GET: /api/users/data

export const getUserById = async(req, res) => {
    try {
        

        const userId = req.userId;

        // cehck if user exist
        const user = await User.findById(userId)
        if(!user){
            res.status(404).json({
                message: "User not found"
            })
        }

        // return user
        user.password = undefined;

        return res.status(200).json({
            user
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}