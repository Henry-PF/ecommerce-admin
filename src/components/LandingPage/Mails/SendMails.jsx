import { useState } from "react";
import SideBar from "../Home/Graficos/SideBar";
import styles from "./Mails.module.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const SendMails = () => {
    const [data, setData] = useState({
        title: "",
        content: "",
    });
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                `/emailSubs/send_news`,
                data
            );
            if (res) {
                Swal.fire("Mail enviado exitosamente!").then(() =>
                    setData({
                        title: "",
                        content: "",
                    })
                );
            }
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
                    <h1 className="text-center m-5">Enviar mensaje</h1>
                    <Form className={styles.container} onSubmit={handleSubmit}>
                        <div className={styles.input_container}>
                            <div className={styles.input_name}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Asunto"
                                    className="w-100"
                                >
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        placeholder="Asunto"
                                        required
                                        name="title"
                                        value={data.title}
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>
                            </div>
                            <div className={styles.input_name}>
                                <FloatingLabel
                                    label="Mensaje"
                                    className="w-100"
                                >
                                    <Form.Control
                                        className={styles.form_input}
                                        as="textarea"
                                        style={{ height: "150px" }}
                                        placeholder="Mesaje"
                                        name="content"
                                        value={data.content}
                                        onChange={handleChange}
                                        required
                                    />
                                </FloatingLabel>
                            </div>

                            <Button
                                className="w-100 my-4"
                                variant="info"
                                type="submit"
                            >
                                Enviar mensaje
                            </Button>
                        </div>
                    </Form>
                </section>
            </div>
        </div>
    );
};

export default SendMails;
