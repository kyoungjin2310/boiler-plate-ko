import express from "express";

//model
import Post from "../../models/post";
import User from "../../models/user";
import Category from "../../models/category";
import Comment from "../../models/comment";
require("@babel/polyfill");
import auth from "../../middleware/auth";
import moment from "moment";

const router = express.Router();

//파일을 주고 받을 수 있도록 도와주는 multer-s3
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import AWS from "aws-sdk";
import dotenv from "dotenv";
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
    console.log(req.files.map((v) => v.location));
    res.json({ uploaded: true, url: req.files.map((v) => v.location) });
  } catch (e) {
    console.error(e);
    res.json({ uploaded: false, url: null });
  }
});

//  @route    GET api/post
//  @desc     More Loading Posts
//  @access   public
//api/post - 백엔드, 프론트엔드 주소 다르게 하기 위해서 길게씀
router.get("/skip/:skip", async (req, res) => {
  try {
    const postCount = await Post.countDocuments();
    const postFindResult = await Post.find()
      .skip(Number(req.params.skip))
      .limit(6)
      .sort({ date: -1 });

    const categoryFindResult = await Category.find();
    const result = { postFindResult, categoryFindResult, postCount };

    res.json(result);
  } catch (e) {
    console.log(e);
    res.json({ msg: "더 이상 포스트가 없습니다" });
  }
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
          posts: newPost._id,
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
        category: findResult._id,
      });

      await User.findByIdAndUpdate(req.user.id, {
        //user는 여러 post를 보낼수 있음
        //model안에 이름이랑 같아야함 post -> posts
        $push: {
          posts: newPost._id,
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
    //populate - Post model에서 Object.id(Post model에 저장X, 연결이 되어있음) 연결되어 있는 것들을 만들어달라는 것
    //populate({ path: "category", select: "categoryName" }) - 객체형식으로 적어야 정석
    //populate("creator", "name")은 생략한 것
    //path - Post model안에서 category
    const post = await Post.findById(req.params.id)
      .populate("creator", "name")
      .populate({ path: "category", select: "categoryName" });
    post.views += 1;
    post.save();
    console.log(post);
    res.json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// [Comments Route]

// @route Get api/post/:id/comments
// @desc  Get All Comments
// @access public

//조회
router.get("/:id/comments", async (req, res) => {
  try {
    //id로 찾기
    const comment = await Post.findById(req.params.id).populate({
      //경로
      path: "comments",
    });
    //Post.findById(req.params.id) 결과값이 객체여서 안에 comments를 하기
    const result = comment.comments;
    console.log(result, "comment load");
    //프론트에서 받을것
    res.json(result);
  } catch (e) {
    console.log(e);
  }
});

//글올리기
router.post("/:id/comments", async (req, res, next) => {
  console.log(req, "comments");
  const newComment = await Comment.create({
    contents: req.body.contents,
    creator: req.body.userId,
    creatorName: req.body.userName,
    post: req.body.id,
    date: moment().format("YYYY-MM-DD hh:mm:ss"),
  });
  console.log(newComment, "newComment");

  try {
    //id를 찾아서 comments를 넣기
    await Post.findByIdAndUpdate(req.body.id, {
      $push: {
        comments: newComment._id,
      },
    });
    //id를 찾아서, 작성한 댓글찾기
    await User.findByIdAndUpdate(req.body.userId, {
      $push: {
        comments: {
          post_id: req.body.id,
          comment_id: newComment._id,
        },
      },
    });
    res.json(newComment);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// @route    Delete api/post/:id
// @desc     Delete a Post
// @access   Private
// 글삭제
router.delete("/:id", auth, async (req, res) => {
  //req.params.id로 들어오는것을 다지움
  await Post.deleteMany({ _id: req.params.id });
  await Comment.deleteMany({ post: req.params.id });
  await User.findByIdAndUpdate(req.user.id, {
    //배열에서 값을 빼줄때는 pull을 사용
    $pull: {
      posts: req.params.id,
      comments: { post_id: req.params.id },
    },
  });
  //카테고리
  //findOneAndUpdate - 찾고 업데이트
  const CategoryUpdateResult = await Category.findOneAndUpdate(
    { posts: req.params.id },
    { $pull: { posts: req.params.id } },
    //mongoose에서 업데이트를 하려면 new를 true로 설정해야함
    { new: true }
  );

  if (CategoryUpdateResult.posts.length === 0) {
    await Category.deleteMany({ _id: CategoryUpdateResult });
  }
  return res.json({ success: true });
});

// @route    GET api/post/:id/edit
// @desc     Edit Post
// @access   Private
//글 수정

//post를 찾고 정보를 내보내줌 - 정보받기
router.get("/:id/edit", auth, async (req, res, next) => {
  try {
    //populate - 생성
    const post = await Post.findById(req.params.id).populate("creator", "name");
    res.json(post);
  } catch (e) {
    console.error(e);
  }
});

//get이랑 주소가 같음, auth은 인증이 필요한 경우
router.post("/:id/edit", auth, async (req, res, next) => {
  console.log(req, "api/post/:id/edit");
  //구조분해
  const {
    body: { title, contents, fileUrl, id },
  } = req;

  try {
    //수정된 post
    const modified_post = await Post.findByIdAndUpdate(
      id,
      {
        title,
        contents,
        fileUrl,
        //수정한 날짜로 바꿈
        date: moment().format("YYYY-MM-DD hh:mm:ss"),
      },
      { new: true }
    );
    console.log(modified_post, "edit modified");
    res.redirect(`/api/post/${modified_post.id}`);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;
