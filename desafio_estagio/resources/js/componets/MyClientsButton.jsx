import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import axios from 'axios';

function MyClientsButton() {
    const [showModal, setShowModal] = useState(false);
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Função para lidar com o clique no botão "Meus Contratantes"
    const handleMyClientsClick = () => {
        console.log('Clicou em "Meus Contratantes"');
        setLoading(true);
        axios.get('http://localhost:8000/my-clients') // Endpoint para obter os clientes do Laravel
            .then(response => {
                setArtists(response.data);
                setLoading(false);
                setShowModal(true);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    };

    return (
        <>
            <Button variant="primary" onClick={handleMyClientsClick}>
                Meus Contratantes
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Meus Contratantes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <p>Carregando...</p>
                    ) : error ? (
                        <p>Ocorreu um erro: {error}</p>
                    ) : (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Gênero</th>
                                    <th>Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                                {artists.map(artist => (
                                    <tr key={artist.id}>
                                        <td>{artist.name}</td>
                                        <td>{artist.genre}</td>
                                        <td>{artist.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MyClientsButton;
