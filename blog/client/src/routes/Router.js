import React, { Fragment } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import AppNavbar from '../components/AppNavbar';

const MyRouter = () => (
    <>
        <AppNavbar />
        <Header />
            {/* header, footer는 변하지 않고 아래 body만 변함(상태관리) */}
            <h1>Hello Body</h1>
        <Footer />
    </>
)


//()괄호는 아래 내용이 생략된것을 의미
// {
//     return (
//         <div>
            
//         </div>
//     );
// };

export default MyRouter;