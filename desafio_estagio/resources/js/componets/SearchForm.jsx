import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

function SearchForm({ setSearchQuery, search }) {
    const handleSearch = () => {
        // Chama a função de pesquisa passada como propriedade
        search();
    };

    const handleKeyDown = (event) => {
        // Verifica se a tecla pressionada é a tecla Enter (código 13)
        if (event.key === 'Enter') {
            // Chama a função de pesquisa ao pressionar Enter
            search();
        }
    };

    return (
        <InputGroup className="mb-3" size='lg'>
            <FormControl
                placeholder="Buscar artistas"
                type='input'
                onChange={event => setSearchQuery(event.target.value)}
                onKeyDown={handleKeyDown} // Adiciona o evento onKeyDown
            />
            <Button onClick={handleSearch} variant="success"> Buscar</Button>
        </InputGroup>
    );
}

export default SearchForm;
