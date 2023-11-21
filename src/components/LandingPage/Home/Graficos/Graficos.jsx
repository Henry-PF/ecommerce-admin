import React, { useEffect } from "react";
import SideBar from "./SideBar";
import styles from "./Graficos.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { connect, useDispatch } from "react-redux";
import { getAllUsers, deleteUsers } from "../../../../Redux/actions";
import Row from "./tableRow/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function Graficos(props) {
    const dispatch = useDispatch();
    const usersToMap = props.AllUsers;
    let totalUsers = 0;

    const inactivos = usersToMap.filter((user) => user.statud.id !== 1);

    const countUsers = usersToMap.map(() => {
        return (totalUsers += 1);
    });

    const [show, setShow] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState({});

    const deleteOnClick = (id) => {
        dispatch(deleteUsers(id));
        dispatch(getAllUsers());
        alert("usuario borrado");
    };

    const handleClose = () => setShow(false);

    const handleChange = (event) => {
        setSelectedUser({
            ...selectedUser,
            [event.target.name]: event.target.value,
        });
    };
    const handleSaveChange = async () => {
        console.log(selectedUser);
        try {
            const data = await axios.post(
                "http://localhost:3002/api/usuarios/update",
                selectedUser
            );
            if (data.status === 200) {
                console.log(data);
                Swal.fire({
                    title: "Usuario actualizado",
                    icon: "success",
                });
                setShow(false);
            } else {
                Swal.fire({
                    title: data.message,
                    icon: "error",
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateOnClick = (ruteId) => {
        const selectedUser = usersToMap?.find((ruta) => ruta.id === ruteId);
        setSelectedUser(selectedUser);
        console.log(selectedUser);
        setShow(true);
    };

    useEffect(() => {
        dispatch(getAllUsers());
    }, [show]);
    return (
        <div className="flex">
            <div className="wrapper">
                {/* Main Sidebar Container */}
                <SideBar></SideBar>
                {/* Content Wrapper. Contains page content */}
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6"></div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right"></ol>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* /.content */}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Modificar {selectedUser.usuario}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form action="" className={styles.form}>
                                <FloatingLabel
                                    controlId="floatingPassword"
                                    label="Nombre"
                                    className="w-100"
                                >
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        /* placeholder="Nombre" */
                                        name="nombre"
                                        value={selectedUser.nombre}
                                        placeholder={
                                            selectedUser?.persona?.nombre
                                        }
                                        onChange={(event) =>
                                            handleChange(event)
                                        }
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingPassword"
                                    label="Apellido"
                                    className="w-100"
                                >
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        /* placeholder="Apellido" */
                                        name="apellido"
                                        value={selectedUser.apellido}
                                        placeholder={
                                            selectedUser?.persona?.apellido
                                        }
                                        onChange={(event) =>
                                            handleChange(event)
                                        }
                                        required
                                    />
                                </FloatingLabel>

                                <FloatingLabel
                                    controlId="floatingPassword"
                                    label="Telefono"
                                    className="w-100 me-2"
                                >
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        /* placeholder="Telefono" */
                                        name="telefono"
                                        value={selectedUser.telefono}
                                        placeholder={
                                            selectedUser?.persona?.telefono
                                        }
                                        onChange={(event) =>
                                            handleChange(event)
                                        }
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingPassword"
                                    label="Direccion"
                                    className="w-100 me-2"
                                >
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        /* placeholder="direccion" */
                                        name="direccion"
                                        value={selectedUser.direccion}
                                        placeholder={
                                            selectedUser?.persona?.direccion
                                        }
                                        onChange={(event) =>
                                            handleChange(event)
                                        }
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingPassword"
                                    label="Dni"
                                    className="w-100 me-2"
                                >
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        /* placeholder="dni" */
                                        name="dni"
                                        value={selectedUser.dni}
                                        placeholder={selectedUser?.persona?.dni}
                                        onChange={(event) =>
                                            handleChange(event)
                                        }
                                        required
                                    />
                                </FloatingLabel>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleSaveChange}
                            >
                                Guardar Cambios
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className={styles.divContenido}>
                        <div className="container-fluid row">
                            <div className="col-lg-4 m-auto">
                                {/* small card */}
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>{totalUsers}</h3>
                                        <p className="fw-semibold">
                                            Usuarios Registrados
                                        </p>
                                    </div>
                                    <div className="icon">
                                        <i className="fas fa-user-plus" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 m-auto">
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h3>{inactivos.length}</h3>
                                        <p className="fw-semibold">
                                            Usuarios inactivos
                                        </p>
                                    </div>
                                    <div className="icon">
                                        <i className="fas fa-user-plus" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="content">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">
                                                    Lista de usuarios
                                                    Registrados
                                                </h3>
                                            </div>
                                            {/* /.card-header */}
                                            <div className="card-body">
                                                <table
                                                    id="example2"
                                                    className="table table-bordered table-hover"
                                                >
                                                    <thead>
                                                        <tr className="text-center">
                                                            <th>Usuario</th>
                                                            <th>Estado</th>
                                                            <th>Rango</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {usersToMap.map(
                                                            (
                                                                usuario,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <Row
                                                                        key={
                                                                            index
                                                                        }
                                                                        usuario={
                                                                            usuario
                                                                        }
                                                                        updateOnClick={
                                                                            updateOnClick
                                                                        }
                                                                        deleteOnClick={
                                                                            deleteOnClick
                                                                        }
                                                                    />
                                                                );
                                                            }
                                                        )}
                                                    </tbody>
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
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        AllUsers: state.users,
    };
};

export default connect(mapStateToProps, null)(Graficos);
