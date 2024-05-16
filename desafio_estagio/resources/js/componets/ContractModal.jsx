import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function ContractModal({ showModal, setShowModal, selectedArtist, formData, handleInputChange, handleSubmit }) {
    

    if (!selectedArtist) {
        
        return null;
    }

    return (
        <Modal 
            show={showModal} 
            onHide={() => setShowModal(false)}
            dialogClassName="modal-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Contratação de {selectedArtist.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row align-items-center">
                    <div className="col-md-6 d-flex justify-content-center">
                        <img src={selectedArtist.image} className="mb-3" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '20px' }} />
                    </div>
                    <div className="col-md-6">
                        <Form onSubmit={handleSubmit}>                    
                            <input type="hidden" name="img" value={selectedArtist.image} />
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
                            <div className="d-flex justify-content-center mt-2"> 
                                <Button variant="success" type="submit" className='mt-3'>
                                    Enviar Contratação
                                </Button>
                            </div>
                        </Form>
                    </div>
                    

                </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f8f9fa' }}>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Fechar</Button>
            </Modal.Footer>
        </Modal>

    );
}


export default ContractModal;
