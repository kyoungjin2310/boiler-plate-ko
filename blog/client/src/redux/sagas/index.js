//effects는 - redux-saga가 작업을 하도록 명령
import { all, fork } from "redux-saga/effects";
import axios from "axios";

import authSaga from './authSaga';
//서버주소를 적어야함 - dotenv를 이용
import dotenv from "dotenv";
dotenv.config()
//.env에서 client가 react앱을 사용한경우 REACT_APP_ 으로 시작해야함

//서버기본주소 
axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL

//function* - generator 함수, 여러값을 반환할 수 있음
//일반 함수는 하나의 값(혹은 0개의 값)만을 반환
//redux-saga사용시 써야됨
export default function* rootSaga() {
    //특정 작업을 명령하려면 yield를 씀
    //put은 dispatch랑 비슷함
    //all() - 제너레이터 함수들이 병행적으로 동시에 실행되고, 전부 resolve될때까지 기다린다. 
    yield all([fork(authSaga)]);
}