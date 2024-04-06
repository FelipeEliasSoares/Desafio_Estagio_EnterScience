import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
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
        <div className={`artist-card ${isVisible ? 'visible' : ''}`}>
            <Card key={artist.id} className="text-center">
                {artist.image && <Card.Img variant="top" src={artist.image} />}
                <Card.Body>
                    <Card.Title>{artist.name}</Card.Title>
                    <Button variant="primary" onClick={() => handleSelectArtist(artist)}>Selecionar</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ArtistCard;
