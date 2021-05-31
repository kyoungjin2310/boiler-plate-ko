import React from 'react';

const Footer = () => {
    //연도만 불러옴
    const thisYear = () => {
        const year = new Date().getFullYear();
        return year;
    }
    return (
        <div id="main-footer">
            <p>Copyright &copy; <span>{thisYear()}</span></p>
        </div>
    );
};

export default Footer;