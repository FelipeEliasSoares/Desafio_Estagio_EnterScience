// CustomNavbar.js

import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import MyClientsButton from './MyClientsButton'; 

function CustomNavbar({ handleLogin, loggedIn, handleLogout, showMyClientsButton, handleMyClientsClick }) {
    return (
        <Navbar bg="light" expand="lg" className="custom-navbar mb-6">
            <Navbar.Brand href="#home" className="brand-text">Your App</Navbar.Brand>
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
                        <Button variant="primary" onClick={handleLogin} className="nav-button ml-2">Login</Button>
                    ) : (
                        <Button variant="primary" onClick={handleLogout} className="nav-button ml-2">Logout</Button>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustomNavbar;

