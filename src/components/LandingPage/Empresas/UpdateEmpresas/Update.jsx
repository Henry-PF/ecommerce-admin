import React, { useState, useEffect } from 'react';
import SideBar from '../../Home/Graficos/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./Update.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Swal from 'sweetalert2';
import { getAllCompanies } from "../../../../Redux/actions";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { BsTrash, BsPencilSquare, BsCheckLg, BsArrowRight, BsArrowLeft } from 'react-icons/bs';

export default function Update() {
  const [show, setShow] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const companies = useSelector(state => state.companies);

  const handleClose = () => setShow(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClickEdit = (companyId) => {
    const selectedCompany = companies.data?.find((company) => company.id === companyId);
    setSelectedCompany(selectedCompany);
    setShow(true);
  }

  const handleChange = (event, field) => {
    setSelectedCompany({
      ...selectedCompany,
      [field]: {
        ...selectedCompany[field],
        [event.target.name]: event.target.value,
      },
    });
  }

  const handleSaveChanges = async () => {
    try {
      const data = await axios.put('https://api-54nh.onrender.com/empresas/update', selectedCompany.dato);
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
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Esta Seguro?',
        text: 'Deshabilitar este sevicio',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, deshabilitar!'
      }).then((result) => {
        if (result.isConfirmed) {
          const { data } = axios.put(`https://api-54nh.onrender.com/empresas/delete/${id}/2`);
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
      console.log(error);
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
          const { data } = axios.put(`https://api-54nh.onrender.com/empresas/delete/${id}/1`);
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

  const visiblecompanies = companies.data?.slice(startIndex, endIndex);

  const renderPageButtons = () => {
    const totalPages = Math.ceil((companies.data?.length || 0) / itemsPerPage);

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
    dispatch(getAllCompanies())
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
            <Modal.Title>Modificar Empresa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="" className={styles.form}>
              <div className={styles.input}>
                <label>Nombre</label>
                <input
                  type="text"
                  name='nombre'
                  value={selectedCompany.dato?.nombre}
                  onChange={(event) => handleChange(event, 'dato')}
                />
              </div>
              <div className={styles.input}>
                <label>Direccion</label>
                <input
                  type="text"
                  name='direccion'
                  value={selectedCompany.dato?.direccion}
                  onChange={(event) => handleChange(event, 'dato')}
                />
              </div>
              <div className={styles.input}>
                <label>Correo Electronico</label>
                <input
                  type="text"
                  name='correo'
                  value={selectedCompany.dato?.correo}
                  onChange={(event) => handleChange(event, 'dato')}
                />
              </div>
              <div className={styles.input}>
                <label>Telefono</label>
                <input
                  type="text"
                  name='telefono'
                  value={selectedCompany.dato?.telefono}
                  onChange={(event) => handleChange(event, 'dato')}
                />
              </div>
              <div className={styles.input}>
                <label>CUIT</label>
                <input
                  type="text"
                  name='cuit'
                  value={selectedCompany.dato?.cuit}
                  onChange={(event) => handleChange(event, 'dato')}
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
                          disabled={endIndex >= (companies.data?.length || 0)}
                        >
                          <BsArrowRight className={styles.btn_icon} />
                        </button>
                      </div>
                      <Table bordered hover>
                        <thead>
                          <tr>
                            <th className={styles.th}>#</th>
                            <th className={styles.th}>Nombre</th>
                            <th className={styles.th}>Direccion</th>
                            <th className={styles.th}>Correo Electronico</th>
                            <th className={styles.th}>Telefono</th>
                            <th className={styles.th}>CUIT</th>
                            <th className={styles.th}>Estado</th>
                          </tr>
                        </thead>
                        {visiblecompanies?.map((company, index) => {
                          return <tbody key={index}>
                            <tr>
                              <td className={styles.td}>{index + 1}</td>
                              <td className={styles.td}>{company.dato.nombre}</td>
                              <td className={styles.td}>{company.dato.direccion}</td>
                              <td className={styles.td}>{company.dato.correo}</td>
                              <td className={styles.td}>{company.dato.telefono}</td>
                              <td className={styles.td}>{company.dato.cuit}</td>
                              <td className={company.statud.id === 1 ? styles.activo : styles.inactivo}>{company.statud.nombre}</td>
                              <td className={styles.td}>
                                <button className={styles.button} onClick={() => handleClickEdit(company.id)} disabled={company.statud.id !== 1}>
                                  <BsPencilSquare className={styles.btn_icon} />
                                </button>
                              </td>
                              <td className={styles.td}>
                                {
                                  company.statud.id === 1
                                    ? <button className={styles.button} onClick={() => handleDelete(company.id)}>
                                      <BsTrash className={styles.btn_icon} />
                                    </button>
                                    : <button className={styles.button} onClick={() => handleActive(company.id)}>
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

