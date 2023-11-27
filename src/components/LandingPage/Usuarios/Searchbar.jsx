import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Enviar el término de búsqueda al componente padre
        handleSearch(searchText);
    };

    return (
        <div className=''>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder='Busca tu usuario aquí' 
                    type='search' 
                    value={searchText}
                    onChange={handleInputChange}
                />
                <button type='submit'>Buscar 🔍</button>
            </form>
        </div>
    );
};

export default SearchBar;
