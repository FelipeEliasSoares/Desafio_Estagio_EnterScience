import React, { useState, useEffect } from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import '/opt/lampp/htdocs/Desafio_Estagio/desafio_estagio/resources/css/ArtistCard.css';

function ArtistCard({ artist, handleSelectArtist }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Adiciona uma pequena pausa para criar o efeito de surgimento
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    return (
        artist.image && (
            <Col xs={12} sm={6} md={4} lg={3} xl={3} className={`artist-card ${isVisible ? 'visible' : ''} mt-3`}>
                <Card className="text-center" style={{ backgroundColor: 'black', boxShadow: '0 4px 8px 0 rgba(255, 255, 255, 0.2)' }}>
                    <Card.Img variant="top" src={artist.image} style={{ height: '200px', objectFit: 'cover' }} />
                    <Card.Body style={{ color: 'white' }}>
                        <Card.Title style={{ fontSize: '1.2rem' }}>{artist.name}</Card.Title>
                        <Button variant="success" onClick={() => handleSelectArtist(artist)}>Selecionar</Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    );
}

export default ArtistCard;
