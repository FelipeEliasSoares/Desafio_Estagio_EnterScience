import React, { useState } from 'react';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import '../../css/app.css';

function MyClientsButton() {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        img:'',
        artist: '',
        fee: '',
        eventDate: '',
        address: ''
    });

    // Function to handle clicking on the "My Contractors" button
    const handleMyClientsClick = () => {
        setLoading(true);
        axios.get('http://localhost:8000/my-clients')
            .then(response => {
                setClients(response.data);
                setLoading(false);
                setShowModal(true);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    };

    const handleRemoveClient = (id) => {
        console.log('Removendo cliente com ID:', id);
        axios.get(`http://localhost:8000/clients/${id}/delete`)
                .then(response => {
                    // Update customer list after successful removal
                    handleMyClientsClick();
                    // If the removed client was selected, deselect it
                    if (selectedRowIndex !== null && clients[selectedRowIndex].id === parseInt(id)) {
                        setSelectedRowIndex(null);
                    }
                })
                .catch(error => {
                    console.error('Erro ao remover cliente:', error);
                });
    };

    const handleEditClient = (id) => {
        // logic to fill the form with the selected customer data
        const selectedClient = clients.find(client => client.id === id);
        setFormData(selectedClient);
        setShowEditModal(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
    
            // Verifica se todos os campos necessários estão preenchidos
            if (!formData.name || !formData.fee || !formData.eventDate || !formData.address) {
                console.error('Por favor, preencha todos os campos.');
                return;
            }
    
            // Verifica se o ID do cliente está definido
            if (!formData.id) {
                console.error('ID do cliente não encontrado.');
                return;
            }
    
            console.log('Dados do formulário:', formData);
    
            // Envia os dados atualizados do cliente para o backend
            const response = await axios.put(`http://localhost:8000/clients/${formData.id}`, formData);
    
            // Verifica se a atualização foi bem-sucedida
            if (response.status === 200) {
                console.log('Cliente editado com sucesso:', response.data);
                // Atualiza a lista de clientes após a edição bem-sucedida
                handleMyClientsClick();
                // Fecha o modal de edição
                setShowEditModal(false);
            } else {
                console.error('Erro ao editar cliente:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao editar cliente:', error.message);
        }
    };
    
    

    // Function to handle clicking on a table row (selection)
    const handleRowClick = (index) => {
        setSelectedRowIndex(index === selectedRowIndex ? null : index);
    };

    return (
        <>
            <Button variant="light" onClick={handleMyClientsClick} className='mr-5'>
                Meus Contratantes
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-xl">
                <Modal.Header closeButton style={{ backgroundColor: '#343a40', color: 'white' }}>
                    <Modal.Title>Meus Contratantes</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f8f9fa' }}>
                    {loading ? (
                        <p>Carregando...</p>
                    ) : error ? (
                        <p>Ocorreu um erro: {error}</p>
                    ) : (
                        <div className="table-responsive">
                            <div className="table-responsive">
                                <Table striped bordered hover className="custom-table">
                                    <tbody>
                                        {clients.map((client, index) => (
                                            <tr key={client.id} onClick={() => handleRowClick(index)} className={selectedRowIndex === index ? 'table-primary' : ''}>
                                                <td>
                                                    <div>
                                                        <img src={client.img} alt="Imagem do cliente" style={{ width: '60px', height: '60px', borderRadius: '20px' }} />
                                                    </div>
                                                    <div>
                                                        <strong>Nome:</strong> {client.name} <br />
                                                        <strong>Artista:</strong> {client.artist} <br />
                                                        <strong>Preço:</strong> {client.fee} <br />
                                                        <strong>Data do Evento:</strong> {client.eventDate} <br />
                                                        <strong>Endereço:</strong> {client.address} <br />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-around">
                                                        <Button variant="danger"onClick={() => handleRemoveClient(client.id)}>Remover</Button>
                                                        <Button variant="primary" onClick={() => handleEditClient(client.id)}>Editar</Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#f8f9fa' }}>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Fechar</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} dialogClassName="modal-lg">
                <Modal.Header closeButton style={{ backgroundColor: '#343a40', color: 'white' }}>
                    <Modal.Title>Editação do {formData.artist}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f8f9fa' }}>
                <div className="row align-items-center">
                    <div className="col-md-6 d-flex justify-content-center">
                        <img src={formData.img} className="mb-3" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '20px' }} />
                    </div>
                    <div className="col-md-6">
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleFormChange} />
                        </Form.Group>
                        <Form.Group controlId="formFee">
                            <Form.Label>Cachê</Form.Label>
                            <Form.Control type="number" name="fee" value={formData.fee} onChange={handleFormChange} />
                        </Form.Group>
                        <Form.Group controlId="formEventDate">
                            <Form.Label>Data do Evento</Form.Label>
                            <Form.Control type="date" name="eventDate" value={formData.eventDate} onChange={handleFormChange} />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control type="text" name="address" value={formData.address} onChange={handleFormChange} />
                        </Form.Group>
                        <div className="d-flex justify-content-center mt-2"> 
                                <Button variant="primary" type="submit" className='mt-3' onClick={handleFormSubmit}>
                                    Salvar Alterações
                                </Button>
                        </div>


                    </Form>

                    </div>
                </div>
    

                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#f8f9fa' }}>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MyClientsButton;