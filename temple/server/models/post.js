import mongoose from "mongoose";
import moment from "moment";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    //검색 결과 쉽게 하기 위해서
    index: true,
  },
  contents: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    //처음 작성한 자기 자신 조회수를 뺀것
    default: -2,
  },
  fileUrl: {
    type: String,
    //이미지 빈화면
    default: "https://source.unsplash.com/random/301x201",
  },
  //카테고리 여러개 하려면 밑에 객체를 배열로 바꿈 - 해시태그처럼 변경됨
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  date: {
    type: String,
    default: moment().format("YYYY-MM-DD hh:mm:ss"),
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  //작성자
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    //user js를 참조해야되기 때문에 user를 적음
    ref: "user",
  },
});

const Post = mongoose.model("post", PostSchema);

export default Post;
