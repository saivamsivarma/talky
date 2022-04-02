import User from "../Models/user.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET

export const signUp = async (req,res) => {
    const {FirstName, LastName, Gender, Bio, DateOfBirth, Email,password} = req.body;
    try {
        const createEmail  = await User.findOne({Email:Email})

        if(createEmail) return res.status(400).json({message:"An old profile exist with the this Id"})

        if (password.length < 8) return res.status(400).json({ message: "The password needs to be at least 8 characters long." });

        const hashedPassword = await bcrypt.hash(password, 16);

        const result = await User.create({FirstName, LastName, Gender, Bio, DateOfBirth, Email,password:hashedPassword})
        const token = jwt.sign({ email: result.email, id: result._id }, secret,{ expiresIn: "1h" });
        res.status(200).json({result,token});
    } catch(err){
        res.status(500).json({ message: err.message });
        console.log(err)
    }
}

export const signIn = async (req, res) => {
    const { Email, password } = req.body;

    try {
        const checkUser = await User.findOne({ Email });

        if (!checkUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, checkUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const data = await User.findById(checkUser._id);

        const token = jwt.sign({ Email: checkUser.Email, id: checkUser._id }, secret, { expiresIn: "1h" });


        res.status(200).json({ result: data,token});
    } catch (err) {
        res.status(500).json({ message: "Something went worng" });
    }
};

export const getProfile = async (req,res)=>{
    try {
        const user = await User.findById({_id:req.params.id});
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err)
    }
}


export const updateProfile = async(req,res) => {
    const {id} = req.params.id;
    const { FirstName, LastName, Gender, Bio, DateOfBirth, Email,password} = req.body

    const updateProfile = {FirstName, LastName, Gender, Bio, DateOfBirth, Email,password, _id:id};
    
    await User.findByIdAndUpdate(id, updateProfile ,{new:true});

    res.status(201).json(updateProfile);
}

export const updateImage = async(req,res)=>{
    const id = req.params.id;
    const profilePicture = req.file.path;
    try{
        if(!{_id:id}) return res.status(404).json({message:"Id not Founded"})
        
        const updateImage = {profilePicture, _id:id};
        console.log(updateImage);

        const result = await User.findByIdAndUpdate(id, updateImage ,{new:true});
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
        console.log(err)
    }
}

export const searchUsers = async(req,res)=>{
    var query = req.params.query;
    try {
        const searchUser = await User.find({
            $text: {
                $search: query
            }
        });
        res.status(200).json(searchUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err)
    }
}
