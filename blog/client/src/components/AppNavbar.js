import React from 'react';
import {Navbar, Container, NavbarToggler, Collapse, Nav} from 'reactstrap'
import {Link} from 'react-router-dom'
import LoginModal from '../components/auth/LoginModal'

const AppNavbar = () => {
    return (
        <>
          <Navbar>
            <Container>
                <Link to="/" className="navbar">
                    blog
                </Link>
                <NavbarToggler />
                <Collapse isOpen={true} navbar className="nav">
                    <Nav>
                        {/* 인증값이 true일 경우 */}
                        {false? 
                            <h2>authLink</h2>
                        :
                            <LoginModal />
                        }
                    </Nav>
                </Collapse>
            </Container>
          </Navbar>  
        </>
    );
};

export default AppNavbar;