import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import MyClientsButton from './MyClientsButton';

function CustomNavbar({ handleLogin, loggedIn, handleLogout, showMyClientsButton, handleMyClientsClick }) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home" className="brand-text">Your App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* Adicione o botão "Meus Contratantes" aqui */}
                    {showMyClientsButton && (
                        <MyClientsButton handleMyClientsClick={handleMyClientsClick} />
                    )}
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    {/* Adicione os botões de login/logout aqui */}
                    {!loggedIn ? (
                        <Button variant="outline-success" onClick={handleLogin} className="nav-button">Login</Button>
                    ) : (
                        <Button variant="outline-success" onClick={handleLogout} className="nav-button">Logout</Button>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustomNavbar;
