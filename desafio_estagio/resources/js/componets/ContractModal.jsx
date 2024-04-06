import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import '/opt/lampp/htdocs/Desafio_Estagio/desafio_estagio/resources/css/app.css';


function ContractModal({ showModal, setShowModal, selectedArtist, formData, handleInputChange, handleSubmit }) {
    // Verificar se selectedArtist é nulo antes de renderizar o modal
    if (!selectedArtist) {
        return null;
    }

    return (
        <Modal 
            show={showModal} 
            onHide={() => setShowModal(false)}
            dialogClassName="modal-right" // Adicione uma classe para definir a animação de surgimento do lado direito
        >
            <Modal.Header closeButton>
                <Modal.Title>Contratação de {selectedArtist.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Seu nome" name="name" value={formData.name} onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group controlId="formFee">
                        <Form.Label>Cachê</Form.Label>
                        <Form.Control type="number" placeholder="Cachê" name="fee" value={formData.fee} onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group controlId="formEventDate">
                        <Form.Label>Data do Evento</Form.Label>
                        <Form.Control type="date" name="eventDate" value={formData.eventDate} onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group controlId="formAddress">
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control type="text" placeholder="Endereço do evento" name="address" value={formData.address} onChange={handleInputChange} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Enviar Contratação
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ContractModal;
