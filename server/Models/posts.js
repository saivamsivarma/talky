import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title:String,
    postBody:String,
    postFile:String,
    likes: { 
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    createAt:{
        type:Date,
        default:new Date()
    },
    creator:String
});

const Post = mongoose.model("Post",postSchema);

export default Post;