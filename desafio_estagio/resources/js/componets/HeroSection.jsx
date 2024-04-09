import React from 'react';

function HeroSection() {
    return (
        <section id="hero" style={{ width: '100%', backgroundColor: '#1a1a1a', position: 'relative', padding: '120px 0 0 0' }}>
            <div style={{ content: '', background: '#211d25', position: 'absolute', bottom: 0, top: 0, left: 0, right: 0 }}></div>
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-lg-7 pt-5 pt-lg-0 order-2 order-lg-1 d-flex align-items-center">
                        <div data-aos="zoom-out">
                            <h1 style={{ margin: '0 0 20px 0', fontSize: '48px', fontWeight: 700, lineHeight: '56px', color: '#ffffff' }}>Contrate um Cantor</h1>
                            <h2 style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '40px', fontSize: '24px' }}>Encante seu público com músicas cativantes e performances emocionantes.</h2>
                            <div className="text-center text-lg-start">
                                <a href="#" className="btn-get-started scrollto" style={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 500, fontSize: '16px', letterSpacing: '1px', display: 'inline-block', padding: '10px 30px', borderRadius: '40px', transition: '0.5s', color: '#fff', background: '#ff4500' }}>Contrate Agora!</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 order-1 order-lg-2 hero-img " data-aos="zoom-out" data-aos-delay="300">
                        <img src="assets\img\a.png" className="mr-4" alt="" style={{ marginRight: '-30px' }} />
                    </div>
                </div>
            </div>
            <svg className="hero-waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
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
        </section>
    );
}

export default HeroSection;
