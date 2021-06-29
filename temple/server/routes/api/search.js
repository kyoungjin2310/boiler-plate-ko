import express from "express";
const router = express.Router();

import Post from "../../models/post";

router.get("/:searchTerm", async (req, res, next) => {
  try {
    //search에서는 다찾는 것이므로 find를 씀
    const result = await Post.find({
      //제목을 기준으로 검색
      title: {
        $regex: req.params.searchTerm,
        //대문자인지, 소문자인지 상관없이 덜 정확하게 검색
        $options: "i",
      },
    });
    console.log(result, "Search result");
    res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;
