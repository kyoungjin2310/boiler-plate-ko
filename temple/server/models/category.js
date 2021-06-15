import mongoose from "mongoose";

//Create Schema
const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    // 카테고리 값이 없을 경우
    default: "미분류",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      //ref - 참조, 카테고리는 데이터 등록한거 보고 참조
      ref: "post",
    },
  ],
});

//정의한 스키마를 이용해 모델을 정의하려면 mongoose.model('ModelName', Schema)을 이용
//변수를 이용해서 모델에 접근
//데이터 참조를 할때 'ModelName'를 사용 - import mongoose from 'mongoose'; 연결
const Category = mongoose.model("category", CategorySchema);

export default Category;
