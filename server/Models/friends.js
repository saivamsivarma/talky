import mongoose from 'mongoose';

const friendsSchema = mongoose.Schema({
    requester: { type: mongoose.Schema.ObjectId, ref: 'User' },
    recipient: { type: mongoose.Schema.ObjectId, ref: 'User' },
    status: {
        type: Number, enums:
            [   0, //'requested',
                1,//'pending', 
                2,//'accepted,
                3//'cancel',
            ]
    }
})

const Friends = mongoose.model("Friends",friendsSchema);
export default Friends;