import express from "express";
require("@babel/polyfill");

//model
import Post from "../../models/post";
import User from "../../models/user";
import Category from "../../models/category";
import auth from "../../middleware/auth";

const router = express.Router();

//파일을 주고 받을 수 있도록 도와주는 multer-s3
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import { async } from "regenerator-runtime";
import moment from "moment";
import { isNullOrUndefined } from "util";
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

//@route  POST api/post
//@desc   Create a Post
//@access Private

//uploadS3에는 주소만 있어서 별도로 추가 코드를 작성X
router.post("/", auth, uploadS3.none(), async (req, res, next) => {
  try {
    console.log(req, "req");
    const { title, contents, fileUrl, creator, category } = req.body;

    //{}안에 있는내용으로 정보 만들기
    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      //작성자가 누구인지 작성
      //creator가 안나올경우 mongoDB로 들어가서
      //clusters 클릭 -> collections 클릭 -> posts를 마우스로 hover -> 휴지통 아이콘 클릭후
      //-> posts 쓰고 닫기
      creator: req.user.id,
      date: moment().format("YYYY-MM-DD hh:mm:ss"),
    });

    //findOne 하나만 찾기 - req안에 category와 같은 것을 찾음
    const findResult = await Category.findOne({
      //model에 있는걸 써야함
      categoryName: category,
    });

    console.log(findResult, "Find Result!!!!");

    //Category를 처음 만들때
    //findResult가 없다면
    //await을 적어야 다음으로 넘어가서 작성
    if (isNullOrUndefined(findResult)) {
      const newCategory = await Category.create({
        //model안에 이름이랑 같아야함
        //req에서 작성된 category
        categoryName: category,
      });

      //Post에 category연결
      //id로 찾아서 업데이트
      await Post.findByIdAndUpdate(newPost._id, {
        //model안에 이름이랑 같아야함
        //$push는 방금만든 newCategory를 category에 배열로 만들어서 추가
        $push: { category: newCategory._id },
      });

      //category에 Post 연결
      await Category.findByIdAndUpdate(newCategory._id, {
        //model안에 이름이랑 같아야함
        $push: { posts: newPost._id },
      });

      //글쓴사람과 post 연결
      await User.findByIdAndUpdate(req.user.id, {
        //user는 여러 post를 보낼수 있음
        //model안에 이름이랑 같아야함 post -> posts
        $push: {
          posts: newPost.id,
        },
      });
    } else {
      //findResult 값이 있을 경우(category값이 이미 존재 할 경우)
      //_id는 mongoDB에서 id를 쓸때 _id를 씀
      await Category.findByIdAndUpdate(findResult._id, {
        $push: { posts: newPost._id },
      });

      await Post.findByIdAndUpdate(newPost._id, {
        //findResult 찾은 값을 사용
        category: findResult.id,
      });

      await User.findByIdAndUpdate(req.user.id, {
        //user는 여러 post를 보낼수 있음
        //model안에 이름이랑 같아야함 post -> posts
        $push: {
          posts: newPost.id,
        },
      });
    }
    //글을 다쓰면 id주소로 이동
    return res.redirect(`/api/post/${newPost._id}`);
  } catch (e) {
    console.log(e);
  }
});

//각 id로 새로운 주소 추가
//@route     Post api/post/:id
//@desc      Detail Post(detail 주소로 넘어감)
//@access    Pubilc

router.get("/:id", async (req, res, next) => {
  try {
    //Post model에서 id를 찾기
    //popuplate - Post model에서 Object.id(Post model에 저장X, 연결이 되어있음) 연결되어 있는 것들을 만들어달라는 것
    //popuplate({ path: "category", select: "categoryName" }) - 객체형식으로 적어야 정석
    //popuplate("creator", "name")은 생략한 것
    //path - Post model안에서 category
    const post = await Post.findById(req.params.id)
      .popuplate("creator", "name")
      .popuplate({ path: "category", select: "categoryName" });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;
