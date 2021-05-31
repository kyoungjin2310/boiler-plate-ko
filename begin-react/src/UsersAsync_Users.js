import React from 'react';
import axios from 'axios';
import useAsync from './UseAsync';

async function getUsers(){
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    );
    return response.data
}


function Users(){
    // useAsync 함수는 두가지 파라미터를 받아옵니다. 
    // 첫번째 파라미터는 API 요청을 시작하는 함수
    // 두번째 파라미터는 deps 인데 이 deps 값은 해당 함수 안에서 사용하는 useEffect 의 deps 로 설정됩니다.
    // 커스텀 Hook에서 return으로 받은값 쓰기
    const [state, refetch] = useAsync(getUsers, []);

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
            <button onClick={refetch}> 다시 불러오기</button>
        </>
    );
}

export default Users;

