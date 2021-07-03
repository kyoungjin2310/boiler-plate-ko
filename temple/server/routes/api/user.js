import express from "express";
import bcrypt from "bcryptjs";
import auth from "../../middleware/auth";
import jwt from "jsonwebtoken";
import config from "../../config/index";

//여기서 만든 토큰을 브라우저에서 인정받으려면 입력해야함
const { JWT_SECRET } = config;

// Model
import User from "../../models/user";

const router = express.Router();

// @routes GET api/user
// @desc   GET all user - 모든 사용자를 조회
// @access public

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error("No users");
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

// @routes POST api/user
// @desc   Register all user - 회원 등록
// @access public - 모든사람이 접근

router.post("/", (req, res) => {
  console.log(req, "home");
  // req.body안에 데이터가 담김
  const { name, email, password } = req.body;

  //Simple validation - 간단한 인증
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "모든 필드를 채워주세요" });
  }

  //Check for exising user - 회원 가입할때 기존에 가입된 유저가 있을 경우
  //email을 통해서 판별, 기존의 user에서 찾음
  //then을 적으면 findOne을 통해서 나온값을 user로 담음
  User.findOne({ email }).then((user) => {
    if (user)
      return res.status(400).json({ msg: "이미 가입된 유저가 존재합니다." });
    const newUser = new User({
      name,
      email,
      password,
    });

    //hash - 임의의 길이 값을 일정한 길이의 값으로 암호화(단방향)
    //hash를 만들어주는게 bcrypt
    //보안때문에 사용, 10은 salt가 몇글자인지 나타냄 2의10승
    bcrypt.genSalt(10, (err, salt) => {
      //hash 만들기
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        //password에 hash를 담아서 암호화
        newUser.password = hash;
        //newUser에 저장, 토큰 등록
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            JWT_SECRET,
            //토큰 만기일 - 3600초, "10h, 10d" 10시간, 10일도 가능
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              //토큰을 받아서 응답
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

// @route    POST   api/user/:username/profile
// @desc     POST   Edit Password
// @access   Private

router.post("/:userName/profile", auth, async (req, res) => {
  try {
    //기존패스워드, 새로운패스워드, 재입력패스워드, 아이디
    const { previousPassword, password, rePassword, userId } = req.body;
    //req.body가 제대로 들어오는지 확인
    console.log(req.body, "userName Profile");
    const result = await User.findById(userId, "password");
    //비교
    bcrypt.compare(previousPassword, result.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({
          match_msg: `기존 비밀번호와 일치하지 않습니다`,
        });
      } else {
        if (password === rePassword) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              result.password = hash;
              //result값 저장
              result.save();
            });
          });
          res
            .status(200)
            .json({ success_msg: "비밀번호 업데이트에 성공했습니다" });
        } else {
          res.status(400).json({
            fail_msg: "새로운 비밀번호가 일치하지 않습니다",
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
});

export default router;
