import express from "express";
require("@babel/polyfill");

//model
import Post from "../../models/post";
import auth from "../../middleware/auth";

const router = express.Router();

//파일을 주고 받을 수 있도록 도와주는 multer-s3
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import { async } from "regenerator-runtime";
dotenv.config();

//s3 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

//업로드
const uploadS3 = multer({
  storage: multerS3({
    s3,
    //버킷 주소
    bucket: "bloghome/upload",
    //서울일 경우 ap-northeast-2
    region: "ap-northeast-2",
    key(req, file, cb) {
      //파일확장자 - ext
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      //파일이름에 날짜를 추가해서 동일 파일이름일경우 구별하게 만듬
      cb(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});

//@route    POST api/post/image
//@desc     Create a Post
//@access   Private

//파일 5개로 제한, 게시글 작성에서 업로드 파일 보여주는 router
router.post("/image", uploadS3.array("upload", 5), async (req, res, next) => {
  try {
    console.log(req.file.map((v) => v.location));
    res.json({ uploaded: true, url: req.files.map((v) => v.location) });
  } catch (e) {
    console.error(e);
    res.json({ uploaded: false, url: null });
  }
});

//api/post - 백엔드, 프론트엔드 주소 다르게 하기 위해서 길게씀
router.get("/", async (req, res) => {
  const postFindResult = await Post.find();
  console.log(postFindResult, "All Post Get");
  res.json(postFindResult);
});

router.post("/", auth, async (req, res, next) => {
  try {
    console.log(req, "req");
    const { title, contents, fileUrl, creator } = req.body;

    //{}안에 있는내용으로 정보 만들기
    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      creator,
    });
    res.json(newPost);
  } catch (e) {
    console.log(e);
  }
});

export default router;
