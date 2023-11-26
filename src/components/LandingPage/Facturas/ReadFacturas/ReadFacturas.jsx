import React, { useEffect, useState } from 'react';
import styles from "./ReadFacturas.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import Table from 'react-bootstrap/Table';
import SideBar from '../../Home/Graficos/SideBar';
import { getAllFacturas, getFacturasMap } from '../../../../Redux/actions';
import GraficosFactura from '../GraficosFactura/GraficosFactura';



export default function ReadFacturas() {

  const [show, setShow] = useState(false);
  const [Selectedfacturas, setSelectedfacturas] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const facturas = useSelector(state => state.facturas);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleProduct = facturas?.slice(startIndex, endIndex);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageButtons = () => {
    const totalPages = Math.ceil((facturas.data?.length || 0) / itemsPerPage);

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
      dispatch(getAllFacturas())
      dispatch(getFacturasMap())
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
                <h1 className=''>Facturas de compra</h1>
              </div>
            </div>
          </div>
        </section>
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
                          disabled={endIndex >= (facturas?.length || 0)}
                        >
                          <BsArrowRight className={styles.btn_icon} />
                        </button>
                      </div>
                      <Table bordered hover>
                        <thead>
                          <tr>
                            <th className={styles.th}>#</th>
                            <th className={styles.th}>Total</th>
                            <th className={styles.th}>Cantidad</th>
                            <th className={styles.th}>Producto</th>
                            <th className={styles.th}>Id Producto</th>
                          </tr>
                        </thead>
                        {visibleProduct?.map((producto) => {
                          return <tbody key={producto.id}>
                            <tr>
                              <td className={styles.td}>{producto.id}</td>
                              <td className={styles.td}>{producto.total}</td>
                              <td className={styles.td}>{producto.factura_detalles[0].cantidad}</td>
                              <td className={styles.td}>{producto.factura_detalles[0].producto.nombre}</td>
                              <td className={styles.td}>{producto.factura_detalles[0].producto.id}</td>
                            </tr>
                          </tbody>
                        })}
                      </Table>
                      <div className={styles.divGrafico}>
                        <h1>Grafico de Compras en el año</h1>
                      <GraficosFactura/>
                      </div>
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
