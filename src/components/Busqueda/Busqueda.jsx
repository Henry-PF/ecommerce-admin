import { useState } from "react";
import { useDispatch } from "react-redux";

const Busqueda = ({ despachar }) => {
    const dispatch = useDispatch();
    const [ingreso, setIngreso] = useState();
    const handleChange = (e) => {
        setIngreso(e.target.value);
        dispatch(despachar(e.target.value));
    };
    return (
        <div>
            <input
                type="text"
                placeholder="Ingrese lo que desea buscar..."
                onChange={handleChange}
                value={ingreso}
                className="form-control"
            />
        </div>
    );
};

export default Busqueda;
