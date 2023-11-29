import React, { useState, useEffect } from "react";
import SideBar from "../../Home/Graficos/SideBar";
import styles from "./Update.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { getAllCategories, searchCategory } from "../../../../Redux/actions";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import {
    BsTrash,
    BsPencilSquare,
    BsCheckLg,
    BsArrowRight,
    BsArrowLeft,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const url = process.env.BACKEND_URL;
import Busqueda from "../../../Busqueda/Busqueda";

export default function Update() {
    const [show, setShow] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();
    const companies = useSelector((state) => state.companies);
    const categories = useSelector((state) => state.categories);

    const handleClose = () => setShow(false);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleClickEdit = (companyId) => {
        const selectedCompany = companies?.find(
            (company) => company.id === companyId
        );
        setSelectedCompany(selectedCompany);
        setShow(true);
    };

    const handleChange = (event, field) => {
        setSelectedCompany({
            ...selectedCompany,
            [field]: {
                ...selectedCompany[field],
                [event.target.name]: event.target.value,
            },
        });
    };

    const handleSaveChanges = async () => {
        try {
            const data = await axios.post(
                `${url}/categorias/update`,
                selectedCompany
            );
            console.log(data);
            if (data.status === 200) {
                Swal.fire({
                    title: data.data.message,
                    icon: "success",
                });
                setShow(false);
            } else {
                Swal.fire({
                    title: data.data.message,
                    icon: "error",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        const selectedCompany = companies?.find((company) => company.id === id);
        const idCategoria = {
            id: selectedCompany.id,
            id_statud: 2,
        };
        console.log(selectedCompany);
        try {
            Swal.fire({
                title: "Esta Seguro?",
                text: "Desactivar esta categoria",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si",
            }).then((result) => {
                if (result.isConfirmed) {
                    const { data } = axios.post(
                        `${url}/categorias/delete`,
                        idCategoria
                    );
                    Swal.fire("Categoria inavilitada!", "success").then(() => {
                        window.location.reload();
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleActive = async (id) => {
        const selectedCompany = companies?.find((company) => company.id === id);

        const idCategoria = {
            id: selectedCompany.id,
            id_statud: 1,
        };
        try {
            Swal.fire({
                title: "Esta seguro?",
                text: "Habilitar esta categoria",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si",
            }).then((result) => {
                if (result.isConfirmed) {
                    const { data } = axios.post(
                        `${url}/categorias/active`,
                        idCategoria
                    );
                    Swal.fire("Categoria habilitada!", "success").then(() => {
                        window.location.reload();
                    });
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const itemsPerPage = 8;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    //const visiblecompanies = companies?.slice(startIndex, endIndex);
    const visiblecompanies = categories?.slice(startIndex, endIndex);
    const renderPageButtons = () => {
        const totalPages = Math.ceil((categories?.length || 0) / itemsPerPage);

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
    console.log("categorias:", categories);
    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch, show]);

    return (
        <div className="wrapper">
            {/* Main Sidebar Container */}
            <SideBar></SideBar>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                <section className="content-header">
                    <div className={styles.botonBack}>
                        <Link
                            to="/admin/home"
                            className="btn btn-outline-secondary"
                        >
                            Volver
                        </Link>
                    </div>
                </section>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-12">
                                <h1 className="text-center">
                                    Lista de categorias
                                </h1>
                            </div>
                        </div>
                    </div>
                </section>
                {/* /.content */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Modificar {selectedCompany.nombre}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form action="" className={styles.form}>
                            <div className={styles.input}>
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={selectedCompany.dato?.nombre}
                                    onChange={(event) =>
                                        handleChange(event, "dato")
                                    }
                                />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={handleSaveChanges}>
                            Guardar Cambios
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* /.content */}
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between py-2">
                                                <div className="pagination mb-1">
                                                    <button
                                                        className={
                                                            styles.btn_pagination
                                                        }
                                                        onClick={() =>
                                                            handlePageChange(
                                                                currentPage - 1
                                                            )
                                                        }
                                                        disabled={
                                                            currentPage === 1
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
                                                                currentPage + 1
                                                            )
                                                        }
                                                        disabled={
                                                            endIndex >=
                                                            (companies?.length ||
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
                                                    despachar={searchCategory}
                                                ></Busqueda>
                                            </div>
                                            <Table bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th
                                                            className={
                                                                styles.th
                                                            }
                                                        >
                                                            id
                                                        </th>
                                                        <th
                                                            className={
                                                                styles.th
                                                            }
                                                        >
                                                            categoria
                                                        </th>

                                                        <th
                                                            className={
                                                                styles.th
                                                            }
                                                        >
                                                            Estado
                                                        </th>
                                                        <th
                                                            className={
                                                                styles.th
                                                            }
                                                        >
                                                            Editar
                                                        </th>
                                                        <th
                                                            className={
                                                                styles.th
                                                            }
                                                        >
                                                            Eliminar
                                                        </th>
                                                    </tr>
                                                </thead>
                                                {visiblecompanies?.map(
                                                    (company, index) => {
                                                        return (
                                                            <tbody key={index}>
                                                                <tr>
                                                                    <td
                                                                        className={
                                                                            styles.td
                                                                        }
                                                                    >
                                                                        {
                                                                            company.id
                                                                        }
                                                                    </td>
                                                                    <td
                                                                        className={
                                                                            styles.td
                                                                        }
                                                                    >
                                                                        {
                                                                            company.nombre
                                                                        }
                                                                    </td>
                                                                    <td
                                                                        className={
                                                                            company.id_statud ===
                                                                            1
                                                                                ? styles.activo
                                                                                : styles.inactivo
                                                                        }
                                                                    >
                                                                        {company.id_statud !==
                                                                        1
                                                                            ? "Inactivo"
                                                                            : "Activo"}
                                                                    </td>
                                                                    <td
                                                                        className={
                                                                            styles.td
                                                                        }
                                                                    >
                                                                        <button
                                                                            className={
                                                                                styles.button
                                                                            }
                                                                            onClick={() =>
                                                                                handleClickEdit(
                                                                                    company.id
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                company.id_statud !==
                                                                                1
                                                                            }
                                                                        >
                                                                            <BsPencilSquare
                                                                                className={
                                                                                    styles.btn_icon
                                                                                }
                                                                            />
                                                                        </button>
                                                                    </td>
                                                                    <td
                                                                        className={
                                                                            styles.td
                                                                        }
                                                                    >
                                                                        {company.id_statud ===
                                                                        1 ? (
                                                                            <button
                                                                                className={
                                                                                    styles.button
                                                                                }
                                                                                onClick={() =>
                                                                                    handleDelete(
                                                                                        company.id
                                                                                    )
                                                                                }
                                                                            >
                                                                                <BsTrash
                                                                                    style={{
                                                                                        color: "#dd3636",
                                                                                    }}
                                                                                />
                                                                            </button>
                                                                        ) : (
                                                                            <button
                                                                                className={
                                                                                    styles.button
                                                                                }
                                                                                onClick={() =>
                                                                                    handleActive(
                                                                                        company.id
                                                                                    )
                                                                                }
                                                                            >
                                                                                <BsCheckLg
                                                                                    style={{
                                                                                        color: "blue",
                                                                                    }}
                                                                                />
                                                                            </button>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        );
                                                    }
                                                )}
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
