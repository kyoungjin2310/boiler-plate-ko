import mongoose, { mongo } from "mongoose";
import moment from "moment";

//Create Schema
const CommentSchema = new mongoose.Schema({
    contents: {
        type: String,
        //required - 내용이 있어야 올릴수 있음
        required: true,
    },
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm:ss"),
    },
    post: {
        //몽구스안의 데이터 참조를 하겠다는 의미, ref: 'ModelName'
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    creatorName: {
        type: String
    },
});

const Comment = mongoose.model("comment", CommentSchema);

export default Comment;