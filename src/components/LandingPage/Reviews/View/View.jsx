import { Link } from "react-router-dom";
import SideBar from "../../Home/Graficos/SideBar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllReviews } from "../../../../Redux/actions";
import styles from "./View.module.css";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { Rating } from "react-simple-star-rating";

function View() {
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedReview, setSelectedReview] = useState({});

    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews);

    const handleClose = () => setShow(false);

    const handleClickEdit = (id) => {
        const selectedReview = reviews.data?.find((review) => review.id === id);
        setSelectedReview(selectedReview);
        setShow(true);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const visible = reviews.data?.slice(startIndex, endIndex);

    const renderPageButtons = () => {
        const totalPages = Math.ceil(
            (reviews.data?.length || 0) / itemsPerPage
        );

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

    const handleDelete = async (id) => {
        const selectedReview = reviews.data?.find((review) => review.id === id);
        const infoReview = {
            reviewId: selectedReview.id,
            userId: selectedReview.id_usuario,
        };
        try {
            Swal.fire({
                title: "Esta Seguro?",
                text: "Eliminar esta review",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si",
            }).then((result) => {
                if (result.isConfirmed) {
                    const { data } = axios.post(`/reviews/delete`, infoReview);
                    Swal.fire("Review inavilitada!", "success").then(() => {
                        window.location.reload();
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        dispatch(getAllReviews());
    }, [dispatch, show]);

    return (
        <div className="wrapper">
            {/* Main Sidebar Container */}
            <SideBar></SideBar>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                <section className="content-header">
                    <div>
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
                                    Lista de reviews
                                </h1>
                            </div>
                        </div>
                    </div>
                </section>
                {/* /.content */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Review de{" "}
                            {selectedReview.usuario?.usuario || "anonimo"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Rating
                            initialValue={selectedReview.puntuacion}
                            readonly
                            allowFraction
                        />
                        <p>Puntuacion: {selectedReview.puntuacion}</p>
                        <p>{selectedReview.contenido}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
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
                                                    disabled={currentPage === 1}
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
                                                        (reviews.data?.length ||
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
                                            <Table bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th
                                                            className={
                                                                styles.th
                                                            }
                                                        >
                                                            #
                                                        </th>
                                                        <th
                                                            className={
                                                                styles.th
                                                            }
                                                        >
                                                            autor
                                                        </th>

                                                        <th
                                                            className={
                                                                styles.th
                                                            }
                                                        >
                                                            contenido
                                                        </th>
                                                        <th
                                                            className={
                                                                styles.th
                                                            }
                                                        >
                                                            eliminar
                                                        </th>
                                                    </tr>
                                                </thead>
                                                {visible?.map(
                                                    (review, index) => {
                                                        return (
                                                            <tbody key={index}>
                                                                <tr>
                                                                    <td
                                                                        className={
                                                                            styles.td
                                                                        }
                                                                    >
                                                                        {
                                                                            review.id
                                                                        }
                                                                    </td>
                                                                    <td
                                                                        className={
                                                                            styles.td
                                                                        }
                                                                    >
                                                                        {review
                                                                            .usuario
                                                                            ?.usuario ||
                                                                            "anonimo"}
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            className={
                                                                                styles.button
                                                                            }
                                                                            onClick={() =>
                                                                                handleClickEdit(
                                                                                    review.id
                                                                                )
                                                                            }
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    faBookOpen
                                                                                }
                                                                                style={{
                                                                                    color: "#a1a1a1cc",
                                                                                }}
                                                                            />
                                                                        </button>
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            className={
                                                                                styles.button
                                                                            }
                                                                            onClick={() =>
                                                                                handleDelete(
                                                                                    review.id
                                                                                )
                                                                            }
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    faTrash
                                                                                }
                                                                                style={{
                                                                                    color: "red",
                                                                                }}
                                                                            />
                                                                        </button>
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

export default View;
