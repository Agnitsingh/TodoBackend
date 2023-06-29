import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

// export const getAllUsers  = async (req,res)=>{};


export const login = async (req,res,next) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email}).select("+password");
    
        if (!user) return (new ErrorHandler("Invalid Email or Password", 400));
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) return (new ErrorHandler("Invalid Email or Password", 400));
    
    
        // if (!isMatch)
        // return res.status(404).json({
        //     success: false,
        //     message: "Invalid Email or Password",
        // });
    
        sendCookie(user,res, `Welcome Back, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
};


export const register = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        let user = await User.findOne({email});
    
        
        if (user) return (new ErrorHandler("User already exist!!!", 400));
    
        const hashedPassword = await bcrypt.hash(password,10)
        user = await User.create({name,email, password: hashedPassword});
            
        sendCookie(user,res, "Finally Registered Successfully", 201);
    } catch (error) {
        next(error);
    }
};


export const getMyProfile = (req,res) => {
        res.status(200).json({
            success: true,
            user: req.user,
        })
    };

export const logout = (req,res) => {
    res.status(200).cookie("token","",{expires: new Date(Date.now ()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
        success: true,
        user: req.user,
    })
};









// export const getAllUsers  = async (req,res)=>{
//     const users = await User.find({});
//     res.json({
//         success: true,
//         users,
//     });
// };



// export const register = async (req,res)=>{
//     const {name,email,password} = req.body;
//     await User.create({
//        name,
//        email,
//        password, 
//     });
//     res.json({
//         success: true,
//         message: "Registered Successfully!!!"
//     });
// };



// export const specialFunc = (req,res) => {
//     res.json({
//         success: true,
//         message:"Just Joking",
//     })
// };

// export const getUserDetails = async(req,res) => {
//     const {id} = req.params; // Dynamic URL
//     const user = await User.findById(id);

//     console.log(req.params);
//     res.json({
//         success: true,
//         user,
//     });
// }

// export const updateUserDetails = async(req,res) => {
//     const {id} = req.params; // Dynamic URL
//     const user = await User.findById(id);

//     console.log(req.params);
//     res.json({
//         success: true,
//         message: "Updated",
//     });
// }

// export const deleteUserDetails = async(req,res) => {
//     const {id} = req.params; // Dynamic URL
//     const user = await User.findById(id);

//     // await user.remove();

//     res.json({
//         success: true,
//         message: "Deleted",
//     });
// }