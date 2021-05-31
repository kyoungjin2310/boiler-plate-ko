import jwt from 'jsonwebtoken';
import config from '../config/index'
const{JWT_SECRET} = config;

const auth = (req, res, next) => {
    //브라우저 header에서 token 불러오기 - req.headers : HTTP의 Header 정보
    //x-auth-token은 헤더에서 토큰 반환
    const token = req.header('x-auth-token')
    
    //token이 없을 경우
    if(!token){
        return res.status(401).json({ msg: "토큰 없음. 인증이 거부됨!!!"})
    }
    try{
        //token이 있을 경우
        //jwt.verify 토큰 유효성을 확인
        //jwt.verify() 함수에 들어가는 매개변수 3개
        // token: client에게서 받은 token
        // JWT_SECRET : token 생성 시 사용했던 JWT_SECRET
        // 3번째 인자로 들어간 익명함수 : 유효성 검사 결과를 처리할 callback 함수
        // 예시)
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        //다음 미들웨어 실행
        next()
    }catch(e){
        //token이 존재하더라도 에러발생시 
        console.log(e);
        res.status(400).json({ msg: "토큰이 유효하지 않습니다" })
    }

}

export default auth;