import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ArtistCardNoContract from './ArtistCardNoContract';
import '../../css/HeroSection.css';

const HeroSection = ({ loggedIn, artistResults, handleSelectArtist, setLoginModalShow }) => {
    return (
        <section className="hero-section">
            <div className="container">
                <div className="row justify-content-between mb-4">
                    <div className="col-lg-7 pt-5 pt-lg-0 order-2 order-lg-1 d-flex align-items-center">
                        <div data-aos="zoom-out">
                            <h1 className="hero-title">Contrate um Cantor</h1>
                            <h2 className="hero-subtitle">Encante seu público com músicas cativantes e performances emocionantes.</h2>
                            
                            {!loggedIn && (
                                <button className="btn-get-started" onClick={() => setLoginModalShow(true)}>Contrate Agora!</button>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-4 order-1 order-lg-2 hero-img-container">
                        <img src="https://img.freepik.com/fotos-gratis/cantor-negro-apaixonado-se-apresentando-contra-o-vermelho_1258-26348.jpg?w=1380&t=st=1712622504~exp=1712623104~hmac=bc9af2074f2c9104203cb0cca3801bf86c0315836640d42a1731cb01237a528c" className="hero-img" alt="" />
                    </div>
                </div>
            </div>
            {!loggedIn && (
                <Container>
                    <div className="discover-artists">
                        <h1 style={{ color: 'white', fontSize: '32px' }}>Descubra os Artistas Mais Quentes!</h1>
                    </div>
                    <Row className="artist-cards">
                        {artistResults.map(artist => (
                            <ArtistCardNoContract key={artist.id} artist={artist} handleSelectArtist={handleSelectArtist} />
                        ))}
                    </Row>
                </Container>
            )}
        </section>
    );
};

export default HeroSection;
