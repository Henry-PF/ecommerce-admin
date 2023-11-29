import React, { useState } from "react";
import SideBar from "../../Home/Graficos/SideBar";
import styles from "./Create.module.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const url = process.env.BACKEND_URL;
console.log(process.env.BACKEND_URL);

export default function Create() {
    const [datos, setDatos] = useState({ id_statud: 1 });

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(
                `/categorias`,
                datos
            );
            if (data) {
                Swal.fire(
                    "Categoria creada exitosamente!",
                    `${data.message}`
                ).then(() =>
                    setDatos({
                        nombre: "",
                    })
                );
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="wrapper">
            {/* Main Sidebar Container */}
            <SideBar></SideBar>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
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
                {/* /.content */}
                <section class="content-header">
                    <h1 className="text-center m-5">Nueva Categoria</h1>
                    <Form className={styles.container} onSubmit={handleSubmit}>
                        <div className={styles.input_container}>
                            <div className={styles.input_name}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Nombre"
                                    className="w-100 me-2"
                                >
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        placeholder="Nombre"
                                        required
                                        name="nombre"
                                        value={datos.dato?.nombre}
                                        onChange={(event) =>
                                            handleChange(event)
                                        }
                                    />
                                </FloatingLabel>
                            </div>

                            <Button
                                className="w-100 my-4"
                                variant="primary"
                                type="submit"
                            >
                                Crear Categoria
                            </Button>
                        </div>
                    </Form>
                </section>
            </div>
        </div>
    );
}
