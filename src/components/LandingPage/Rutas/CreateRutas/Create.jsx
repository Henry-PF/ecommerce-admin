import { getTerminales, createRoute, getCities, getBuses } from '../../../../Redux/actions';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useDispatch, useSelector } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from 'react';
import SideBar from '../../Home/Graficos/SideBar';
import styles from "./Create.module.css";
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';

function Create(props) {
  const dispatch = useDispatch()
  const route = useSelector(state => state.route)
  const buses = useSelector(state => state.buses)
  const cities = props.terminales;
  let data = [];

  if (cities) {
    data = [...cities];
  }

  const [dataRoutes, setDataRoutes] = useState({
    origen: '',
    destino: '',
    fecha_salida: '',
    fecha_llegada: '',
    hora_salida: '',
    hora_llegada: '',
    precio: 0,
    bus: 0,
    capacidad: 0
  });

  const [fechaSalida, setFechaSalida] = useState(null);
  const [fechaLlegada, setFechaLlegada] = useState(null);

  const onSubmit = (values, actions) => {
    const formData = new FormData();

    const capacidad = buses.data?.filter((bus) => bus.id === dataRoutes.bus)

    const dataRoute = {
      origen: dataRoutes.origen,
      destino: dataRoutes.destino,
      fecha_salida: dataRoutes.fecha_salida,
      fecha_llegada: dataRoutes.fecha_llegada,
      hora_salida: values.hora_salida,
      hora_llegada: values.hora_llegada,
      precio: values.precio,
      statud: 1,
      bus: dataRoutes.bus,
      capacidad: capacidad[0].capacidad,
    }
    // formData.append('data', JSON.stringify(dataRoute));
    dispatch(createRoute(dataRoute));
    Swal.fire(
      'Ruta Creada!',
      'La Ruta fue creado exitosamente.',
      'success'
    ).then(() => setDataRoutes({
      origen: '',
      destino: '',
      fecha_salida: '',
      fecha_llegada: '',
      hora_salida: '',
      hora_llegada: '',
      precio: '',
    }))
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({

    // Valores iniciales que vamos a tener en nuestro formulario
    initialValues: {
      origen: "",
      destino: "",
      fecha_salida: "",
      fecha_llegada: "",
      hora_llegada: "",
      hora_salida: "",
      precio: 0,
      bus: '',
    },
    // Esquema de validaciones, que declaramos e importamos

    // Funcion onSubmit que tomara el lugar en cualquier handleSubmit
    onSubmit
  });

  const handleFechaSalida = (date) => {
    const formatDate = date.toLocaleDateString().split('T')[0];;
    setFechaSalida(date)
    setDataRoutes({ ...dataRoutes, fecha_salida: formatDate })
  }
  const handleFechaLlegada = (date) => {
    const formatDate = date.toLocaleDateString().split('T')[0];;
    setFechaLlegada(date)
    setDataRoutes({ ...dataRoutes, fecha_llegada: formatDate })
  }

  useEffect(() => {
    dispatch(getTerminales());
    dispatch(getBuses())
  }, [dispatch])



  return (
    <div className="wrapper">
      {/* Main Sidebar Container */}
      <SideBar></SideBar>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className=''>Create</h1>
              </div>
            </div>
          </div>
        </section>
        {/* /.content */}
        <Form className={styles.container} onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <Form.Group className={styles.formGroup} controlId="formBasicEmail">
              <Form.Label className='text-black'>Ciudad de Origen</Form.Label>
              <Select
                className={styles.form_input}
                isClearable
                options={data?.map(city => ({
                  value: city.id,
                  label: city.nombre,
                }))}
                placeholder='Ciudad de Origen'
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setDataRoutes({ ...dataRoutes, origen: selectedOption.value });
                  } else {
                    setDataRoutes({ ...dataRoutes, origen: '' });
                  }
                }}
                required
              />
            </Form.Group>
            <Form.Group className={styles.formGroup} controlId="formBasicEmail">
              <Form.Label className='text-black'>Ciudad de Destino</Form.Label>
              <Select
                className={styles.form_input}
                isClearable
                options={data?.map(city => ({
                  value: city.id,
                  label: city.nombre
                }))}
                placeholder='Ciudad de Destino'
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setDataRoutes({ ...dataRoutes, destino: selectedOption.value });
                  } else {
                    setDataRoutes({ ...dataRoutes, destino: '' });
                  }
                }}
                required
              />
            </Form.Group>
            <div className={styles.input_name}>
              <Form.Group className={styles.formGroup} >
                <Form.Label className='text-black'>Fecha de Salida</Form.Label>
                <DatePicker
                  className={styles.select}
                  selected={fechaSalida}
                  onChange={(date) => handleFechaSalida(date)}
                  minDate={new Date()}
                  // maxDate={addMonths(new Date(), 1)}
                  name='fecha_salida'
                  dateFormat="dd/MM/yyyy"
                  placeholderText='Fecha de Salida'
                  showDisabledMonthNavigation
                  required
                />
              </Form.Group>
              <Form.Group className={styles.formGroup} >
                <Form.Label className='text-black'>Fecha de Llegada</Form.Label>
                <DatePicker
                  className={styles.select}
                  selected={fechaLlegada}
                  onChange={(date) => handleFechaLlegada(date)}
                  minDate={new Date()}
                  // maxDate={addMonths(new Date(), 1)}
                  name='fecha_llegada'
                  dateFormat="dd/MM/yyyy"
                  placeholderText='Fecha de Llegada'
                  showDisabledMonthNavigation
                  required
                />
              </Form.Group>
            </div>
            <div className={styles.input_name}>
              <Form.Group className={styles.formGroup} controlId="formBasicPassword">
                <Form.Label className='text-black'>Horario de Llegada</Form.Label>
                <Form.Control
                  className={styles.form_input}
                  type="time"
                  placeholder="Horario de Salida"
                  name='hora_salida'
                  value={values.hora_salida}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className={styles.formGroup} controlId="formBasicPassword">
                <Form.Label className='text-black w-100'>Horario de Llegada</Form.Label>
                <Form.Control
                  className={styles.form_input}
                  type="time"
                  placeholder="Horario de Llegada"
                  name='hora_llegada'
                  value={values.hora_llegada}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className={styles.input_name}>
              <FloatingLabel controlId="floatingPassword" label="Valor del Ticket" className="w-100">
                <Form.Control
                  className={styles.form_input}
                  type="number"
                  placeholder="Valor del Ticket"
                  name='precio'
                  value={values.precio}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </div>
            <Form.Group className={styles.formGroup} controlId="formBasicEmail">
              <Form.Label className='text-black'>Seleccionar Autobus</Form.Label>
              <Select
                className={styles.form_input}
                isClearable
                options={buses.data?.map(city => ({
                  value: city.id,
                  label: city.modelo + ' - ' + city.placa,
                }))}
                placeholder='Autobus'
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setDataRoutes({ ...dataRoutes, bus: selectedOption.value });
                  } else {
                    setDataRoutes({ ...dataRoutes, bus: '' });
                  }
                }}
                required
              />
            </Form.Group>

            <Button className='w-100 my-4' variant="primary" type="submit">
              Crear Ruta
            </Button>
          </div>
        </Form>
      </div >
      {/* /.content-wrapper */}
      < footer className="main-footer" >

      </footer >
      {/* Control Sidebar */}
      < aside className="control-sidebar control-sidebar-dark" >
        {/* Control sidebar content goes here */}
      </aside >
      {/* /.control-sidebar */}
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    terminales: state.terminales
  };
}

export default connect(mapStateToProps, null)(Create)