import { Route, Routes } from 'react-router-dom';
import Home from './components/LandingPage/Home/Home';
import Login from './components/Login/Login';
/* Rutas Buses */
import Create from './components/LandingPage/Buses/CreateBuses/Create';
import Delete from './components/LandingPage/Buses/DeleteBuses/Delete';
import Update from './components/LandingPage/Buses/UpdateBuses/Update';
import Read from './components/LandingPage/Buses/ReadBuses/Read';
/* Rutas Empresas */
import CreateEmpresas from './components/LandingPage/Empresas/CreateEmpresas/Create';
import DeleteEmpresas from './components/LandingPage/Empresas/DeleteEmpresas/Delete';
import UpdateEmpresas from './components/LandingPage/Empresas/UpdateEmpresas/Update';
import ReadEmpresas from './components/LandingPage/Empresas/ReadEmpresas/Read';
/* Rutas Rutas */
import CreateRutas from './components/LandingPage/Rutas/CreateRutas/Create';
import DeleteRutas from './components/LandingPage/Rutas/DeleteRutas/Delete';
import UpdateRutas from './components/LandingPage/Rutas/UpdateRutas/Update';
import ReadRutas from './components/LandingPage/Rutas/ReadRutas/Read';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import './App.css';
import axios from 'axios'

axios.defaults.baseURL = "https://backend-dev-jnpc.1.us-1.fl0.io/api";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          {/* Rutas Buses */}
          <Route exact path='/admin/buses/create' element={<Create />} />
          <Route exact path='/admin/buses/delete' element={<Delete />} />
          <Route exact path='/admin/buses/update' element={<Update />} />
          <Route exact path='/admin/buses/read' element={<Read />} />
          {/* Rutas Empresas */}
          <Route exact path='/admin/empresas/create' element={<CreateEmpresas />} />
          <Route exact path='/admin/empresas/delete' element={<DeleteEmpresas />} />
          <Route exact path='/admin/empresas/update' element={<UpdateEmpresas />} />
          <Route exact path='/admin/empresas/read' element={<ReadEmpresas />} />
          {/* Rutas Terminales */}
          <Route exact path='/admin/Rutas/create' element={<CreateRutas />} />
          <Route exact path='/admin/Rutas/delete' element={<DeleteRutas />} />
          <Route exact path='/admin/Rutas/update' element={<UpdateRutas />} />
          <Route exact path='/admin/Rutas/read' element={<ReadRutas />} />
          {/* Rutas Dashboard */}
          <Route exact path='/admin/home' element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
