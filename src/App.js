import { Route, Routes } from "react-router-dom";
import Home from "./components/LandingPage/Home/Home";
import Login from "./components/Login/Login";
/* Rutas Product */
import Create from './components/LandingPage/Productos/CreateProduct/Create';
import Update from './components/LandingPage/Productos/UpdateProduct/Update';
/* Rutas Facturas */
import ReadFacturas from "./components/LandingPage/Facturas/ReadFacturas/ReadFacturas";
/* Rutas Categorias */
import CreateCategorias from "./components/LandingPage/Categorias/CreateCategorias/Create";
import UpdateCategorias from "./components/LandingPage/Categorias/UpdateCategorias/Update";
/* Rutas Reviews */
import View from "./components/LandingPage/Reviews/View/View";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import "./App.css";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3002/api'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                    {/* Rutas Productos */}
                    <Route exact path='/admin/Productos/create' element={<Create />} />
                    <Route exact path='/admin/Productos/updateDelete' element={<Update />} />
                    {/* Rutas Facturas */}
                    <Route exact path='/admin/facturas/updateDelete' element={<ReadFacturas />} />
                    {/* Rutas Categorias */}

                    <Route
                        exact
                        path="/admin/Productos/create"
                        element={<Create />}
                    />
                    <Route
                        exact
                        path="/admin/Productos/updateDelete"
                        element={<Update />}
                    />
                    {/* Rutas Categorias */}
                    <Route
                        exact
                        path="/admin/categorias/create"
                        element={<CreateCategorias />}
                    />
                    <Route
                        exact
                        path="/admin/categorias/update"
                        element={<UpdateCategorias />}
                    />
                    {/* Rutas Reviews */}
                    <Route
                        exact
                        path="/admin/reviews/view"
                        element={<View />}
                    />
                    {/* Rutas Dashboard */}
                    <Route exact path="/admin/home" element={<Home />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
