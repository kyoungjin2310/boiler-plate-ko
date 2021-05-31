import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

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

function Users(){
    const [state, dispatch] = useReducer(reducer, {
        loading:false,
        data:null,
        error:null
    });
    
    //재사용을 위해서 fetchUsers를 뺌
    const fetchUsers = async() => {
        dispatch({type:"LOADING"})
        try {
            //데이터 조회
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            );

            // 데이터는 response.data 안에 들어있습니다.
            dispatch({ type:'SUCCESS', data:response.data });
        }
        catch(e){
            dispatch({ type: "ERROR", error:e})
        }
    };


    useEffect(()=>{
        //여기서 한번 사용 컴포넌트가 나타났을때 실행, 
        //버튼없을 경우에는  fetchUsers을 여기로 가져옴
        fetchUsers();
    }, [])
    

    // state.data 를 users 키워드로 조회
    const {loading, data:users, error} = state;

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!users) return null;
    return(
        <>
            <ul>
                {users.map(user => (
                <li key={user.id}>
                    {user.username} ({user.name})
                </li>
                ))}
            </ul>
            {/* 버튼 눌렀을때 실행 */}
            <button onClick={fetchUsers}> 다시 불러오기</button>
        </>
    );
}

export default Users;

