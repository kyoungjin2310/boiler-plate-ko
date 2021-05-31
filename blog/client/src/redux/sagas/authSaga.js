import axios from 'axios';
import { all, call, put, takeEvery, fork} from 'redux-saga/effects'
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../type';

//Login Api

const loginUserAPI = (loginData) => {
    console.log(loginData,"loginData")
    //postman 설정을 여기에다가 적음
    const config = {
        headers: {
            "Content-Type":"application/json"
        }
    }
    //HTTP 요청
    //axios.post(url, data객체, config-위의 설정)
    return axios.post('api/auth', loginData, config)
}

function* loginUser (action) {
    try{
        //성공할시 위에 함수를 불러옴
        const result = yield call(loginUserAPI, action.payload)
        console.log(result)
        yield put({
            type:LOGIN_SUCCESS,
            payload:result.data,
        })

    } catch(e){
       //로그인 실패시 타입:LOGIN_FAILURE를 보냄
       yield put({
           type:LOGIN_FAILURE,
           //error에 response를 가져옴
           payload: e.response,
       })
   }
}

//LOGIN_REQUEST를 계속 확인
function* watchLoginUser(){
    //LOGIN_REQUEST가 있으면 loginUser 실행
    yield takeEvery(LOGIN_REQUEST, loginUser)
}

//내보내기
export default function* authSaga(){
    yield all([
        fork(watchLoginUser)
    ])
}