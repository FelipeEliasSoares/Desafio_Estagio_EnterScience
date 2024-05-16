import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Button, Modal, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import CustomNavbar from './Navbar';
import Footer from './Footer';
import ContentSection from './ContentSection';
import HeroSection from './HeroSection';
import '../../css/app.css';


//const CLIENT_ID = import.meta.env.SPOTIFY_CLIENT_ID;
//const CLIENT_SECRET = import.meta.env.SPOTIFY_CLIENT_SECRET;

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
        img: '',
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
    const [loading, setLoading] = useState(false); 
    const [addSuccessMessage, setAddSuccessMessage] = useState('');

     // Fetches the access token from Spotify API using client credentials
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

    // Loads default artist results if no search query is provided
    useEffect(() => {
        if (!searchQuery) {
            setLoading(true);

             
            setTimeout(() => {
                setArtistResults([
                    { id: '1', name: 'David Guetta', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/2023-11-16_Gala_de_los_Latin_Grammy%2C_22_%28David_Guetta%29.jpg' },
                    { id: '2', name: 'Marshmello', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgbGGwaAm0PCpVka58ITZtA_A50kYeJQ9BXvykPuu_TQ&s' },
                    { id: '3', name: '50 cent', image: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8436dcd268872e695ce116428c' },
                    { id: '4', name: 'Gusttavo Lima', image: 'https://www.pida.com.br/fotos/pida_noticias/3680/IMAGEM_INTERNA_0.jpg?v=89e1fd0142714bd' },
                ]);
                setLoading(false); 
            }, 2000); 
        }
    }, [searchQuery]);

    // Performs a search for artists using the provided search query
    async function search() {
        setLoading(true); 
        var artistParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=artist`, artistParameters);
            console.log('Resposta da solicitação:', response);
            if (!response.ok) {
                throw new Error('Error ao buscar artistas');
            }
            const responseData = await response.json();
            setArtistResults(responseData.artists.items.map(artist => ({
                id: artist.id,
                name: artist.name,
                image: artist.images.length > 0 ? artist.images[0].url : null
            })));
            setLoading(false); 
        } catch (error) {
            console.error('Error ao fazer a solicitação:', error);
            setLoading(false); 
        }
    }

    // Sets the selected artist and updates the form data accordingly
    function handleSelectArtist(artist) {
        setSelectedArtist(artist);
        
        setFormData({ ...formData, artist: artist.name });
        setShowModal(true);
    }

     // Handles input change events and updates the form data
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            // Atualize o formData com a imagem selecionada
            const updatedFormData = { ...formData, img: selectedArtist.image };
            console.log('Dados enviados para hire-artist:', updatedFormData); 
            
            const response = await axios.post('http://localhost:8000/hire-artist', updatedFormData);
            console.log(response.data);
            setAddSuccessMessage('Contratação adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar a contratação:', error);
            if (error.response && error.response.status === 402) {
                setAddSuccessMessage('Artista indisponível para esta data.');
            } else {
                setAddSuccessMessage('Erro ao adicionar a contratação: ' + error.message);
            }
        }
        setShowModal(false);
    }
    

    // Handles user login by sending login credentials to the backend API
    function handleLogin(username, password) {
        axios.post('http://localhost:8000/login', { email: username, password: password })
            .then(response => {
                console.log('Resposta do backend:', response); 
                // Verifica se a resposta é bem-sucedida
                if (response.status === 200) {
                    
                    setLoggedIn(true);
                    setSuccessMessage('Login bem-sucedido!');
                    setLoginModalShow(false); 
                } else {
                    
                    setSuccessMessage('');
                    setTimeout(() => { 
                        setSuccessMessage('');
                    }, 3000); 
                }
            })
            .catch(error => {
                console.error('Erro ao fazer login:', error);
                setSuccessMessage('Erro ao fazer login: ' + error.message); o
                setTimeout(() => { 
                }, 3000); 
            });
    }

    // Logs the user out by setting the 'loggedIn' state to false
    function handleLogout() {
       
        setLoggedIn(false);
    }

    return (
        <Container fluid>
            {/* Custom navigation bar*/}
            <CustomNavbar 
                handleLogin={() => setLoginModalShow(true)} 
                loggedIn={loggedIn} 
                handleLogout={handleLogout} 
                showMyClientsButton={loggedIn}
                handleMyClientsClick={() => setShowModal(true)}
            /> 
            {/* Content */}
            <section id="hero" style={{ width: '100%', backgroundColor: 'black', position: 'relative', padding: '100px 0 150px 0', minHeight: 'calc(100vh - 200px)' }}>
                

                    {/* Hero Section */}
                    <HeroSection 
                        loggedIn={loggedIn}
                        artistResults={artistResults}
                        handleSelectArtist={handleSelectArtist}
                        setLoginModalShow={setLoginModalShow}
                    />       
                    {/* Content */}
                    <ContentSection 
                    loggedIn={loggedIn}
                    loading={loading}
                    artistResults={artistResults}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    selectedArtist={selectedArtist}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    addSuccessMessage={addSuccessMessage}
                    setAddSuccessMessage={setAddSuccessMessage}
                    loginModalShow={loginModalShow}
                    setLoginModalShow={setLoginModalShow}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    successMessage={successMessage}
                    setSuccessMessage={setSuccessMessage}
                    handleLogin={handleLogin}
                    handleSelectArtist={handleSelectArtist}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    search={search}
            />
            </section>
            <Footer />
        </Container>
    );
    
    
}
    

const root = document.getElementById('app');
createRoot(root).render(<App />);
