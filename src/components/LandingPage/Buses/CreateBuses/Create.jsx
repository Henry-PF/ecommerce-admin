import React from 'react'
import SideBar from '../../Home/Graficos/SideBar'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from "./Create.module.css"
import { useState } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2';

export default function Create() {

    const [datos, setDatos] = useState({});
    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const { data } = await axios.post('https://api-54nh.onrender.com/buses/create_bus', datos)
            if (data) {
                Swal.fire(
                    'Bus Creado!',
                    'El Bus fue creado exitosamente.',
                    'success'
                ).then(() => setDatos({
                    modelo: '',
                    marca: '',
                    capacidad: '',
                    placa: '',
                    id_statud: '',
                }))
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="wrapper">
            {/* Main Sidebar Container */}
            <SideBar></SideBar>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className=''>Create</h1>
                            </div>
                        </div>
                    </div>
                </section>
                {/* /.content */}
                <section class="content-header">
                    <h1 className='text-center m-5'>Crear Colectivo</h1>
                    <Form className={styles.container} onSubmit={handleSubmit}>
                        <div className={styles.input_container}>
                            <div className={styles.input_name}>
                                <FloatingLabel controlId="floatingInput" label="Modelo" className="w-100 me-2">
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        placeholder="Modelo"
                                        name='modelo'
                                        value={datos.modelo}
                                        onChange={event => handleChange(event)}
                                    />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingInput" label="Marca" className="w-100">
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        placeholder="Marca"
                                        name='marca'
                                        value={datos.marca}
                                        onChange={event => handleChange(event)}
                                    />
                                </FloatingLabel>
                            </div>
                            <div className={styles.input_name}>
                                <FloatingLabel controlId="floatingInput" label="Capacidad" className="w-100 me-2">
                                    <Form.Control
                                        className={styles.form_input}
                                        type="number"
                                        placeholder="Capacidad"
                                        name='capacidad'
                                        value={datos.capacidad}
                                        onChange={event => handleChange(event)}
                                    />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingInput" label="Numero de Patente" className="w-100">
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        placeholder="Numero de Patente"
                                        name='placa'
                                        value={datos.placa}
                                        onChange={event => handleChange(event)}
                                    />
                                </FloatingLabel>
                            </div>

                            <div className={styles.input_name}>
                                <FloatingLabel controlId="floatingInput" label="Estado" className="w-100" >
                                    <Form.Select aria-label="Default select example" value={datos.id_statud} name='id_statud' onChange={event => handleChange(event)}>
                                        <option>Selecciones un estado</option>
                                        <option value="1">ACTIVO</option>
                                        <option value="2">INACTIVO</option>
                                    </Form.Select>
                                </FloatingLabel>

                            </div>

                            <Button className='w-100 my-4' variant="primary" type="submit" >
                                Crear Colectivo
                            </Button>
                        </div>
                    </Form>

                    <div className={styles.botonBack}>
                        <a href="/" class="btn btn-primary" role="button" data-bs-toggle="button">Volver</a>
                    </div>
                </section>

            </div>
            {/* /.content-wrapper */}
            <footer className="main-footer">

            </footer>
            {/* Control Sidebar */}
            <aside className="control-sidebar control-sidebar-dark">
                {/* Control sidebar content goes here */}
            </aside>
            {/* /.control-sidebar */}
        </div>
    )
}
