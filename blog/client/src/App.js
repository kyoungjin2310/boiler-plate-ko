import React from 'react';
import {Provider} from 'react-redux'
//라우터 연결
import {ConnectedRouter} from 'connected-react-router'
//import defaultExport, { export } from "module-name";
//defaultExport - store
//{ export } - {history}
import store, {history} from './store'
import MyRouter from './routes/Router'

//scss
import './assets/custom.scss';

const App = ()=>{
  return (
    //store는 최상위에서 작성
    <Provider store={store}>
      {/* 라우터를 히스토리로 작동시킴 */}
      <ConnectedRouter history={history}>
        <MyRouter />
      </ConnectedRouter>
    </Provider>   
  );
}

export default App;
