import React, { useEffect, useState } from "react";
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
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Busqueda from "../../../Busqueda/Busqueda";
import { searchData } from "../../../../Redux/actions";

const url = "https://backend-dev-jnpc.1.us-1.fl0.io/api";

function Graficos(props) {
    const dispatch = useDispatch();
    const usersToMap = props.AllUsers;
    const inactiveUsers = props.Inactive;
    const data = props.DataUser;
    let totalUsers = 0;

    const inactivos = usersToMap.filter((user) => user.statud.id !== 1);

    const countUsers = usersToMap.map(() => {
        return (totalUsers += 1);
    });

    const [show, setShow] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState({});

    const deleteOnClick = (id) => {
        const selectedUser = usersToMap?.find((user) => user.id === id);
        const estado = selectedUser.statud.id !== 1 ? 1 : 2;
        const idUser = {
            id: id,
            id_status: estado,
        };
        try {
            Swal.fire({
                title: "Esta Seguro?",
                text: `${estado !== 1 ? "Desactivar" : "Activar"} a ${
                    selectedUser.usuario
                }`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(deleteUsers(idUser));
                    /* dispatch(getAllUsers()); */
                    Swal.fire(
                        `Usuario ${estado !== 1 ? "desactivado" : "activado"}!`,
                        "success"
                    ).then(() => {
                        window.location.reload();
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => setShow(false);

    const handleChange = (event) => {
        setSelectedUser({
            ...selectedUser,
            [event.target.name]: event.target.value,
        });
    };
    const handleSaveChange = async () => {
        try {
            const data = await axios.post(
                `${url}/usuarios/update`,
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
        setShow(true);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    //let visible = usersToMap?.slice(startIndex, endIndex);
    let visible = data?.slice(startIndex, endIndex);
    console.log("users:", data);

    const renderPageButtons = () => {
        const totalPages = Math.ceil((usersToMap?.length || 0) / itemsPerPage);

        const buttons = [];
        for (let page = 1; page <= totalPages; page++) {
            buttons.push(
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={
                        currentPage === page
                            ? styles.btn_active
                            : styles.btn_pagination
                    }
                >
                    {page}
                </button>
            );
        }

        return buttons;
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
                                Info de {selectedUser.usuario}
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
                                        placeholder="Nombre"
                                        name="nombre"
                                        value={selectedUser?.persona?.nombre}
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
                                        placeholder="Apellido"
                                        name="apellido"
                                        value={selectedUser?.persona?.apellido}
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
                                        placeholder="Telefono"
                                        name="telefono"
                                        value={selectedUser?.persona?.telefono}
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
                                        placeholder="direccion"
                                        name="direccion"
                                        value={selectedUser?.persona?.direccion}
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
                                        placeholder="dni"
                                        name="dni"
                                        value={selectedUser?.persona?.dni}
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
                                        <p className="fw-semibold text-light">
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
                                        <p className="fw-semibold text-light">
                                            Usuarios Inactivos
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
                                                <h2 className="text-center">
                                                    Lista de usuarios
                                                    Registrados
                                                </h2>
                                            </div>
                                            {/* /.card-header */}
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between py-2">
                                                    <div className="pagination mb-1">
                                                        <button
                                                            className={
                                                                styles.btn_pagination
                                                            }
                                                            onClick={() =>
                                                                handlePageChange(
                                                                    currentPage -
                                                                        1
                                                                )
                                                            }
                                                            disabled={
                                                                currentPage ===
                                                                1
                                                            }
                                                        >
                                                            <BsArrowLeft
                                                                className={
                                                                    styles.btn_icon
                                                                }
                                                            />
                                                        </button>

                                                        {renderPageButtons()}

                                                        <button
                                                            className={
                                                                styles.btn_pagination
                                                            }
                                                            onClick={() =>
                                                                handlePageChange(
                                                                    currentPage +
                                                                        1
                                                                )
                                                            }
                                                            disabled={
                                                                endIndex >=
                                                                (usersToMap?.length ||
                                                                    0)
                                                            }
                                                        >
                                                            <BsArrowRight
                                                                className={
                                                                    styles.btn_icon
                                                                }
                                                            />
                                                        </button>
                                                    </div>
                                                    <Busqueda
                                                        despachar={searchData}
                                                    ></Busqueda>
                                                    {/* <div className="filter">
                                                        <label htmlFor="">
                                                            <input
                                                                type="checkbox"
                                                                name=""
                                                                id=""
                                                                className="mx-1"
                                                            />
                                                            Admin
                                                        </label>
                                                    </div> */}
                                                </div>
                                                <table
                                                    id="example2"
                                                    className="table table-bordered table-hover"
                                                >
                                                    <thead>
                                                        <tr className="text-center">
                                                            <th>Usuario</th>
                                                            <th>Estado</th>
                                                            <th>Rango</th>
                                                            <th>Info</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {visible?.map(
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
        Inactive: state.inactiveUsers,
        DataUser: state.data,
    };
};

export default connect(mapStateToProps, null)(Graficos);
