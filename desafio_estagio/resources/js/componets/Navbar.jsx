// CustomNavbar.js

import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import MyClientsButton from './MyClientsButton'; 

function CustomNavbar({ handleLogin, loggedIn, handleLogout, showMyClientsButton, handleMyClientsClick }) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Your App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* Adicione o botão "Meus Contratantes" aqui */}
                    {showMyClientsButton && (
                        <MyClientsButton handleMyClientsClick={handleMyClientsClick} />
                    )}
                </Nav>
                <Nav className="ml-auto">
                    {/* Adicione os botões de login/logout aqui */}
                    {!loggedIn ? (
                        <Button variant="primary" onClick={handleLogin}>Login</Button>
                    ) : (
                        <Button variant="primary" onClick={handleLogout}>Logout</Button>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustomNavbar;
