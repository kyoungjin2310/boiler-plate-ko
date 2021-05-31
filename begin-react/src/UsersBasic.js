import React, {createContext, useReducer, useContext} from 'react';

// UsersContext 에서 사용 할 기본 상태

const initialState = {
    users: {
      loading: false,
      data: null,
      error: null
    },
    user: {
      loading: false,
      data: null,
      error: null
    }
};

//로딩
const loadingState = {
    loading : true,
    data: null,
    error: null
};

//성공했을 때
const success = data => ({
    loading:false,
    data,
    error:null
});

//에러
const error = error => ({
    loading:false,
    data:null,
    error: error
});

// 위에서 만든 객체 / 유틸 함수들을 사용하여 리듀서 작성
function usersReducer(state, action) {
    switch (action.type) {
      case 'GET_USERS':
        return {
          ...state,
          users: loadingState
        };
      case 'GET_USERS_SUCCESS':
        return {
          ...state,
          users: success(action.data)
        };
      case 'GET_USERS_ERROR':
        return {
          ...state,
          users: error(action.error)
        };
      case 'GET_USER':
        return {
          ...state,
          user: loadingState
        };
      case 'GET_USER_SUCCESS':
        return {
          ...state,
          user: success(action.data)
        };
      case 'GET_USER_ERROR':
        return {
          ...state,
          user: error(action.error)
        };
      default:
        throw new Error(`Unhanded action type: ${action.type}`);
    }
}
  