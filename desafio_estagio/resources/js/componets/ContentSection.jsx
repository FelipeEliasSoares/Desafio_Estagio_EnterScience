import React from 'react';
import { Container, Row, Modal, Button, Form, Spinner } from 'react-bootstrap';
import ArtistCard from './ArtistCard';
import ContractModal from './ContractModal';
import SearchForm from './SearchForm';
import '../../css/ContentSection.css'; 

const ContentSection = ({
    loggedIn,
    loading,
    artistResults,
    showModal,
    setShowModal,
    selectedArtist,
    formData,
    handleInputChange,
    handleSubmit,
    addSuccessMessage,
    setAddSuccessMessage,
    loginModalShow,
    setLoginModalShow,
    username,
    setUsername,
    password,
    setPassword,
    successMessage,
    setSuccessMessage,
    handleLogin,
    handleSelectArtist,
    setSearchQuery,
    search
}) => {
    return (
        <Container>
            {loggedIn && (
                <>
                    <SearchForm setSearchQuery={setSearchQuery} search={search} />
                    {/* Spinner */}
                    {loading ? (
                        <div className="spinner-container">
                            <Spinner animation="border" role="status">
                                <span className="sr-only"></span>
                            </Spinner>
                        </div>
                    ) : (
                        <Row className="mx-2 row-cols-4">
                            {artistResults.map(artist => (
                                <ArtistCard key={artist.id} artist={artist} handleSelectArtist={handleSelectArtist} />
                            ))}
                        </Row>
                    )}
                    <ContractModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        selectedArtist={selectedArtist}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />
                </>
            )}
            <Modal show={addSuccessMessage !== ''} onHide={() => setAddSuccessMessage('')}>
                <Modal.Header closeButton>
                    <Modal.Title>{addSuccessMessage.includes('sucesso') ? 'Sucesso!' : 'Falha!'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{addSuccessMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setAddSuccessMessage('')}>Fechar</Button>
                </Modal.Footer>
            </Modal>
            {/* Modal de login */}
            <Modal show={loginModalShow} onHide={() => setLoginModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setLoginModalShow(false)}>Close</Button>
                    <Button variant="success" onClick={() => handleLogin(username, password)}>Login</Button>
                </Modal.Footer>
            </Modal>
            {/* Modal de sucesso ou falha no login */}
            <Modal show={successMessage !== '' && successMessage !== 'Login bem-sucedido!'} onHide={() => setSuccessMessage('')}>
                <Modal.Header closeButton>
                    <Modal.Title>Falha ao fazer login!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {successMessage !== 'Login bem-sucedido!' && (
                        <p>Ocorreu um erro ao fazer login. Por favor, verifique suas credenciais e tente novamente.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setSuccessMessage('')}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ContentSection;
