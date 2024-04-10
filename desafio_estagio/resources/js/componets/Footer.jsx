import React from 'react';

const Footer = () => {
    return (
        <footer id="footer" style={{ position: 'relative' }}>
            <svg className="hero-waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" style={{ position: 'absolute', bottom: '0', height: '50px', width: '100%' }}>
                <defs>
                    <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="wave1">
                    <use xlinkHref="#wave-path" x="50" y="3" fill="rgba(255,255,255, .1)" />
                </g>
                <g className="wave2">
                    <use xlinkHref="#wave-path" x="50" y="0" fill="rgba(255,255,255, .2)" />
                </g>
                <g className="wave3">
                    <use xlinkHref="#wave-path" x="50" y="9" fill="#fff" />
                </g>
            </svg>
            <div className="container">
                <div className="copyright">
                    &copy; Copyright <strong><span id="ar">FelipeEliasSoares</span></strong>. All Rights Reserved
                </div>
                <div className="credits">
                    Designed by <a href="https://github.com/FelipeEliasSoares/Trabalho_Desenvolvimento_Web_2" id="ar">FelipeEliasSoares</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
