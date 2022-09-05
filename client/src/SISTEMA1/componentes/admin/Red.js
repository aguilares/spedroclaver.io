import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal, ModalHeader, ModalFooter, ModalBody, Form } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './css/icono.css';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ContenedormensajeError, ContenedorMensajeExito } from '../../../elementos/estilos';


import Evento from './Evento/eventos' // eventos como cerrar y abrir ventanas modales de insertar y eliminar
import useAuth from "../../../Auth/useAuth" // verificacion de la existencia de la sesion

import { ComponenteInputCampo } from '../../../elementos/input';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import url from '../../../Auth/varEntorno'   // variables globales que estan disponibles para todo el sistema client


import { useEffect, useState } from "react";
import { red as reds } from '../../services/red';  // conexion a la api mediante la url


function Red() {
    const [inicio, setInicio] = useState(1)
    const [limite, setLimite] = useState(10)


    const [red, setRed] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [form, setForm] = useState({ id: '', nombre: '', valido: null })
    const [formEdit, setFormEdit] = useState({ id: '', nombre: '', valido: null })
    const [formElim, setFormElim] = useState({ id: '', nombre: '', valido: null })
    const [formBuscar, setFormBuscar] = useState({ id: '', nombre: '', valido: null })

    const [formulario, setFormulario] = useState(0) //0 ; sin error, 1: error llenado del formulario, 2: errores desde la API
    const [formularioEdit, setFormularioEdit] = useState(0) //0 ; sin error, 1: error llenado del formulario, 2: errores desde la API
    const [formularioBuscar, setFormulariobuscar] = useState(0) //0 ; sin error, 1: error llenado del formulario, 2: errores desde la API

    const [mensaje, setMensaje] = useState('')
    const [mensajeEdit, setMensajeEdit] = useState('')
    const [mensajeElim, setMensajeElim] = useState('')
    const [mensajeBuscar, setMensajeBuscar] = useState('')

    const auth = useAuth()
    useEffect(() => {

        fetchRed()

    }, [])


    const fetchRed = async () => {
        try {
            await reds(1, auth).then(json => {
                setRed(json.data)
            })

        } catch (error) {
            auth.logout()
        }

    }


    const insertar = async (e) => {

        e.preventDefault()  //para que la pagina no se recargue

        if (form.valido === 'true') {

            try {
                await reds(2, auth, form).then(json => {

                    // console.log(json, 'estado del servidores ultimo')
                    if (json.data.status === 2) {
                        setMensaje('error sql, consulte con el administrador')
                        setFormulario(2)

                    }
                    if (json.data.status === 4) {
                        setMensaje('error del sistema, consulte con el administrador !')
                        setFormulario(2)

                    }
                    if (json.data.status === 5) {
                        setMensaje('error al validar los campos')
                        setFormulario(2)

                    }
                    if (json.data.status === 3) {
                        setMensaje('  ya existe la informacion ! ')
                        setFormulario(2)

                    }
                    if (json.data.status === 1) {
                        //mostramos un mensaje de exito
                        setMensaje('El regitro se realizó correctamente')
                        setFormulario(3)

                        fetchRed()
                    }
                })
            } catch (error) {
                auth.logout()

            }

        } else {
            setMensaje('Por favor rellene bien los campos!!!')
            setFormulario(1)

        }
        setForm({ id: '', nombre: "", valido: null })
    }

    const editar = async (e) => {

        e.preventDefault()
        if (formEdit.valido === 'true') {

            try {
                await reds(3, auth, formEdit).then(json => {

                    if (json.data.status === 2) {
                        setMensajeEdit('error sql, consulte con el administrador')
                        setFormularioEdit(2)

                    }
                    if (json.data.status === 4) {
                        setMensajeEdit('error del sistema, consulte con el administrador !')
                        setFormularioEdit(2)

                    }
                    if (json.data.status === 5) {
                        setMensajeEdit('error al validar los campos')
                        setFormularioEdit(2)

                    }
                    if (json.data.status === 3) {
                        setMensajeEdit('  ya existe la informacion ! ')
                        setFormularioEdit(2)

                    }
                    if (json.data.status === 1) {
                        //mostramos un mensaje de exito

                        fetchRed()
                        setFormularioEdit(0)
                        setModalEditar(false)
                        setMensajeEdit('')

                    }
                })
            } catch (error) {
                auth.logout()
            }

        } else {
            setMensajeEdit('Por favor rellene bien los campos!!!')
            setFormularioEdit(1)
        }
        setFormEdit({ id: '', nombre: "", valido: null })
    }



    const eliminar = async (e) => {

        // console.log(form, 'formulario llenado')
        e.preventDefault()
        if (formElim.valido != 'true') {
            setMensajeElim('no se selecciono ningun elemento')
            return
        }

        try {

            await reds(4, auth, formElim).then(json => {

                if (json.data.status === 2) {

                    setMensajeElim('error sql, consulte con el administrador, puede que la tabla sea la matriz')
                }
                if (json.data.status === 4) {
                    setMensajeElim('error del sistema, consulte con el administrador !')

                }
                if (json.data.status === 5) {
                    setMensajeElim('error al validar los campos')
                }

                if (json.data.status === 1) {
                    //mostramos un mensaje de exito
                    setMensajeElim('el registro de ha eliminado correctamente ... ')
                    fetchRed()
                }

            })
        } catch (error) {
            auth.logout()

        }

        setFormElim({ id: '', nombre: "", valido: null })
    }


    const buscar = async (e) => {

        // console.log(formBuscar, 'formulario llenado')
        e.preventDefault()
        if (formBuscar.valido != 'true') {
            setMensajeBuscar('Rellene bien los campos !')
            setFormulariobuscar(1)
            return
        }
        
        try {

            await reds(5, auth, formBuscar).then(json => {

                if (json.data.status === 2) {

                    setMensajeBuscar('error sql, consulte con el administrador, puede que el registro sea la matriz')
                    setFormulariobuscar(2)

                }
                if (json.data.status === 4) {
                    setMensajeBuscar('error del sistema, consulte con el administrador !')
                    setFormulariobuscar(2)

                }
                if (json.data.status === 5) {
                    setMensajeBuscar('error al validar los campos')
                    setFormulariobuscar(2)

                }
                if (json.data.status === 3) {
                    setMensajeBuscar(' no existe el registro requerido ')
                    setFormulariobuscar(2)

                }
                if (json.data) {
                    //mostramos un mensaje de exito
                    setMensajeBuscar('detalles del registro ... ')
                    setFormulariobuscar(0)

                    console.log('llenado de la tabla', json.data)
                    setRed(json.data)

                } else {
                    fetchRed()
                    setMensajeBuscar('no se encontraron registros ')
                }
            })
        } catch (error) {
            auth.logout()

        }

        setFormBuscar({ id: '', nombre: "", valido: null })
    }




    const ok = () => {
        setFormulario(null)
        setFormularioEdit(null)
        setFormulariobuscar(null)

        setMensaje('')
        setMensajeEdit('')
        setMensajeElim('')
        setMensajeBuscar('')
    }

    const anterior = () => {

        if (inicio >= 1) {
            setInicio(inicio - 10)
            setLimite(limite - 10)
        }
        else {
            alert('ya se encuentra en la lista inicial')
        }
    }

    const siguiente = () => {
        // console.log('siguiete: ', limite)
        setInicio(inicio + 10)
        setLimite(limite + 10)
    }
    return (
        <>

            <div className="  card mt-3 pl-0 pl-md-0 pl-sm-0 pl-lg-0 pr-0 pr-md-0 pr-sm-0 pr-lg-0 ml-0 ml-sm-0 ml-md-0 ml-lg-0 mr-0 mr-md-0 mr-sm-0 mr-lg-0 ">
                <div className="row">
                    <div className="mt-2 ml-1 col-lg-8 col-md-8 col-sm-8 col-6 ">
                        <Button color="success" className="registrar" onClick={() => Evento.mostrarModalInsetar(setModalInsertar, setMensaje)} >Nueva Red </Button>
                    </div>
                    <div className=" mt-2 col-lg-3 col-md-2 col-sm-3 col-5 pr-0 pl-0 ml-0">
                        <form className="mr-0">
                            <div className="input-group">
                                {/* <input className="form-control form-control-sm mr-0 ml-0 pr-0 pl-" type="text" placeholder="C.I." aria-label="Search for..." aria-describedby="btnNavbarSearch" /> */}
                                <ComponenteInputCampo
                                    estado={formBuscar}
                                    cambiarEstado={setFormBuscar}
                                    tipo="text"
                                    name="nombre"
                                    placeholder="red"
                                    ExpresionRegular={url.nombre}  //expresion regular
                                    className_="form-control form-control-sm mr-0 ml-0 pr-0 pl-"
                                    validar={formBuscar.nombre}

                                    evento={true}  //si el boton esta dentro de la input, en caso del casillero buscar
                                    eventoBoton={buscar}
                                />
                            </div>
                        </form>
                        {formularioBuscar === 2 && <ContenedormensajeError onClick={() => ok()} >
                            <p>
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                                <b>Error:  </b> {mensajeBuscar}
                            </p>
                        </ContenedormensajeError>}
                        {formularioBuscar === 1 && <ContenedormensajeError onClick={() => ok()} >
                            <p>
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                                <b>Error:  </b> {mensajeBuscar}
                            </p>
                        </ContenedormensajeError>}
                    </div>
                </div>
                <br />
                <div>
                    <div className="table table-responsive ml-0 ">

                    {mensajeElim != '' && < ContenedorMensajeExito onClick={() => ok()}>{mensajeElim}</ContenedorMensajeExito>}

                        <Table className="col-12 col-sm-7 col-md-5 col-lg-5 table-striped table table-sm">
                            

                            <thead>
                                <tr >
                                    <th className="col-6 col-sm-6 col-md-4 col-lg-4 pl-lg-4 pl-md-4 pl-sm-4 pl-3 pr-2 pr-lg-0 pr-md-0 pr-sm-0">RED</th>
                                </tr>
                            </thead>
                            <tbody>

                                {red.map((r) => ( 
                                    <tr >
                                        <td className="pl-lg-2 pl-md-2 pl-sm-2 pr-3 col-6 col-sm-6 col-md-4 col-lg-4" >{r.nombre}</td>

                                        <td className="pl-lg-5 pl-md-4 pl-sm-4 pr-0 pr-lg-1 pr-md-1 pr-sm-1">
                                            <Button color="primary"
                                                onClick={() => Evento.mostrarModalEditar(setModalEditar, setFormEdit, r, setMensajeEdit)}><FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </td>
 
                                        <td className="pl-lg-0 pl-md-0 pl-sm-0 pr-0 pr-lg-2 pr-md-2 pr-sm-2">
                                            <Button color="danger"
                                                onMouseUp={() => Evento.eliminar(setFormElim, r)} onClick={eliminar}><FontAwesomeIcon icon={faTrashAlt} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>

                            </tfoot>
                        </Table>
                    </div>

                    <div className='row ' >
                        <div className='col-4 col-lg-1 col-md-1 col-sm-2 ml-0 pl-0 pr-0 mr-0'><button className='btn btn-primary-outline  ml-1 text-primary'
                            onClick={anterior}>{'<<'}anterior</button></div>

                        <div className='col-3 col-lg-1 col-md-1 col-sm-2 ml-1 pl-0 pr-0 mr-1 mt-2 ' >{''} {inicio}{' a '}{limite}{''}</div>
                        <div className='col-4 col-lg-2 col-md-2 col-sm-2 ml-0 pl-0 pr-0 mr-0'><button className='btn btn-primary-outline mb-2 text-primary '
                            onClick={siguiente}>siguiente {'>>'} </button></div>

                    </div>
                </div>
            </div>

            <Modal isOpen={modalInsertar}>

                <ModalHeader>
                    <div>
                        <h3>Nuevo Registro</h3>
                        {mensaje != '' &&
                            < ContenedorMensajeExito onClick={() => ok()}>{mensaje}</ContenedorMensajeExito>
                        }
                    </div>
                </ModalHeader>
                <ModalBody>
                    <form>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-2 mt-0 pl-1">
                                <label htmlFor="nombre">Nombre Completo:</label>
                                <ComponenteInputCampo
                                    estado={form}
                                    cambiarEstado={setForm}
                                    tipo="text"
                                    name="nombre"
                                    placeholder="red"
                                    ExpresionRegular={url.nombre}  //expresion regular
                                    className_="form-control form-control-sm"
                                    validar={form.nombre}
                                />
                            </div>
                        </div>
                    </form>
                    <ModalFooter>
                        <button className='btn btn-success' onClick={insertar}>Registrar</button>
                        <button className='btn btn-danger' onClick={() => Evento.ocultarModalInsertar(setModalInsertar, setForm, setMensaje, setFormulario)} >Cancelar</button>
                        {formulario === 1 && <ContenedormensajeError onClick={() => ok()} >
                            <p>
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                                <b>Error:  </b> {mensaje}
                            </p>

                        </ContenedormensajeError>}
                        {formulario === 2 && <ContenedormensajeError onClick={() => ok()} >
                            <p>
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                                <b>Error:  </b> {mensaje}
                            </p>
                        </ContenedormensajeError>}


                    </ModalFooter>
                    {formulario === 3 &&
                        < ContenedorMensajeExito onClick={() => ok()}>{mensaje}</ContenedorMensajeExito>
                    }
                </ModalBody>
            </Modal>

            <Modal isOpen={modalEditar}>
                <ModalHeader>
                    <div>
                        <h3>Modificar Registro</h3>
                        {mensajeEdit != '' &&
                            < ContenedorMensajeExito onClick={() => ok()}>{mensajeEdit}</ContenedorMensajeExito>
                        }
                    </div>
                </ModalHeader>
                <ModalBody>
                    <form>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-2 mt-0 pl-1">
                                <label>Nombre Completo:</label>
                                <ComponenteInputCampo
                                    estado={formEdit}
                                    cambiarEstado={setFormEdit}
                                    tipo="text"
                                    name="nombre"
                                    placeholder="red"
                                    leyendaError=" el campo no cumple con las reglas de validadcion"
                                    ExpresionRegular={url.nombre}
                                    className_="form-control form-control-sm"
                                    validar={formEdit.nombre}
                                />
                            </div>
                        </div>
                    </form>
                    <ModalFooter>
                        <button className='btn btn-success' onClick={editar}>modificar</button>
                        <button className='btn btn-danger' onClick={() => Evento.ocultarModalEditar(setModalEditar, setFormEdit, setMensajeEdit, setFormularioEdit)} >Cancelar
                        </button>
                        {formularioEdit === 1 && <ContenedormensajeError onClick={() => ok()} >
                            <p>
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                                <b>Error:  </b> {mensajeEdit}
                            </p>

                        </ContenedormensajeError>}
                        {formularioEdit === 2 && <ContenedormensajeError onClick={() => ok()} >
                            <p>
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                                <b>Error:  </b> {mensajeEdit}
                            </p>
                        </ContenedormensajeError>}
                    </ModalFooter>
                    {formularioEdit === 3 &&
                        < ContenedorMensajeExito onClick={() => ok()}>{mensajeEdit}</ContenedorMensajeExito>
                    }
                </ModalBody>
            </Modal>
            {/* <Link to = 'paciente/35'>click aqui</Link> */}

            {/* <h1>{ci}</h1> */}

        </>
    );

}
export default Red;
