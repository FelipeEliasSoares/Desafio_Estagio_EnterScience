import React from 'react';
import { Card, Button } from 'react-bootstrap';

function ArtistCard({ artist, handleSelectArtist }) {
    return (
        <Card key={artist.id} style={{ width: '18rem' }}>
            {artist.image && <Card.Img variant="top" src={artist.image} />}
            <Card.Body>
                <Card.Title>{artist.name}</Card.Title>
                <Button onClick={() => handleSelectArtist(artist)}>Selecionar</Button>
            </Card.Body>
        </Card>
    );
}

export default ArtistCard;
