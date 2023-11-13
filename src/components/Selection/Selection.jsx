import React from "react";
import styles from './Selection.module.css';

export default function Selection(){
    return(
        <div>
            <div>
                <h1>INSERTAR NAV Y CON EL REDUX DARLE FUNCIONABILIDAD AL AGREGADO, EDICION Y ELIMINACION DE DATOS</h1>
            </div>

            <div className={styles.container}>
                <div className={styles.div1}>
                    <h2 className={styles.h2}>CREAR</h2>
                    <p class="d-inline-flex gap-1">
                        <a href="create_company" className="btn btn-outline-light" role="button" data-bs-toggle="button">EMPRESA</a>
                        <a href="/create_bus" className="btn btn-outline-light" role="button" data-bs-toggle="button">COLECTIVO</a>
                        <a href="/create_route" className="btn btn-outline-light" role="button" data-bs-toggle="button">RUTA</a>
                    </p>
                </div>

                <div className={styles.div2}>
                    <h2 className={styles.h2}>EDITAR O ELIMINAR</h2>
                    <p class="d-inline-flex gap-1">
                        <a href="/modify_company" class="btn btn-outline-light" role="button" data-bs-toggle="button">EMPRESA</a>
                        <a href="/modify_bus" class="btn btn-outline-light" role="button" data-bs-toggle="button">COLECTIVO</a>
                        <a href="/modify_route" class="btn btn-outline-light" role="button" data-bs-toggle="button">RUTA</a>
                    </p>
                </div>
            </div>
        </div>
    )
}