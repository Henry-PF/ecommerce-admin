import { Route, Routes } from "react-router-dom";
import Home from "./components/LandingPage/Home/Home";
import Login from "./components/Login/Login";
/* Rutas Product */
import Create from './components/LandingPage/Productos/CreateProduct/Create';
import Update from './components/LandingPage/Productos/UpdateProduct/Update';
/* Rutas Categorias */
import CreateCategorias from "./components/LandingPage/Categorias/CreateCategorias/Create";
import DeleteCategorias from "./components/LandingPage/Categorias/DeleteCategorias/Delete";
import UpdateCategorias from "./components/LandingPage/Categorias/UpdateCategorias/Update";
import ReadCategorias from "./components/LandingPage/Categorias/ReadCategorias/Read";

import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                              {/* Rutas Productos */}
          <Route exact path='/admin/Productos/create' element={<Create />} />
          <Route exact path='/admin/Productos/updateDelete' element={<Update />} />
                    {/* Rutas Categorias */}
                    <Route
                        exact
                        path="/admin/categorias/create"
                        element={<CreateCategorias />}
                    />
                    <Route
                        exact
                        path="/admin/categorias/delete"
                        element={<DeleteCategorias />}
                    />
                    <Route
                        exact
                        path="/admin/categorias/update"
                        element={<UpdateCategorias />}
                    />
                    <Route
                        exact
                        path="/admin/categorias/read"
                        element={<ReadCategorias />}
                    />
                    {/* Rutas Dashboard */}
                    <Route exact path="/admin/home" element={<Home />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
