import mongoose from 'mongoose';
import moment from "moment";

//Create Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        //unique - 단 하나만 존재해야함
        unique: true,
    },
    password: {
        type: String,
        //require - 필수값
        require: true,
    },
    role: {
        type: String,
        enum: ["Main", "Sub", "User"],
        default:"User",
    },
    register_date: {
        type: Date,
        default: moment().format("YYYY-MM-DD hh:mm:ss"),
    },
    conments: [
        {
            post_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "post",
            },
            comment_id:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"comments",
            }
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
        }
    ]
});

const User = mongoose.model("user", UserSchema);

export default User;