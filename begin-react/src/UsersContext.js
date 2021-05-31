import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users(){
    //요청에 대한 상태
    const [users, setUsers] = useState(null);//요청의 결과
    const [loading, setLoading] = useState(false);//로딩 상태
    const [error, setError] = useState(null);//에러

    //재사용을 위해서 fetchUsers를 뺌
    const fetchUsers = async() => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            setUsers(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);
            //데이터 조회
            //GET: 데이터 조회
            //POST: 데이터 등록
            //PUT: 데이터 수정
            //DELETE: 데이터 제거
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            );
            // 데이터는 response.data 안에 들어있습니다.
            setUsers(response.data);
        }
        catch(e){
            setError(e);
        }
        // loading 상태를 false 로 바꿉니다.
        setLoading(false);
    };


    useEffect(()=>{
        //여기서 한번 사용 컴포넌트가 나타났을때 실행, 
        //버튼없을 경우에는  fetchUsers을 여기로 가져옴
        fetchUsers();
    }, [])
    
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

