import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Button, Modal, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import SearchForm from './SearchForm';
import ArtistCard from './ArtistCard';
import ContractModal from './ContractModal';
import CustomNavbar from './Navbar';
import HeroSection from './HeroSection';
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
    const [loading, setLoading] = useState(false); 
    const [addSuccessMessage, setAddSuccessMessage] = useState('');

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
            setLoading(true);

             // Inicia o carregamento
            setTimeout(() => {
                setArtistResults([
                    { id: '1', name: 'Artista 1', image: 'https://via.placeholder.com/150' },
                    { id: '2', name: 'Artista 2', image: 'https://via.placeholder.com/150' },
                    { id: '3', name: 'Artista 3', image: 'https://via.placeholder.com/150' },
                    { id: '4', name: 'Artista 4', image: 'https://via.placeholder.com/150' },
                ]);
                setLoading(false); // Finaliza o carregamento
            }, 2000); // Simula um atraso de 2 segundos
        }
    }, [searchQuery]);

    async function search() {
        setLoading(true); // Inicia o carregamento
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
            setLoading(false); // Finaliza o carregamento
        } catch (error) {
            console.error('Error ao fazer a solicitação:', error);
            setLoading(false); // Finaliza o carregamento em caso de erro
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
            setAddSuccessMessage('Contratação adicionada com sucesso!');
        } catch (error) {
            console.error('Error ao enviar a contratação:', error);
            setAddSuccessMessage('Erro ao adicionar a contratação: ' + error.message);
        }
        setShowModal(false);
    }
    // Dentro do manipulador handleLogin
// Dentro do manipulador handleLogin
    function handleLogin(username, password) {
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
                    setTimeout(() => { // Adiciona um atraso antes de limpar a mensagem de sucesso
                        setSuccessMessage('');
                    }, 3000); // Atraso de 3 segundos
                }
            })
            .catch(error => {
                console.error('Erro ao fazer login:', error);
                setSuccessMessage('Erro ao fazer login: ' + error.message); // Exibe o erro detalhado
                setTimeout(() => { // Adiciona um atraso antes de limpar a mensagem de sucesso
                    setSuccessMessage('');
                }, 3000); // Atraso de 3 segundos
            });
    }

    // Função para lidar com o logout
    function handleLogout() {
        // Definir o estado 'loggedIn' como falso ao fazer logout
        setLoggedIn(false);
    }

    return (
        <Container fluid>
            {/* Barra de navegação personalizada */}
            <CustomNavbar 
                handleLogin={() => setLoginModalShow(true)} 
                loggedIn={loggedIn} 
                handleLogout={handleLogout} 
                showMyClientsButton={loggedIn}
                handleMyClientsClick={() => setShowModal(true)}
            /> 
            {/* Conteúdo */}
            <section id="hero" style={{ width: '100%', backgroundColor: 'black', position: 'relative', padding: '120px 0 0 0' }}>
                
                <div className="container">
                    <div className="row justify-content-between mb-4">
                        <div className="col-lg-7 pt-5 pt-lg-0 order-2 order-lg-1 d-flex align-items-center">
                            <div data-aos="zoom-out">
                                <h1 style={{ margin: '0 0 20px 0', fontSize: '48px', fontWeight: 700, lineHeight: '56px', color: '#ffffff' }}>Contrate um Cantor</h1>
                                <h2 style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '40px', fontSize: '24px' }}>Encante seu público com músicas cativantes e performances emocionantes.</h2>
                                <div className="text-center text-lg-start">
                                    <a href="#" className="btn-get-started scrollto" style={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 500, fontSize: '16px', letterSpacing: '1px', display: 'inline-block', padding: '10px 30px', borderRadius: '40px', transition: '0.5s', color: '#fff', background: '#ff4500' }}>Contrate Agora!</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 order-1 order-lg-2 hero-img " data-aos="zoom-out" data-aos-delay="300">
                            <img src="https://img.freepik.com/fotos-gratis/cantor-negro-apaixonado-se-apresentando-contra-o-vermelho_1258-26348.jpg?w=1380&t=st=1712622504~exp=1712623104~hmac=bc9af2074f2c9104203cb0cca3801bf86c0315836640d42a1731cb01237a528c" className="img-fluid mb-5" alt="" style={{ marginRight: '-30px',borderRadius:'20px',}} />
                        </div>
                    </div>
                </div>
                <Container>
                    {loggedIn && (
                        <>
                            <SearchForm setSearchQuery={setSearchQuery} search={search} />
                            {/* Exibir o Spinner enquanto os artistas estão sendo carregados */}
                            {loading ? (
                                <div className="d-flex justify-content-center mt-5">
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
                <svg className="hero-waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
                    <defs>
                        <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="wave1">
                        <use xlinkHref="#wave-path" x="50" y="3" fill="rgba(255,255,255, .1)" />
                    </g>
                    <g className="wave2">
                        <use xlinkHref="#wave-path" x="50" y="0" fill="rgba(255,255,255, .2)" />
                    </g>
                    <g className="wave3">
                        <use xlinkHref="#wave-path" x="50" y="9" fill="#fff" />
                    </g>
                </svg>
            </section>
            <footer id="footer">
                <div class="container">
                    <div class="copyright">
                    &copy; Copyright <strong><span id="ar">FelipeEliasSoares</span></strong>. All Rights Reserved
                    </div>
                    <div class="credits">
                    Designed by <a href="https://github.com/FelipeEliasSoares/Trabalho_Desenvolvimento_Web_2" id="ar">FelipeEliasSoares</a>
                    </div>
                </div>
            </footer>
        </Container>
    );
    
    
}
    

const root = document.getElementById('app');
createRoot(root).render(<App />);
