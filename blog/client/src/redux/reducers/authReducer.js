import { CLEAR_ERROR_FAILURE, CLEAR_ERROR_REQUEST, CLEAR_ERROR_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../type"

//store에서 같은 initialSate을 여기서 정의 함
const initialSate = {
    //백엔드에서 만든 token
    //localStorage - 데이터를 사용자 로컬에 보존하는 방식
    //localStorage.getItem(키값) - localStorage 개체 ​​항목의 값을 반환
    token: localStorage.getItem('token'),
    //인증여부
    inAuthenticated:null,
    isLoading:false,
    user:"",
    userId:"",
    userName:"",
    userRole:"",
    errorMsg:"",
    successMsg:""
}

const authReducer = (state = initialSate, action)=>{
    switch(action.type){
        case LOGIN_REQUEST: 
            return {
                ...state,
                errorMsg:"",
                isLoading:true
            }
        case LOGIN_SUCCESS:
            //.setItem - token에 action.payload.token값으로 넣음
            //key와 value 모두 string 으로 저장
            //createAction 을 통하여 만든 액션생성함수에 파라미터를 넣어서 호출하면, 자동으로 payload 라는 이름으로 통일되어 설정
            //예시 - payload: {user: "Test User", age: 25}
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticate: true,
                isLoading: false,
                userId:action.payload.user.id,
                userRole:action.payload.user.role,
                errorMsg:""
            }
        case LOGIN_FAILURE:
            //token 삭제
            localStorage.removeItem("token")
            return {
                ...state,
                ...action.payload,
                isAuthenticate: false,
                isLoading: false,
                userId: null,
                userRole: null,
                errorMsg: console.log("action.payload.data.msg")
            }
        //에러가 있는 상태로 창을 닫으면 에러가 계속 있어서 clear error를 해줘야함
        case CLEAR_ERROR_REQUEST:
            return {
                ...state,
            }
        case CLEAR_ERROR_SUCCESS:
            return {
                ...state,
                errorMsg:null,
                previousMatchMsg: "",
            }
        case CLEAR_ERROR_FAILURE:
            return {
                ...state,
                errorMsg: "Clear Error Fail",
                previousMatchMsg: "Clear Error Fail",
            }
        default :
            return state
    }
}

export default authReducer