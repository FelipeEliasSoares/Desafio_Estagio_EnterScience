import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import MyClientsButton from './MyClientsButton';

function CustomNavbar({ handleLogin, loggedIn, handleLogout, showMyClientsButton, handleMyClientsClick }) {
    return (
        <header id="header" className="d-flex align-items-center header-transparent" style={{ width: '100%', backgroundColor: 'rgba(18, 214, 61, 0.918)', position: 'relative', height: '60px' }}>
            <div className="container d-flex align-items-center justify-content-between" style={{ paddingTop: '10px', paddingBottom: '10px' }}>

                <h4 style={{ margin: '0' }}><a href="index.php">Avatar Korra</a></h4>

                <Navbar expand="lg" style={{ margin: '0' }}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="bi bi-list mobile-nav-toggle" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {showMyClientsButton && (
                                <Nav.Link href="#" onClick={handleMyClientsClick}><MyClientsButton></MyClientsButton></Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            {!loggedIn ? (
                                <Button variant="outline-success" onClick={handleLogin} className="nav-button"> Login</Button>
                            ) : (
                                <Button variant="outline-success" onClick={handleLogout} className="nav-button">Logout</Button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </div>
        </header>
    );
}

export default CustomNavbar;
