import React from "react";
import { SlLogout } from "react-icons/sl";
import "../home.css";
import logo from "../../../../assets/logo.png";
import { Link } from "react-router-dom";

export default function SideBar() {
    // --------------------------------Lista de Buses---------------------------------------
    const [Busesistrue, setBusesistrue] = React.useState(false);
    const [BusesOpen, setBusesOpen] = React.useState("nav-item menu-open");
    const [BusesClose, setBusesClose] = React.useState("nav-item");
    const BusesHandle = () => {
        return setBusesistrue(!Busesistrue);
    };
    // -----------------------------------------------------------------------
    // --------------------------------Lista de Empresas---------------------------------------
    const [Empresasistrue, setEmpresasistrue] = React.useState(false);
    const [EmpresasOpen, setEmpresasOpen] =
        React.useState("nav-item menu-open");
    const [EmpresasClose, setEmpresasClose] = React.useState("nav-item");
    const EmpresasHandle = () => {
        return setEmpresasistrue(!Empresasistrue);
    };
    // -----------------------------------------------------------------------
    // --------------------------------Lista de Rutas---------------------------------------
    const [Rutasistrue, setRutasistrue] = React.useState(false);
    const [RutasOpen, setRutasOpen] = React.useState("nav-item menu-open");
    const [RutasClose, setRutasClose] = React.useState("nav-item");
    const RutasHandle = () => {
        return setRutasistrue(!Rutasistrue);
    };
    // -----------------------------------------------------------------------

    const handleClick = () => {
        localStorage.clear();
        window.location.reload();
    };
    return (
        <div>
            <link
                rel="stylesheet"
                href="../../plugins/fontawesome-free/css/all.min.css"
            />
            {/* Theme style */}
            <link rel="stylesheet" href="../../dist/css/adminlte.min.css" />
            <aside className="main-sidebar sidebar-dark-primary elevation-4 position-fixed top-0">
                {/* Brand Logo */}

                <Link to="/admin/home" className="brand-link">
                    <img
                        src={logo}
                        alt="Trendy Logo"
                        className="brand-image img-circle elevation-3 bg-light"
                    />
                    <span className="brand-text font-weight-light">
                        Trendy Admin
                    </span>
                </Link>
                <div className="sidebar">
                    <nav className="mt-2">
                        <ul
                            className="nav nav-pills nav-sidebar flex-column"
                            data-widget="treeview"
                            role="menu"
                            data-accordion="false"
                        >
                            <li
                                className={
                                    Busesistrue === true
                                        ? BusesOpen
                                        : BusesClose
                                }
                                onClick={() => BusesHandle()}
                            >
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-edit" />
                                    <p>
                                        Buses
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <a
                                            href="/admin/buses/update"
                                            className="nav-link"
                                        >
                                            <i className="far fa-circle nav-icon" />
                                            <p>Panel de Control</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="/admin/buses/create"
                                            className="nav-link "
                                        >
                                            <i className="far fa-circle nav-icon" />
                                            <p>Agregar Bus</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul
                            className="nav nav-pills nav-sidebar flex-column"
                            data-widget="treeview"
                            role="menu"
                            data-accordion="false"
                        >
                            <li
                                className={
                                    Empresasistrue === true
                                        ? EmpresasOpen
                                        : EmpresasClose
                                }
                                onClick={() => EmpresasHandle()}
                            >
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon fas fa-edit" />
                                    <p>
                                        Categorias
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        {/* <a
                                            href="/admin/categorias/create"
                                            className="nav-link "
                                        >
                                        </a> */}
                                        <Link
                                            to="/admin/categorias/create"
                                            className="nav-link"
                                        >
                                            <i className="far fa-circle nav-icon" />
                                            <p>Create</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/admin/categorias/update"
                                            className="nav-link"
                                        >
                                            <i className="far fa-circle nav-icon" />
                                            <p>Update-Delete</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="btn_">
                    <SlLogout className="icon" />
                    <button className="btn_exit" onClick={handleClick}>
                        {" "}
                        Salir
                    </button>
                </div>
            </aside>
        </div>
    );
}
