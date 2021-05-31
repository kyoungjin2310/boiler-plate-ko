import { useEffect, useReducer } from 'react';

//reducer 함수
function reducer(state, action){
    switch(action.type){
        case 'LOADING':
            return{
                loading:true,
                data:null,
                error:null
            }
        case 'SUCCESS':
            return{
                loading:false,
                data:action.data,
                error:null
            }
        case 'ERROR':
            return{
                loading:false,
                data:null,
                error:action.error
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

// useAsync 함수는 두가지 파라미터를 받아옵니다. 
// 첫번째 파라미터는 API 요청을 시작하는 함수
// 두번째 파라미터는 deps 인데 이 deps 값은 해당 함수 안에서 사용하는 useEffect 의 deps 로 설정됩니다.
function UseAsync(callback, deps = []){
    const [state, dispatch] = useReducer(reducer, {
        loading:false,
        data:null,
        error:false
    });
    
    const fetchData = async() => {
        dispatch({type:"LOADING"});
        try {
            const data = await callback();
            dispatch({ type:'SUCCESS', data});
        }
        catch(e){
            dispatch({ type: "ERROR", error:e})
        }
    };


    //재사용때문에 뺌
    useEffect(()=>{
        /// eslint 설정을 다음 줄에서만 비활성화
        // eslint-disable-next-line
        fetchData();
    }, deps);
    
    //다른 js에서 사용할거를 return으로 뺌
    return [state, fetchData];
}

export default UseAsync;

