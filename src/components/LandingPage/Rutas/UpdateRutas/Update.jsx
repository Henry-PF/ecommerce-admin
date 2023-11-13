import React, { useEffect } from 'react'
import SideBar from '../../Home/Graficos/SideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./Update.module.css";
import { connect, useDispatch, useSelector } from 'react-redux';
import { getAllRutes, deleteRute } from '../../../../Redux/actions';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';


function Update(props) {
  const dispatch = useDispatch();
  const allRutas = props.rutas;
  const [show, setShow] = React.useState(false);
  const [selectedRute, setSelectedRute] = React.useState({});

  const deleteOnClick = (idRutes) => {
    if (idRutes.id_status === 1) {
      const dataToSend = { "id": idRutes.id, "id_status": 2 }
      dispatch(deleteRute(dataToSend));
      dispatch(getAllRutes());
    }
    else {
      const dataToSend = { "id": idRutes.id, "id_status": 1 }
      dispatch(deleteRute(dataToSend));
      dispatch(getAllRutes());
    }
  }

  const handleClose = () => setShow(false);

  const handleChange = (event) => {
    setSelectedRute({
      ...selectedRute,
      [event.target.name]: event.target.value,
    })
  }
  const handleSaveChange = async () => {
    try {
      const data = await axios.post('https://api-54nh.onrender.com/rutas/update', selectedRute);
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
    const selectedRute = allRutas?.find((ruta) => ruta.id === ruteId);
    setSelectedRute(selectedRute);
    setShow(true);
  }

  useEffect(() => {
    dispatch(getAllRutes());
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
                <h1 className=''>Update</h1>
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
              <FloatingLabel controlId="floatingPassword" label="Valor del Ticket" className="w-100">
                <Form.Control
                  className={styles.form_input}
                  type="number"
                  placeholder="Valor del Ticket"
                  name='precio'
                  value={selectedRute.precio}
                  onChange={(event) => handleChange(event)}
                  required
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Horario de Llegada" className="w-100 me-2">
                <Form.Control
                  className={styles.form_input}
                  type="time"
                  placeholder="Horario de Llegada"
                  name='hora_llegada'
                  value={selectedRute.hora_llegada}
                  onChange={(event) => handleChange(event)}
                  required
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Horario de Salida" className="w-100 me-2">
                <Form.Control
                  className={styles.form_input}
                  type="time"
                  placeholder="Horario de Salida"
                  name='hora_salida'
                  value={selectedRute.hora_salida}
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
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">MIRAR PARA AGREGAR PAGINADO, FLECHAS DE ORDENAMIENTO Y CENTRAR TODO </h3>
                  </div>
                  <div class="card-body">
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th className={styles.th}>Ciudad de Origen</th>
                          <th className={styles.th}>Ciudad de Destino</th>
                          <th className={styles.th}>Hora de Salida</th>
                          <th className={styles.th}>Hora de Llegada</th>
                          <th className={styles.th}>Fecha de salida</th>
                          <th className={styles.th}>Fecha de Llegada</th>
                          <th className={styles.th}>Valor del Ticket</th>
                          <th className={styles.th}>Status</th>
                          <th className={styles.th}>Editar</th>
                          <th className={styles.th}>Eliminar</th>
                        </tr>
                      </thead>
                      {allRutas?.map((data) => {
                        return <tbody>
                          <tr>
                            <td className={styles.td}>{data.origen}</td>
                            <td className={styles.td}>{data.destino}</td>
                            <td className={styles.td}>{data.fecha_salida}</td>
                            <td className={styles.td}>{data.fecha_llegada}</td>
                            <td className={styles.td}>{data.hora_salida}</td>
                            <td className={styles.td}>{data.hora_llegada}</td>
                            <td className={styles.td}>{data.precio}</td>
                            <td className={styles.td}>{data.id_statud === 1 ? "Activo" : "Inactivo"}</td>
                            <td className={styles.td}><button className={styles.button} onClick={() => updateOnClick(data.id)}><FontAwesomeIcon icon={faPencil} style={{ color: "#a1a1a1cc", }} />
                            </button></td>
                            <td className={styles.td}><button className={styles.button} onClick={() => {
                              const idRutes = { "id": data.id, "id_status": data.id_statud };
                              return deleteOnClick(idRutes);
                            }}><FontAwesomeIcon icon={faTrash} style={{ color: "#dd3636", }} />
                            </button></td>
                          </tr>
                        </tbody>
                      })}
                    </table>
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

const mapStateToProps = (state) => {
  return {
    rutas: state.trips
  };
}

export default connect(mapStateToProps, null)(Update)