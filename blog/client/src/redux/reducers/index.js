import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import authReducer from "./authReducer";

//CombineReducers는 많은 Reducer들을 하나로 합쳐 하나의 Reducer로 관리
const createRootReducer = (history) => combineReducers({
    //connected-react-router를 router로 부르고 reducer들을 모두연결하려는 용도로 사용
    router: connectRouter(history),
    //authReducer를 간략하게 auth라고 쓸수 있게 만듬
    auth: authReducer,
})

export default createRootReducer