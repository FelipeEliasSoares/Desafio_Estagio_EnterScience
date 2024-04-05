// App.js
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import SearchForm from './SearchForm';
import ArtistCard from './ArtistCard';
import ContractModal from './ContractModal';

const CLIENT_ID = "20c085fee3c645afb8047ecd27833b1e"
const CLIENT_SECRET = "a259f3b59fe44e5392682519c1826616"

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [access_token, setAccessToken] = useState('');
    const [artistResults, setArtistResults] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        artist: '', // Alteração aqui para armazenar o nome do artista selecionado
        fee: '',
        eventDate: '', // Alteração aqui para armazenar a data no formato desejado
        address: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

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
            const response = await axios.post('http://localhost:8000/hire-artist', formData);
            console.log(response.data);
            setSuccessMessage(response.data.message);
        } catch (error) {
            console.error('Error ao enviar a contratação:', error);
        }
        setShowModal(false);
    }

    return (
        <Container>
            <h1>Contratação de Artistas</h1>
            <SearchForm setSearchQuery={setSearchQuery} search={search} /> {/* Passando a função de busca como propriedade */}
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
            {successMessage && <p>{successMessage}</p>}
        </Container>
    );
}

const root = document.getElementById('app');
createRoot(root).render(<App />);
