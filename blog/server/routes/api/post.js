import express from 'express'
import auth from '../../middleware/auth';
require("@babel/polyfill");

//model
import Post from '../../models/post'

const router = express.Router()

//api/post - 백엔드, 프론트엔드 주소 다르게 하기 위해서 길게씀
router.get('/', async(req, res)=>{
    const postFindResult = await Post.find();
    console.log(postFindResult, "All Post Get");
    res.json(postFindResult);
})

router.post('/', auth,  async(req, res, next)=>{
    try{
        console.log(req, "req");
        const {title, contents, fileUrl, creator} = req.body
        
        //{}안에 있는내용으로 정보 만들기
        const newPost = await Post.create({
            title, contents, fileUrl, creator
        });
        res.json(newPost);
    } catch(e){
        console.log(e);
    }
});

export default router

