const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // Schema - 정보를 담음
    name: {
        type: String,
        maxlength: 50
    },
    email:{
        // String - 문자열
        type: String,
        // trim - 띄어쓰기 없애기
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlength: 50
    },
    // role - 관리자 또는 일반유저를 정의
    role:{
        // 숫자에 따라 관리자 또는 일반유저
        type:Number,
        default: 0
    },
    // 그사람에 해당하는 이미지
    image:String,
    // token - 유효성 검사
    token:{
        type: String        
    },
    // tokenExp - token 사용 유효기간
    tokenExp:{
        type: Number
    }
});

// model - Schema 를 담음
// mongoose.model("파일이름", Schema이름)
const User = mongoose.model("User", userSchema)

// 다른 곳에서 사용가능하게 하기
// module.exports = { 인스턴스 이름 }
module.exports = { User }