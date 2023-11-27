import React, { useState, useEffect } from 'react';
import SearchBar from './Searchbar';

const Usuarios = () => {
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    const apiUrl = 'https://api-54nh.onrender.com/usuarios';

    useEffect(() => {
        // Realizar la solicitud a la API cuando se monte el componente
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = async () => {
        try {
            const response = await fetch(apiUrl);
            if (response.ok) {
                const data = await response.json();
                setUsuariosFiltrados(data); // Establecer los usuarios en el estado
            } else {
                throw new Error('Error al obtener los usuarios');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSearch = (searchTerm) => {
        // Realizar la búsqueda local en los datos obtenidos de la API
        const filteredResults = usuariosFiltrados.filter((usuario) =>
            usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            usuario.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
            usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setUsuariosFiltrados(filteredResults);
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="sidebar col-auto px-0 min-vh-100 bg-dark">
                        <SearchBar handleSearch={handleSearch} />
                        {/* Mostrar los usuarios filtrados */}
                        <div className="user-list">
                            <h2>Usuarios</h2>
                            <ul>
                                {usuariosFiltrados.map((usuario) => (
                                    <li key={usuario.id}>
                                        <strong>Nombre:</strong> {usuario.nombre}, 
                                        <strong>Apellido:</strong> {usuario.apellido}, 
                                        <strong>Email:</strong> {usuario.email}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Usuarios;


// import React from 'react';
// // import Sidebar from '../Sidebar/Sidebar';

// const Usuarios = () => {

//     return (
//         <>
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="sidebar col-auto px-0 min-vh-100 bg-dark">
//                         {/* <Sidebar /> */}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Usuarios;

