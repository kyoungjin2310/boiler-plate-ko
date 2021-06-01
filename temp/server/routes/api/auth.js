import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import auth from '../../middleware/auth'
import config from '../../config/index'
const {JWT_SECRET} = config


//Model
import User from '../../models/user'

const router = express.Router()

//로그인
//@route  POST api/auth
//@desc   Auth user
//@access Public
router.post('/', (req, res)=>{
    const {email, password} = req.body;

    // Simple Validation
    if(!email || !password){
        return res.status(400).json({msg:"모든 필드를 채워주세요"})
    }

    //Check for existing user (user 존재여부에 따라 동작)
    User.findOne({email}).then((user)=>{
        //user가 존재하지 않을 영우
        if(!user) return res.status(400).json({msg:"유저가 존재하지 않습니다."})
        
        //user가 존재할경우 password 검증(Validate password)
        //password - 입력한 패스워드
        //user.password - 기존에 등록 되어 있는 user 패스워드
        //2개 암호를 비교
        bcrypt.compare(password, user.password).then((isMatch)=>{
            if(!isMatch)
                return res.status(400).json({ msg:"비밀번호가 일치하지 않습니다."});
            jwt.sign(
                {id:user.id}, 
                JWT_SECRET, 
                {expiresIn:"2 days"}, 
                (err, token)=>{
                    if(err) throw err;
                    res.json({
                        token,
                        user:{
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        },
                    })
                }
            )
        })
    })
})



//로그아웃 - 프론트에서 함

router.post('/logout',(req, res)=>{
    res.json("로그아웃 성공")
})

router.get('/user', auth, async(req, res)=>{
    try{
        //프론트에 id값을 보내줌
        //select 생략하면 패스워드가 나옴
        const user = await User.findById(req.user.id).select("-password");
        if(!user) throw Error("유저가 존재하지 않습니다.")
        res.json(user)
    }catch(e){
        console.log(e);
        res.status(400).json({})
    }
})

export default router