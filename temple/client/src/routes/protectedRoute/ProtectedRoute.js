//페이지 보안 - 주소입력해도 못들어가고 버튼누르면 들어갈 수 있도록 함
import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const EditProtectedRoute = ({ component: Component, ...rest }) => {
  const { userId } = useSelector((state) => state.auth);
  const { creatorId } = useSelector((state) => state.post);

  return (
    <Route
      {...rest}
      render={(props) => {
        //작성자와 유저아이디가 같을경우
        if (userId === creatorId) {
          //props를 돌려줌
          return <Component {...props} />;
        } else {
          return (
            //아닐경우 홈으로 보내기
            <Redirect
              to={{
                pathname: "/",
                state: {
                  //state - 받은 위치상태 고대로
                  //새로고침없이 주소가 바뀜 - location이나 history를 사용함
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
