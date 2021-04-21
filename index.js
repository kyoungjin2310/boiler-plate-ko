//express js를 가져옴
const express = require('express')
//app을 만듬
const app = express()
//5000번 호트를 백서버로 둠
const port = 5000
//bodyParser 연결
const bodyParser = require('body-parser');
//인스턴스 User 연결
const { User } = require('./models/User')
// mongoDB 주소 가져오기
const config = require('./config/key')



//bodyParser에 옵션주기
//application/x-www-form-urlencoded 타입을 데이터 분석해서 가져오기
app.use(bodyParser.urlencoded({extended:true}));
//application/json 타입을 데이터 분석해서 가져오기
app.use(bodyParser.json());

//mongoDB를 연결
const mongoose = require('mongoose')
//밑에 아이디, 비밀번호 보안 -> .gitignore에서 관리
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false
}).then(() => console.log('mongo db connect')).catch(err => console.log(err))


//텍스트 보이기
app.get('/', (req, res) => {
  res.send('Hello World!ssddddd')
})

//데이터 등록
app.post('/register', (req, res) => {

  //회원 가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  //인스턴스에 정보넣기
  //req.body(정보) - json 형식으로 작성됨
  const user = new User(req.body)

  //save - mongoDB에서 오는 메소드
  user.save((err, userInfo) => {
    //에러가 있을경우 - json 형식으로 전달, 성공하지 못했다, 에러메시지
    if(err) return res.json({success: false, err})
    //정보전달 성공했을 경우
    //.status(200) - 성공했다는 표시
    return res.status(200).json({success: true})
  })

})

//5000번에서 이앱을 실행
app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
})

//-dev -> local에서만 사용하겠다
//-dev예시 npm install nodemon --save-dev
//nodemon 서버를 중단하지 않아도 반영되는 모드