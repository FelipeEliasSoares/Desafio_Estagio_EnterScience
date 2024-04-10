import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

function SearchForm({ setSearchQuery, search }) {
    const handleSearch = () => {
        // Chama a função de pesquisa passada como propriedade
        search();
    };

    return (
        <InputGroup className="mb-3" size='lg'>
            <FormControl
                placeholder="Buscar artistas"
                type='input'
                onChange={event => setSearchQuery(event.target.value)}
            />
            <Button onClick={handleSearch}>Buscar</Button>
        </InputGroup>
    );
}

export default SearchForm;
