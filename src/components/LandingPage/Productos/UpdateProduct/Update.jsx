import React, { useEffect, useState } from 'react';
import SideBar from '../../Home/Graficos/SideBar';
import styles from "./Update.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../../Redux/actions';
import { BsTrash, BsPencilSquare, BsCheckLg, BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'

const url = process.env.BACKEND_URL;

export default function Update() {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [show, setShow] = useState(false);
  const [Selectedproducts, setSelectedproducts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const handleClose = () => setShow(false);

  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  const handleClickEdit = (busId) => {
    const Selectedproducts = products?.data?.find((bus) => bus.id === busId);
    setSelectedproducts(Selectedproducts);
    setShow(true);
  };

  const handleChange = (event) => {
    setSelectedproducts({
      ...Selectedproducts,
      [event.target.name]: event.target.value,
    })
  };

  const handleSaveChange = async () => {
    try {
      const data = await axios.post(`productos/update`, Selectedproducts);
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
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Esta seguro?',
        text: "Deshabilitar este serivicio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, deshabilitar!'
      }).then((result) => {
        if (result.isConfirmed) {
          const dataToSend = {
            "id": id,
          }

          const { data } = axios.post(`productos/delete`, dataToSend);
          Swal.fire(
            'Servicio Deshabilitado!',
            'El Servicio fue deshabilidato exitosamente.',
            'success'
          ).then(() => {
            window.location.reload();
          });
        }
      })

    } catch (error) {
      console.error(error);
    }

  };

  const handleActive = async (id) => {
    try {
      Swal.fire({
        title: 'Esta seguro?',
        text: "Habilitar este serivicio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, habilitar!'
      }).then((result) => {
        if (result.isConfirmed) {
          const Selectedproduct = products?.data?.find((prodcut) => prodcut.id === id);
          const dataToSend = {
            "id": id,
            "nombre": Selectedproduct.nombre,
            "descripcion": Selectedproduct.descripcion,
            "precio": Selectedproduct.precio,
            "createdAt": Selectedproduct.createdAt,
            "updatedAt": Selectedproduct.updatedAt,
            "stock": Selectedproduct.stock,
            "id_categoria": Selectedproduct.id_categoria,
            "id_statud": 1
          }
          const { data } = axios.post(`productos/update`, dataToSend);
          Swal.fire(
            'Servicio Habilitado!',
            'El Servicio fue habilidato exitosamente.',
            'success',
          ).then(() => {
            window.location.reload();
          });
        }
      })

    } catch (error) {
      console.error(error);
    }

  };

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // const visibleProduct = products?.slice(startIndex, endIndex);

  const renderPageButtons = () => {
    const totalPages = Math.ceil((products?.data?.length || 0) / itemsPerPage);

    const buttons = [];
    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? styles.btn_active : styles.btn_pagination}
        >
          {page}
        </button>
      );
    }

    return buttons;
  };


  useEffect(() => {
    dispatch(getProducts(currentPage))
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

            <h1 className='text-center'>Lista de Productos</h1>

          </div>
        </section>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modificar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="" className={styles.form}>
              <div className={styles.input}>
                <label>Nombre</label>
                <input
                  type="text"
                  name='nombre'
                  value={Selectedproducts.nombre}
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className={styles.input}>
                <label>Precio</label>
                <input
                  type="text"
                  name='precio'
                  value={Selectedproducts.precio}
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className={styles.input}>
                <label>Descripcion</label>
                <input
                  type="text"
                  name='descripcion'
                  value={Selectedproducts.descripcion}
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className={styles.input}>
                <label>Stock</label>
                <input
                  type="text"
                  name='stock'
                  value={Selectedproducts.stock}
                  onChange={(event) => handleChange(event)}
                />
              </div>
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
                            <th className={styles.th}>#</th>
                            <th className={styles.th}>Nombre</th>
                            <th className={styles.th}>Precio</th>
                            <th className={styles.th}>Descripcion</th>
                            <th className={styles.th}>Stock</th>
                            <th className={styles.th}>Status</th>
                          </tr>
                        </thead>
                        {products?.data?.map((producto) => {
                          return <tbody key={producto.id}>
                            <tr>
                              <td className={styles.td}>{producto.id}</td>
                              <td className={styles.td}>{producto.nombre}</td>
                              <td className={styles.td}>$ {producto.precio}</td>
                              <td className={styles.td}>{producto.descripcion}</td>
                              <td className={styles.td}>{producto.stock}</td>
                              <td className={producto.id_statud === 1 ? styles.activo : styles.inactivo}>{producto.id_statud}</td>
                              <td className={styles.td}>
                                <button className={styles.button} onClick={() => handleClickEdit(producto.id)} disabled={producto.id_statud !== 1}>
                                  <BsPencilSquare className={styles.btn_icon} />
                                </button>
                              </td>
                              <td className={styles.td}>
                                {
                                  producto.id_statud === 1
                                    ? <button className={styles.button} onClick={() => handleDelete(producto.id)}>
                                      <BsTrash className={styles.btn_icon} />
                                    </button>
                                    : <button className={styles.button} onClick={() => handleActive(producto.id)}>
                                      <BsCheckLg className={styles.btn_icon} />
                                    </button>
                                }
                              </td>
                            </tr>
                          </tbody>
                        })}
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
