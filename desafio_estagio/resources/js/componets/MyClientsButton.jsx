import React, { useState } from 'react';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import '/opt/lampp/htdocs/Desafio_Estagio/desafio_estagio/resources/css/app.css';

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
        artist: '',
        fee: '',
        eventDate: '',
        address: ''
    });

    // Função para lidar com o clique no botão "Meus Contratantes"
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
                    // Atualize a lista de clientes após a remoção bem-sucedida
                    handleMyClientsClick();
                    // Se o cliente removido estava selecionado, deselecione-o
                    if (selectedRowIndex !== null && clients[selectedRowIndex].id === parseInt(id)) {
                        setSelectedRowIndex(null);
                    }
                })
                .catch(error => {
                    console.error('Erro ao remover cliente:', error);
                });
    };

    const handleEditClient = (id) => {
        // Implemente a lógica para preencher o formulário com os dados do cliente selecionado
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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Dados do formulário:', formData);
        // Implemente a lógica para enviar os dados atualizados do cliente para o back-end
        axios.put(`http://localhost:8000/clients/${formData.id}`, formData)
            .then(response => {
                // Atualize a lista de clientes após a edição bem-sucedida
                handleMyClientsClick();
                // Feche o modal de edição
                setShowEditModal(false);
            })
            .catch(error => {
                console.error('Erro ao editar cliente:', error);
            });
    };
    

    // Função para lidar com o clique em uma linha da tabela (seleção)
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
                            <Table striped bordered hover className="custom-table">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Artista</th>
                                        <th>Preço</th>
                                        <th>Data do Evento</th>
                                        <th>Endereço</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients.map((client, index) => (
                                        <tr key={client.id} onClick={() => handleRowClick(index)} className={selectedRowIndex === index ? 'table-primary' : ''}>
                                            <td>{client.name}</td>
                                            <td>{client.artist}</td>
                                            <td>{client.fee}</td>
                                            <td>{client.eventDate}</td>
                                            <td>{client.address}</td>
                                            <td>
                                                <div className="d-flex justify-content-around">
                                                    <Button variant="danger" onClick={() => handleRemoveClient(client.id)}>Remover</Button>
                                                    <Button variant="primary" onClick={() => handleEditClient(client.id)}>Editar</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#f8f9fa' }}>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Fechar</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} dialogClassName="modal-lg">
                <Modal.Header closeButton style={{ backgroundColor: '#343a40', color: 'white' }}>
                    <Modal.Title>Editar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#f8f9fa' }}>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleFormChange} />
                        </Form.Group>
                        {/* Adicione mais campos de formulário conforme necessário */}
                        <Button variant="primary" type="submit">Salvar Alterações</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#f8f9fa' }}>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MyClientsButton;