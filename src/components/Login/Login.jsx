import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authLayout from "./authLayout";
import "./login.css";
// import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const LoginPage = (props) => {

    // const dispatch = useDispatch();

    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");
    // const [show, setShow] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");



    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = userData;

        try {
            const { data } = await axios.post("http://localhost:3002/api/auth/login", {
                correo: email,
                password: password,
            });
            console.log(data, 'DATA');

            if (data.error) {
                Swal.fire({
                    title: data.error,
                    icon: "error",
                });
            } else if (data.token) {
                if (data.data && data.data.usuarios[0].type === "admin") {
                    setToken(data.token);
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("nombre", data.data.nombre);
                    localStorage.setItem("apellido", data.data.apellido);
                    localStorage.setItem("correo", data.data.correo);
                    window.location.reload();

                    window.location.href = "/admin/home";
                } else {
                    Swal.fire({
                        title: "Acceso denegado. No eres administrador.",
                        icon: "error",
                    });
                }
            }
        } catch (error) {
            console.log('no se pudo procesar el logueo');
        }
    };

    useEffect(() => {
        const userData = Cookies.get("userData");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            console.log(user);
        }
    }, []);

    return (
        <>
            {/* <form className="login-form" onSubmit={handleSubmit}> */}
            <form className="login-form">
                <div className="d-flex align-items-center my-4">
                    <h1 className="text-center fw-normal mb-0 me-3">Sign In</h1>
                </div>
                {/* Email input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3" label="Email">
                        Email address
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(event) =>
                            setUserData({ ...userData, email: event.target.value })
                        }
                        id="form3Example3"
                        className="form-control form-control-lg"
                    />
                    {error && <p className="error">Este es un mensaje de error.</p>}
                </div>

                {/* Password input */}
                <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4">
                        Password
                    </label>
                    <input
                        type="password"
                        id="form3Example4"
                        className="form-control form-control-lg"
                        placeholder="Contraseña"
                        onChange={(event) => setUserData({ ...userData, password: event.target.value })}
                    />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    {/* Checkbox */}
                    <div className="form-check mb-0">
                        <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3"

                        />
                        <label className="form-check-label" htmlFor="form2Example3">
                            Remember me
                        </label>
                    </div>
                    <Link to="/reset-password" className="text-body">
                        Forgot password?
                    </Link>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                    <Link to="/">
                        <button type="submit" className="btn btn-primary btn-lg" onClick={handleSubmit}>
                            Login
                        </button>
                    </Link>
                </div>
            </form>
        </>
    );
};

export default authLayout(LoginPage);
