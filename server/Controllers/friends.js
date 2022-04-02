import Friends from "../Models/friends.js";
import User from "../Models/user.js";

export const sendRequest = async (req,res)=>{
    const {requester,recipient,status} = req.body;
    try{
        const checkRecipient = User.findById(recipient);
        if(!checkRecipient) return res.status(404).json({message:"User not found to send request"});

        const result = await Friends.create({requester,recipient,status});
        res.status(200).json({result});
    }catch(err){
        res.status(409).json({message:err.message});
    }
};