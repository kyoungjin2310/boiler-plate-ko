//express js를 가져옴
const express = require('express')
//app을 만듬
const app = express()
//5000번 호트를 백서버로 둠
const port = 5000


const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://username:abcd1234@boilerplate.odn6v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false
}).then(() => console.log('mongo db connect')).catch(err => console.log(err))


//텍스트 보이기
app.get('/', (req, res) => {
  res.send('Hello World!dddd')
})

//5000번에서 이앱을 실행
app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
})