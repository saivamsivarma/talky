import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    Gender: String,
    Bio: String,
    profilePicture: {type:String,default:""},
    DateOfBirth: Date,
    Email: String,
    password: String,
    friends: [{ type: mongoose.Schema.ObjectId, ref: 'Friends' ,default:[]}]
});

userSchema.index({'$**':'text'});
const User = mongoose.model('User',userSchema);

export default User;