import React, { useEffect } from 'react'
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from 'react-redux';
import { getFacturasMap } from '../../../../Redux/actions';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function GraficosFactura() {

    const dispatch = useDispatch();
    const beneficios = useSelector(state => state.beneficios);

    const meses = ["Enero", "Febrero", "Marzi", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

   
    let data = {
        labels: meses,
        datasets: [
            {
                label: "Compras",
                data: beneficios,
                backgroundColor: "rgba(0, 220, 195, 0.5)"
            }
        ]
    };

    let misOpciones = {
        responsive: true,
        animation: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                min: 0,
                max: 100
            },
            x: {
                ticks: { color: "rgba(0, 220, 195)" }
            }
        }
    };

    useEffect(() => {
        dispatch(getFacturasMap());
    }, []);

    return (
        <Bar data={data} options={misOpciones} />
    )
}
