import styles from "../Graficos.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const Row = ({ usuario, deleteOnClick, updateOnClick }) => {
    return (
        <tr className="jsgrid-row">
            <td className="jsgrid-cell">
                {usuario.persona?.nombre || usuario.usuario}
            </td>
            <td className="jsgrid-cell">{usuario.statud.nombre}</td>
            <td className={styles.td}>
                <button
                    className={styles.button}
                    onClick={() => updateOnClick(usuario.id)}
                >
                    <FontAwesomeIcon
                        icon={faPencil}
                        style={{
                            color: "#a1a1a1cc",
                        }}
                    />
                </button>
            </td>
            <td className={styles.td}>
                <button
                    className={styles.button}
                    onClick={() => {
                        const idUser = {
                            id: usuario.id,
                            id_status: usuario.statud.id,
                        };
                        return deleteOnClick(idUser);
                    }}
                >
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                            color: "#dd3636",
                        }}
                    />
                </button>
            </td>
        </tr>
    );
};

export default Row;
