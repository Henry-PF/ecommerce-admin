import React from 'react'
import { SlLogout } from 'react-icons/sl'
import '../home.css'

export default function SideBar() {
    // --------------------------------Lista de Buses---------------------------------------
    const [ProductIsTrue, setProductIsTrue] = React.useState(false);
    const [ProductOpen, setProductOpen] = React.useState("nav-item menu-open");
    const [ProductClose, setProductClose] = React.useState("nav-item");
    const BusesHandle = () => {
        return setProductIsTrue(!ProductIsTrue);
    }
    // -----------------------------------------------------------------------
    // --------------------------------Lista de Empresas---------------------------------------
    const [Empresasistrue, setEmpresasistrue] = React.useState(false);
    const [EmpresasOpen, setEmpresasOpen] = React.useState("nav-item menu-open");
    const [EmpresasClose, setEmpresasClose] = React.useState("nav-item");
    const EmpresasHandle = () => {
        return setEmpresasistrue(!Empresasistrue);
    }
    // -----------------------------------------------------------------------
    // --------------------------------Lista de Rutas---------------------------------------
    const [Rutasistrue, setRutasistrue] = React.useState(false);
    const [RutasOpen, setRutasOpen] = React.useState("nav-item menu-open");
    const [RutasClose, setRutasClose] = React.useState("nav-item");
    const RutasHandle = () => {
        return setRutasistrue(!Rutasistrue);
    }
    // -----------------------------------------------------------------------

    const handleClick = () => {
        localStorage.clear();
        window.location.reload();
    }
    return (
        <div>
            <link rel="stylesheet" href="../../plugins/fontawesome-free/css/all.min.css" />
            {/* Theme style */}
            <link rel="stylesheet" href="../../dist/css/adminlte.min.css" />
            <aside className="main-sidebar sidebar-dark-primary elevation-4 position-fixed top-0">
                {/* Brand Logo */}
                <a href="/admin/home" className="brand-link">
                    <img src="../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">Ticket Express Admin</span>
                </a>
                <div className="sidebar">
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className={ProductIsTrue === true ? ProductOpen : ProductClose} onClick={() => BusesHandle()}>
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-edit" />
                                    <p>
                                        Productos
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <a href="/admin/Productos/updateDelete" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Editar-Eliminar Productos</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/admin/Productos/create" className="nav-link ">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Agregar Producto</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className={Empresasistrue === true ? EmpresasOpen : EmpresasClose} onClick={() => EmpresasHandle()}>
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-edit" />
                                    <p>
                                        Empresas
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <a href="/admin/empresas/create" className="nav-link ">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Create</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/admin/empresas/update" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Update-Delete</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className={Rutasistrue === true ? RutasOpen : RutasClose} onClick={() => RutasHandle()}>
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-edit" />
                                    <p>
                                        Rutas
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <a href="/admin/Rutas/create" className="nav-link ">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Create</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/admin/Rutas/update" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Update-Delete</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='btn_'>
                    <SlLogout className='icon' />
                    <button className='btn_exit' onClick={handleClick}> Salir</button>

                </div>
            </aside >

        </div >
    )
}
