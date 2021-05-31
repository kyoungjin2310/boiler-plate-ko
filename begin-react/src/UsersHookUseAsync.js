import React, { useState } from 'react';
import axios from 'axios';
//커스텀 Hook 을 만들기 귀찮다면, useAsync를 사용
import { useAsync } from 'react-async';
import User from './User'

async function getUsers(){
    const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/`
    );
    return response.data;
}


function Users(){
    const [userId, setUserId] = useState(null);
    const { data:users, error, isLoading, run } = useAsync({
        //렌더링하는 시점이 아닌 사용자의 특정 인터랙션에 따라 API 를 호출하고 싶을 땐 promiseFn 대신 deferFn 을 사용
        deferFn: getUsers
    })
    
    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!users) return <button onClick={run}>불러오기</button>

    return(
        <>
            <ul>
                {users.map(user => (
                    <li
                        key={user.id}
                        onClick={()=> setUserId(user.id)}
                        style={{cursor:'pointer'}}
                    >
                        {user.username} ({user.name})    
                    </li>
                ))}
            </ul>
            <button onClick={run}>다시 불러오기</button>
            {userId && <User id={userId} />}        
        </>
    );
}

export default Users;

