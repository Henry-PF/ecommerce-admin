import React, { useEffect, useState } from 'react';
import SideBar from '../../Home/Graficos/SideBar';
import styles from "./Update.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { getBuses } from '../../../../Redux/actions';
import { BsTrash, BsPencilSquare, BsCheckLg, BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Swal from 'sweetalert2';


export default function Update() {

  const [show, setShow] = useState(false);
  const [selectedBus, setSelectedBus] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const buses = useSelector(state => state.buses);

  const handleClose = () => setShow(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClickEdit = (busId) => {
    const selectedBus = buses.data?.find((bus) => bus.id === busId);
    setSelectedBus(selectedBus);
    setShow(true);
  };

  const handleChange = (event) => {
    setSelectedBus({
      ...selectedBus,
      [event.target.name]: event.target.value,
    })
  }

  const handleSaveChange = async () => {
    try {
      const data = await axios.put('https://api-54nh.onrender.com/buses/update_bus', selectedBus);
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
          const { data } = axios.put(`https://api-54nh.onrender.com/buses/delete_bus/${id}/2`);
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
  }

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
          const { data } = axios.put(`https://api-54nh.onrender.com/buses/delete_bus/${id}/1`);
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
  }

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleBuses = buses.data?.slice(startIndex, endIndex);

  const renderPageButtons = () => {
    const totalPages = Math.ceil((buses.data?.length || 0) / itemsPerPage);

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
    dispatch(getBuses())
  }, [dispatch, show]);

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
                <h1 className=''>Update Buses</h1>
              </div>
            </div>
          </div>
        </section>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modificar Bus</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="" className={styles.form}>
              <div className={styles.input}>
                <label>Modelo</label>
                <input
                  type="text"
                  name='modelo'
                  value={selectedBus.modelo}
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className={styles.input}>
                <label>Marca</label>
                <input
                  type="text"
                  name='marca'
                  value={selectedBus.marca}
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className={styles.input}>
                <label>Capacidad</label>
                <input
                  type="text"
                  name='capacidad'
                  value={selectedBus.capacidad}
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className={styles.input}>
                <label>Placa</label>
                <input
                  type="text"
                  name='placa'
                  value={selectedBus.placa}
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
                          className={styles.btn_pagination}
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <BsArrowLeft className={styles.btn_icon} />
                        </button>

                        {renderPageButtons()}

                        <button
                          className={styles.btn_pagination}
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={endIndex >= (buses.data?.length || 0)}
                        >
                          <BsArrowRight className={styles.btn_icon} />
                        </button>
                      </div>
                      <Table bordered hover>
                        <thead>
                          <tr>
                            <th className={styles.th}>#</th>
                            <th className={styles.th}>Modelo</th>
                            <th className={styles.th}>Marca</th>
                            <th className={styles.th}>Capacidad</th>
                            <th className={styles.th}>Patente</th>
                            <th className={styles.th}>Estado</th>
                          </tr>
                        </thead>
                        {visibleBuses?.map((bus, index) => {
                          return <tbody key={index}>
                            <tr>
                              <td className={styles.td}>{index + 1}</td>
                              <td className={styles.td}>{bus.modelo}</td>
                              <td className={styles.td}>{bus.marca}</td>
                              <td className={styles.td}>{bus.capacidad}</td>
                              <td className={styles.td}>{bus.placa}</td>
                              <td className={bus.statud.id === 1 ? styles.activo : styles.inactivo}>{bus.statud.nombre}</td>
                              <td className={styles.td}>
                                <button className={styles.button} onClick={() => handleClickEdit(bus.id)} disabled={bus.statud.id !== 1}>
                                  <BsPencilSquare className={styles.btn_icon} />
                                </button>
                              </td>
                              <td className={styles.td}>
                                {
                                  bus.statud.id === 1
                                    ? <button className={styles.button} onClick={() => handleDelete(bus.id)}>
                                      <BsTrash className={styles.btn_icon} />
                                    </button>
                                    : <button className={styles.button} onClick={() => handleActive(bus.id)}>
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
