import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import MyClientsButton from './MyClientsButton';
import '../../css/CustomNavbar.css';

function CustomNavbar({ handleLogin, loggedIn, handleLogout, showMyClientsButton, }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            // Checks if the screen size is smaller than 768 pixels (typically for mobile devices
            setIsMobile(window.innerWidth < 768);
        };

        // Add a listener for the resize event
        window.addEventListener('resize', handleResize);

        // Initial call to configure isMobile status
        handleResize();

        // Remove the resize event listener when unmounting the component
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header id="header" className="d-flex align-items-center header-transparent" style={{ width: '100%', backgroundColor: 'rgba(18, 214, 61, 0.918)', position: 'relative', height: '60px' }}>
            <div className="container d-flex align-items-center justify-content-between" style={{ paddingTop: '10px', paddingBottom: '10px' }} id='NavBar'>

                <h4 style={{ margin: '0', marginBottom: isMobile ? '10px' : '0', fontSize: isMobile ? '1.5rem' : '2rem' }}>Contract-me</h4>

                <Navbar expand="lg" style={{ margin: '0', width: isMobile ? '80%' : 'auto' }}>
                    
                        
                        <Nav className={isMobile ? "flex-column align-items-center" : "mr-auto"}>
                            {showMyClientsButton && (
                                <Nav.Link href="#" className={isMobile ? "mb-2 text-center" : ""}><MyClientsButton /></Nav.Link>
                            )}
                        </Nav>
                        <Nav className={isMobile ? "flex-column align-items-center" : "mr-auto"}>
                            {!loggedIn ? (
                                <Button variant="success" onClick={handleLogin} className={isMobile ? "nav-button btn-block" : "nav-button"}>Login</Button>
                            ) : (
                                <Button variant="success" onClick={handleLogout} className={isMobile ? "nav-button btn-block" : "nav-button"}>Logout</Button>
                            )}
                        </Nav>
                    
                </Navbar>

            </div>
        </header>
    );
}

export default CustomNavbar;
