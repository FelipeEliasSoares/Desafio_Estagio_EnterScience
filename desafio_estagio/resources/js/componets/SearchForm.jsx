import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

function SearchForm({ setSearchQuery, search }) {
    const handleSearch = () => {
        // Calls the search function passed as a property
        search();
    };

    const handleKeyDown = (event) => {
        // Checks if the key pressed is the Enter key 
        if (event.key === 'Enter') {
        // Calls the search function passed as a property
        search();
        }
    };

    return (
        <InputGroup className="mb-3" size='lg'>
            <FormControl
                placeholder="Buscar artistas"
                type='input'
                onChange={event => setSearchQuery(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Button onClick={handleSearch} variant="success"> Buscar</Button>
        </InputGroup>
    );
}

export default SearchForm;
