//createStore - Redux 저장소(store)를 만듬
//compose - Compose는 여러 스토어 인핸서를 스토어에 전달하려는 경우에 사용
//스토어 인핸서는 스토어에 몇 가지 추가 기능을 추가하는 고차 기능
//Compose는 중첩된 함수 변환을 길게 늘어진 코드 없이 작성
//applyMiddleware는 createStore안에서 미들웨어와 리덕스와 연결
import {createStore, compose, applyMiddleware} from 'redux';
//createSagaMiddleware - Saga를 Redux Store에 연결하기 위해서는 미들웨어를 사용
import createSagaMiddleware from 'redux-saga';
//history 객체는 history모듈에서 createBrowserHistory로 받아올 수 있음
//history - 브라우저의 히스토리 정보를 문서와 문서 상태 목록으로 저장하는 객체
import {createBrowserHistory} from 'history';
//리액트에서 라우터 사용
import {routerMiddleware} from 'connected-react-router'

//컴포넌트 불러오기
import createRootReducer from './redux/reducers/index'
import rootSaga from './redux/sagas'

//history 객체 생성
export const history = createBrowserHistory()

//사가 미들웨어를 생성, applyMiddleware() 함수의 인자로 전달하여 리덕스 미들웨어로 추가
const sagaMiddleware = createSagaMiddleware()

//web의 모든 상태값을 담고있는 초기값
const initialSate = {}

//미들웨어 추가시 옆에 추가하면 됨
const middlewares = [sagaMiddleware, routerMiddleware(history)]

//store를 생성하는 코드에 Redux Devtools Extension을 추가
//중복 렌더링 방지, 효율적으로 State값 관리
//크롬이나 브라우저에서 리덕스로 개발할때 어떻게 상태가 진행되는지 개발자 도구에 나옴 
const devtools = window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__;

//배포 상태일 경우, devtools를 안보이게 해야함
const composeEnhancer = 
    process.env.NODE_ENV === "production"? compose : devtools || compose;

//store 생성
const store = createStore(
    createRootReducer(history),
    initialSate,
    composeEnhancer(applyMiddleware(...middlewares))
)

//.run은 sagaMiddleware안의 함수, 리덕스 사가 미들웨어 실행
//rootSaga - root 사가를 생성하고 개별 생성된 모든 사가 함수들을 합침
sagaMiddleware.run(rootSaga)

export default store