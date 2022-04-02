import Post from "../Models/posts.js";

export const getPost = async(req,res)=>{
    try{
        const posts = await Post.find();
        console.log(posts);
        res.status(201).json(posts);
    }catch(err){
        res.status(404).json({message:err.message});
    }
}

export const createPost = async(req,res)=>{
    const post = req.body;
    const newPost = new Post(post);
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }catch(err){
        res.status(409).json({message:err.message});
    }
}