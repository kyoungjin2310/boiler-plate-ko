import React from 'react';
import axios from 'axios';
//커스텀 Hook 을 만들기 귀찮다면, useAsync를 사용
import { useAsync } from 'react-async';


async function getUser({ id }){
    const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return response.data;
}


function User({ id }){
    //호출 할 함수 promiseFn을 넣고, 
    //파라미터도 필드 이름과 함께 (customerId) 넣어주어야 합니다.
    const { data:user, error, isLoading } = useAsync({
        promiseFn: getUser,
        id,
        //watch 값에 특정 값을 넣으면 값이 바뀔 때마다, promiseFn 에 넣은 함수를 다시 호출
        watch: id
    });

    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!user) return null;

    return(
        <div>
            <h2>{user.username}</h2>
            <p>
                <b>Email:</b> {user.email}
            </p>
        </div>
    );
}

export default User;

