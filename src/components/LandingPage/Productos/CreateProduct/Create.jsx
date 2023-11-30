import React, { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./Create.module.css";
import Select from "react-select";
import { getAllCategories, createProcut } from "../../../../Redux/actions";
import { useDispatch, connect } from "react-redux";
import Swal from "sweetalert2";
import SideBar from "../../Home/Graficos/SideBar";
import { Link } from "react-router-dom";

function Create({ categories }) {
    const dispatch = useDispatch();

    let dataToMap = [];

    if (categories.length) {
        categories.map((categoria) => {
            if(categoria.id_statud === 1) {
                dataToMap.push(categoria)
            }
        });
    }

    const [dataProduct, setdataProduct] = useState({
        nombre: "",
        descripcion: "",
        precio: 0,
        stock: 0,
        id_categoria: [],
        id_statud: "",
        imagen: null,
    });

    const handleChange = (event) => {
        if (event.target.name === 'imagen') {
            setdataProduct({
                ...dataProduct,
                [event.target.name]: event.target.files[0],
            });
        } else if (event.target.name === 'id_categoria') {
            setdataProduct({
                ...dataProduct,
                [event.target.name]: [...dataProduct.id_categoria, event.target.value],
            });
        } else {
            setdataProduct({
                ...dataProduct,
                [event.target.name]: event.target.value,
            });
        }
    };


    const onSubmit = () => {
        const formData = new FormData();
        formData.append('nombre', dataProduct.nombre);
        formData.append('descripcion', dataProduct.descripcion);
        formData.append('precio', dataProduct.precio);
        formData.append('stock', dataProduct.stock);
        dataProduct.id_categoria.forEach((category) => {
            formData.append('id_categoria', category);
        });
        formData.append('id_statud', Number(dataProduct.id_statud));
        formData.append('imagen', dataProduct.imagen);

        dispatch(createProcut(formData));

        Swal.fire(
            "Producto Creado!",
            "El producto fue creado exitosamente.",
            "success"
        ).then(() =>
            setdataProduct({
                nombre: "",
                descripcion: "",
                precio: 0,
                stock: 0,
                id_categoria: [],
                id_statud: "",
                imagen: null
            })
        );
    };

    useEffect(() => {
        dispatch(getAllCategories());
    }, []);

    return (
        <main>
            <SideBar />
            <div className="wrapper">
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
                    <section className="content-header">
                        <div className="container-fluid">

                            <h1 className="text-center">
                                Crear Producto
                            </h1>
                        </div>


                    </section>
                    {/* /.content */}
                    <Form
                        className={styles.container}
                        onSubmit={(event) => onSubmit(event)}
                        encType="multipart/form-data" // Configurar el tipo de contenido del formulario
                    >
                        <div className={styles.input_container}>
                            <div className={styles.input_name}>
                                <FloatingLabel
                                    controlId="floatingPassword"
                                    label="Nombre Del Producto"
                                    className="w-100"
                                >
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        placeholder="Nombre Del Producto"
                                        name="nombre"
                                        value={dataProduct.nombre}
                                        onChange={handleChange}
                                        required
                                    />
                                </FloatingLabel>
                            </div>
                            <div className={styles.input_name}>
                                <FloatingLabel
                                    controlId="floatingPassword"
                                    label="Descripcion"
                                    className="w-100"
                                >
                                    <Form.Control
                                        className={styles.form_input}
                                        as="textarea"
                                        style={{ height: "150px" }}
                                        placeholder="Descripcion"
                                        name="descripcion"
                                        value={dataProduct.descripcion}
                                        onChange={handleChange}
                                        required
                                    />
                                </FloatingLabel>
                            </div>
                            <div className={styles.input_name}>
                                <FloatingLabel
                                    controlId="floatingPassword"
                                    label="Stock Disponible"
                                    className="w-50"
                                >
                                    <Form.Control
                                        className={styles.form_input}
                                        type="number"
                                        placeholder="Stock Disponible"
                                        name="stock"
                                        value={dataProduct.stock}
                                        onChange={handleChange}
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingPassword"
                                    label="Valor del Producto"
                                    className="w-50"
                                >
                                    <Form.Control
                                        className={styles.form_input}
                                        type="number"
                                        placeholder="Valor del Producto"
                                        name="precio"
                                        value={dataProduct.precio}
                                        onChange={handleChange}
                                        required
                                    />
                                </FloatingLabel>
                            </div>
                            <Form.Group
                                className={styles.formGroup}
                                controlId="formBasicEmail"
                            >
                                <Form.Label className="text-black">
                                    Status Del Producto
                                </Form.Label>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Estado"
                                    className="w-100"
                                >
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={dataProduct.id_statud}
                                        name="id_statud"
                                        onChange={(event) =>
                                            handleChange(event)
                                        }
                                    >
                                        <option>Selecciones un estado</option>
                                        <option value="1">ACTIVO</option>
                                        <option value="2">INACTIVO</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group
                                className={styles.formGroup}
                                controlId="formBasicEmail"
                            >
                                <Form.Label className="text-black">
                                    Categoria
                                </Form.Label>
                                <Select
                                    className={styles.form_input}
                                    isMulti  // Esto permite la selección múltiple
                                    name="id_categoria"
                                    options={dataToMap?.map((categorie) => ({
                                        value: categorie.id,
                                        label: categorie.nombre,
                                    }))}
                                    placeholder="Categoria"
                                    onChange={(selectedOptions) => {
                                        // Obtener un array de valores de las opciones seleccionadas
                                        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
                                        setdataProduct({
                                            ...dataProduct,
                                            id_categoria: selectedValues,
                                        });
                                    }}
                                    required
                                />
                            </Form.Group>
                            <Form.Label className="text-black">
                                Imagen Del Producto
                            </Form.Label>
                            <div className={styles.input_name}>

                                <Form.Control
                                    className={styles.form_input}
                                    type="file"
                                    accept="image/*"
                                    name="imagen"
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                            <Button
                                className="w-100 my-4"
                                variant="primary"
                                type="submit"
                            >
                                Crear Producto
                            </Button>
                        </div>
                    </Form>
                </div>
                {/* /.content-wrapper */}
                <footer className="main-footer"></footer>
                {/* Control Sidebar */}
                <aside className="control-sidebar control-sidebar-dark">
                    {/* Control sidebar content goes here */}
                </aside>
                {/* /.control-sidebar */}
            </div>
        </main>
    );
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
    };
};

export default connect(mapStateToProps, null)(Create);
