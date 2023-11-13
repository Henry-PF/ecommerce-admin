import React, { useEffect } from 'react'
import SideBar from './SideBar';
import styles from "./Graficos.module.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import { connect, useDispatch } from 'react-redux';
import { getAllUsers, deleteUsers } from '../../../../Redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function Graficos(props) {
    const dispatch = useDispatch();
    const usersToMap = props.AllUsers;
    let totalUsers = 0;
    const countUsers = usersToMap.map(() => { return totalUsers += 1 });

    const [show, setShow] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState({
    });



    const deleteOnClick = (id) => {
        if (id.id_status === 1) {
            const dataToSend = { "id": id.id }
            dispatch(deleteUsers(dataToSend));
            dispatch(getAllUsers());
        }
        else {
            const dataToSend = { "id": id.id }
            dispatch(deleteUsers(dataToSend));
            dispatch(getAllUsers());
        }
    }

    const handleClose = () => setShow(false);

    const handleChange = (event) => {
        setSelectedUser({
            ...selectedUser,
            [event.target.name]: event.target.value,
        })
    }
    const handleSaveChange = async () => {
        try {
            console.log(selectedUser);
            const data = await axios.post('https://api-54nh.onrender.com/usuarios/update', selectedUser);
            if (data.status === 200) {
                Swal.fire({
                    title: data.data.message,
                    icon: 'success'
                })
                setShow(false);
            } else {
                Swal.fire({
                    title: data.data.message,
                    icon: 'error'
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    const updateOnClick = (ruteId) => {
        const selectedUser = usersToMap?.find((ruta) => ruta.id === ruteId);
        setSelectedUser(selectedUser.dato);
        setShow(true);
        console.log(selectedUser);
    }

    useEffect(() => {
        dispatch(getAllUsers());
    }, [show])
    return (
        <div className='flex'>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>AdminLTE 3 | General Form Elements</title>
            {/* Google Font: Source Sans Pro */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback" />
            {/* Font Awesome */}
            <link rel="stylesheet" href="../../plugins/fontawesome-free/css/all.min.css" />
            {/* Theme style */}
            <link rel="stylesheet" href="../../dist/css/adminlte.min.css" />
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
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* /.content */}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modificar Bus</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form action="" className={styles.form}>
                                <FloatingLabel controlId="floatingPassword" label="Nombre" className="w-100">
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        placeholder="Nombre"
                                        name='nombre'
                                        value={selectedUser.nombre}
                                        onChange={(event) => handleChange(event)}
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Apellido" className="w-100">
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        placeholder="Apellido"
                                        name='apellido'
                                        value={selectedUser.apellido}
                                        onChange={(event) => handleChange(event)}
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Correo" className="w-100 me-2">
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        placeholder="Correo"
                                        name='correo'
                                        value={selectedUser.correo}
                                        onChange={(event) => handleChange(event)}
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Telefono" className="w-100 me-2">
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        placeholder="Telefono"
                                        name='telefono'
                                        value={selectedUser.telefono}
                                        onChange={(event) => handleChange(event)}
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Direccion" className="w-100 me-2">
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        placeholder="direccion"
                                        name='direccion'
                                        value={selectedUser.direccion}
                                        onChange={(event) => handleChange(event)}
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Dni" className="w-100 me-2">
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        placeholder="dni"
                                        name='dni'
                                        value={selectedUser.dni}
                                        onChange={(event) => handleChange(event)}
                                        required
                                    />
                                </FloatingLabel>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                            <Button variant="primary" onClick={handleSaveChange}>
                                Guardar Cambios
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className={styles.divContenido}>
                        <div className='container-fluid row'>
                            <div className="col-lg-3">
                                {/* small card */}
                                <div className="small-box bg-warning">
                                    <div className="inner">
                                        <h3>{totalUsers}</h3>
                                        <p>User Registrations</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fas fa-user-plus" />
                                    </div>
                                    <a href="#" className="small-box-footer">
                                        <i className="fas" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <section className="content">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Lista de usuarios Registrados</h3>
                                            </div>
                                            {/* /.card-header */}
                                            <div className="card-body">
                                                <table id="example2" className="table table-bordered table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Nombre</th>
                                                            <th>Mail</th>
                                                            <th>Status</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    {usersToMap.map((usuario) => {
                                                        return <tbody>
                                                            <tr>
                                                                <td>{usuario.dato.nombre}</td>
                                                                <td>{usuario.dato.correo}</td>
                                                                <td>{usuario.statud.nombre}</td>
                                                                <td className={styles.td}><button className={styles.button} onClick={() => updateOnClick(usuario.id)}><FontAwesomeIcon icon={faPencil} style={{ color: "#a1a1a1cc", }} />
                                                                </button></td>
                                                                <td className={styles.td}><button className={styles.button} onClick={() => {
                                                                    const idUser = { "id": usuario.id, "id_status": usuario.statud.id };
                                                                    return deleteOnClick(idUser)
                                                                }}><FontAwesomeIcon icon={faTrash} style={{ color: "#dd3636", }} />
                                                                </button></td>
                                                            </tr>
                                                        </tbody>
                                                    })}
                                                </table>
                                            </div>
                                            {/* /.card-body */}
                                        </div>
                                        {/* /.card */}
                                    </div>
                                    {/* /.col */}
                                </div>
                                {/* /.row */}
                            </div>
                            {/* /.container-fluid */}
                        </section>

                    </div>
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

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        AllUsers: state.users
    };
}

export default connect(mapStateToProps, null)(Graficos)