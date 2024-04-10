// App.js
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import SearchForm from './SearchForm';
import ArtistCard from './ArtistCard';
import ContractModal from './ContractModal';
import CustomNavbar from './Navbar';
import '/opt/lampp/htdocs/Desafio_Estagio/desafio_estagio/resources/css/app.css';

const CLIENT_ID = "20c085fee3c645afb8047ecd27833b1e"
const CLIENT_SECRET = "a259f3b59fe44e5392682519c1826616"

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [access_token, setAccessToken] = useState('');
    const [artistResults, setArtistResults] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        artist: '',
        fee: '',
        eventDate: '',
        address: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginModalShow, setLoginModalShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);


    useEffect(() => {
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        }

        fetch(`https://accounts.spotify.com/api/token`, authParameters)
            .then(response => response.json())
            .then(data => setAccessToken(data.access_token))
            .catch(error => console.error('Error ao obter o token de acesso:', error));
    }, []);

    useEffect(() => {
        if (!searchQuery) {
            // Simulação de resultados baseados em tendências, relevância, em alta
            setArtistResults([
                { id: '1', name: 'Artista 1', image: 'https://via.placeholder.com/150' },
                { id: '2', name: 'Artista 2', image: 'https://via.placeholder.com/150' },
                { id: '3', name: 'Artista 3', image: 'https://via.placeholder.com/150' },
                { id: '4', name: 'Artista 4', image: 'https://via.placeholder.com/150' },
            ]);
        }
    }, [searchQuery]);

    async function search() {
        var artistParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=artist`, artistParameters);
            if (!response.ok) {
                throw new Error('Error ao buscar artistas');
            }
            const responseData = await response.json();
            setArtistResults(responseData.artists.items.map(artist => ({
                id: artist.id,
                name: artist.name,
                image: artist.images.length > 0 ? artist.images[0].url : null
            })));
        } catch (error) {
            console.error('Error ao fazer a solicitação:', error);
        }
    }

    function handleSelectArtist(artist) {
        setSelectedArtist(artist);
        // Atualizar o campo 'artist' do estado formData com o nome do artista selecionado
        setFormData({ ...formData, artist: artist.name });
        setShowModal(true);
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            console.log('Dados enviados para hire-artist:', formData); // Adiciona esta linha para exibir os dados no console
            const response = await axios.post('http://localhost:8000/hire-artist', formData);
            console.log(response.data);
            setSuccessMessage(response.data.message);
        } catch (error) {
            console.error('Error ao enviar a contratação:', error);
        }
        setShowModal(false);
    }
    // Função para lidar com o login
    function handleLogin(username, password) {
        // Enviar solicitação de login para o backend Laravel
        axios.post('http://localhost:8000/login', { email: username, password: password })
            .then(response => {
                console.log('Resposta do backend:', response); // Verifica o conteúdo da resposta
                // Verifica se a resposta é bem-sucedida
                if (response.status === 200) {
                    // Login bem-sucedido
                    setLoggedIn(true);
                    setSuccessMessage('Login bem-sucedido!');
                    setLoginModalShow(false); // Fechar o modal de login
                } else {
                    // Credenciais inválidas
                    setSuccessMessage('');
                }
            })
            .catch(error => {
                console.error('Erro ao fazer login:', error);
                setSuccessMessage('Erro ao fazer login: ' + error.message); // Exibe o erro detalhado
            });
    }

    // Função para lidar com o logout
    function handleLogout() {
        // Definir o estado 'loggedIn' como falso ao fazer logout
        setLoggedIn(false);
    }



    return (
        <Container>
            {/* Barra de navegação personalizada */}
            <CustomNavbar 
                handleLogin={() => setLoginModalShow(true)} 
                loggedIn={loggedIn} 
                handleLogout={handleLogout} 
                showMyClientsButton={loggedIn}
                handleMyClientsClick={() => setShowModal(true)} // Corrigido para handleMyClientsClick
            />
            
            {/* Conteúdo */}
            {loggedIn && (
                <>
                    <h1>Contratação de Artistas</h1>
                    <SearchForm setSearchQuery={setSearchQuery} search={search} />
                    
                    <Row className="mx-2 row-cols-4">
                        {artistResults.map(artist => (
                            <ArtistCard key={artist.id} artist={artist} handleSelectArtist={handleSelectArtist} />
                        ))}
                    </Row>
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
                    <Button variant="secondary" onClick={() => setLoginModalShow(false)}>Close</Button>
                    <Button variant="primary" onClick={() => handleLogin(username, password)}>Login</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de sucesso ou falha no login */}
            <Modal show={successMessage !== ''} onHide={() => setSuccessMessage('')}>
                <Modal.Header closeButton>
                    <Modal.Title>{successMessage === 'Login bem-sucedido!' ? 'Login bem-sucedido!' : 'Falha ao fazer login!'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {successMessage === 'Login bem-sucedido!'
                        ? 'Seu login foi bem-sucedido. Agora você pode acessar todas as funcionalidades do aplicativo.'
                        : 'Ocorreu um erro ao fazer login. Por favor, verifique suas credenciais e tente novamente.'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setSuccessMessage('')}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
    

const root = document.getElementById('app');
createRoot(root).render(<App />);
