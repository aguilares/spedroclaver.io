import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom'


import { Table, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt , faBookMedical } from '@fortawesome/free-solid-svg-icons';
// import './css/icono.css';

import useAuth from "../../../Auth/useAuth" // verificacion de la existencia de la sesion
import { HttpPaciente, Listas } from '../../services/paciente';
import { red } from '../../services/red';
import { Select1, ComponenteInputUser, ComponenteInputBuscar, ComponenteInputfecha } from '../../../elementos/input';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import { LeyendaError } from '../../../elementos/estilos';
import url from '../../../Auth/varEntorno'   // variables globales que estan disponibles para todo el sistema client
import info from "../../../info"



import { useState, useEffect } from "react";



function Paciente() {

    const [inicio, setInicio] = useState(0)
    const [limite, setLimite] = useState(9)
    const [inicio1, setInicio1] = useState(0)
    const [limite1, setLimite1] = useState(9)

    const [pacientes, setPaciente] = useState([]);
    const [misPacientes, setMisPaciente] = useState([]);
    const [reds, setRed] = useState([]);
    const [sexos, setSexos] = useState([{ id: "M", nombre: "Masculino" }, { id: "F", nombre: "Femenino" }]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);

    const [id, setId] = useState({ campo: '', valido: null })
    const [ci, setCi] = useState({ campo: '', valido: null })
    const [nombre, setNombre] = useState({ campo: '', valido: null })
    const [apellidoPat, setApellidoPat] = useState({ campo: '', valido: null })
    const [apellidoMat, setApellidoMat] = useState({ campo: '', valido: null })
    const [sexo, setSexo] = useState({ campo: '', valido: null })

    const [fechaNac, setFechaNac] = useState({ campo: '', valido: null })
    // const [validoFecha, setfechaValido] = useState(null) new Date().toString()
    const [celular, setCelular] = useState({ campo: '', valido: null })
    const [telef, setTelef] = useState({ campo: '', valido: null })
    const [direccion, setDireccion] = useState({ campo: '', valido: null })
    const [redes, setRedes] = useState({ campo: '', valido: null })
    const [validacion, setValidacion] = useState({ campo: '', valido: null })
    const [estado, setEstado] = useState({ campo: '', valido: null })


    const [ciBuscar, setCiBuscar] = useState({ campo: '', valido: null })


    //MENSAJES AL USUARIO

    const [mensaje, setMensaje] = useState('')

    //ASIGNACION DE LOS PERMISOS DE LA APLICACION AL USUARIO

    const [usuario, setUsuario] = useState(null)
    const [idUsuario, setIdUsuario] = useState(0)
    const [nivel, setNivel] = useState("")
    const [rol, setRol] = useState("")
    const [personal, setPersonal] = useState("")
    const [apellido1, setApellido1] = useState("")
    const [apellido2, setApellido2] = useState("")


    const auth = useAuth()
    useEffect(() => {
        listarInfo()
        miLista()
        listar()
        listarRed()

    }, [])
    const listarInfo = async () => {
        await info(auth).then(json => {
            setUsuario(json.data.usuario)
            setIdUsuario(json.data.id)
            setNivel(json.data.nivel)
            setRol(json.data.rol)
            setPersonal(json.data.personal)
            setApellido1(json.data.apellido1)
            setApellido2(json.data.apellido2)

            // console.log(json.data, "id del usuario")
        })
    }

    const miLista = async () => {
        // console.log('Usuario: ', idUsuario)
        try {
            await Listas(1, auth, inicio, limite).then(json => {
                setMisPaciente(json.data)
            })

        } catch (error) {
            auth.logout()
        }
    }


    const listar = async () => {
        try {
            Listas(2, auth, inicio1, limite1).then(json => {
                setPaciente(json.data)
            })

        } catch (error) {
            auth.logout()
        }
    }


    const listarRed = () => {
        try {
            red(1, auth).then(json => {
                setRed(json.data)
            })

        } catch (error) {
            auth.logout()
        }

    }

    const asignarValores = (pac) => {
        if (mensaje != '') {
            setMensaje('')
        }
        setId({ campo: pac.id, valido: 'true' })
        setCi({ campo: pac.ci, valido: 'true' })
        setNombre({ campo: pac.nombre, valido: 'true' })
        setApellidoPat({ campo: pac.apellidoPat, valido: 'true' })
        setApellidoMat({ campo: pac.apellidoMat, valido: 'true' })
        setSexo({ campo: pac.sexo, valido: 'true' })
        const receivedDate = pac.fechaNac;
        const formatedDate = receivedDate.split('/').reverse().join('-');
        // console.log('fecha formatado: ', formatedDate)

        // const textDate = new Date(formatedDate).toString()  1997-08-06 ok
        // var tmpfecha = new Date(textDate);
        // tmpfecha.setDate(tmpfecha.getDate() + 1)
        // console.log('fecha en fechaNac. : ',formatedDate)
        setFechaNac({ campo: formatedDate, valido: 'true' })
        setCelular({ campo: pac.celular, valido: 'true' })
        setTelef({ campo: pac.telefono, valido: 'true' })
        setDireccion({ campo: pac.direccion, valido: 'true' })
        setRedes({ campo: pac.idRed, valido: 'true' })
        setValidacion({ campo: pac.validacion, valido: 'true' })
        setEstado({ campo: pac.estado, valido: 'true' })
        if (pac.idPersonal) {
            setIdUsuario(pac.idPersonal)
        }
        else {
            setIdUsuario(idUsuario)
        }
    }

    const abrirModalEditar = (pac) => {
        setMensaje('En caso de exito, esta ventana se cerrara automaticamente')
        asignarValores(pac)
        listarRed()
        setModalEditar(true)
    }

    const ocultarModalInsertar = () => {
        setCi({ campo: '', valido: null })
        setNombre({ campo: '', valido: null })
        setApellidoPat({ campo: '', valido: null })
        setApellidoMat({ campo: '', valido: null })
        setSexo({ campo: '', valido: null })
        setFechaNac({ campo: '', valido: null })
        setCelular({ campo: '', valido: null })
        setTelef({ campo: '', valido: null })
        setDireccion({ campo: '', valido: null })
        setRedes({ campo: '', valido: null })
        setMensaje('')
        setModalInsertar(false)
        listar()
        miLista()
    }
    const ocultarModalEditar = () => {
        setId({ campo: '', valido: null })
        setCi({ campo: '', valido: null })
        setNombre({ campo: '', valido: null })
        setApellidoPat({ campo: '', valido: null })
        setApellidoMat({ campo: '', valido: null })
        setSexo({ campo: '', valido: null })
        setFechaNac({ campo: '', valido: null })
        setCelular({ campo: '', valido: null })
        setTelef({ campo: '', valido: null })
        setDireccion({ campo: '', valido: null })
        setRedes({ campo: '', valido: null })
        setEstado({ campo: '', valido: null })
        setValidacion({ campo: '', valido: null })
        setMensaje('')
        setModalEditar(false)
        listar()
        miLista()
    }



    const insertar = async (e) => {

        console.log("datos del paciente : ", ci, nombre, apellidoPat, apellidoMat, sexo, fechaNac, celular, telef, direccion, redes, idUsuario)

        e.preventDefault()
        if (ci.valido === 'true' && nombre.valido === 'true' && apellidoPat.valido === 'true' && apellidoMat.valido === 'true' && sexo.valido === 'true'
            && fechaNac.valido === 'true' && celular.valido === 'true' && direccion.valido === 'true' && redes.valido === 'true' && idUsuario != '') {

            console.log('ci en la vista: ', ci, idUsuario)

            try {
                await HttpPaciente(2, auth, ci, nombre, apellidoPat, apellidoMat, sexo, fechaNac, celular, telef, direccion, redes, idUsuario).then(json => {
                    // console.log(json, 'estado del servidores ultimo')
                    if (json.data.status === 2) {
                        setMensaje('error sql, consulte con el administrador')

                    }
                    if (json.data.status === 4) {
                        setMensaje('error del sistema, consulte con el administrador !')

                    }
                    if (json.data.status === 5) {
                        setMensaje('error al validar los campos')

                    }
                    if (json.data.status === 3) {
                        setMensaje('Número ci repetido!, ya existe la informacion ')

                    }
                    if (json.data.status === 1) {
                        //mostramos un mensaje de exito
                        setMensaje('El regitro se realizó correctamente')
                    }
                })
            } catch (error) {
                setMensaje('error, consulte con el administrador !!')
            }
        } else {
            setMensaje('Por favor rellene bien los campos!!!')
        }
    }


    const editar = async (e) => {

        e.preventDefault()

        if (id.valido === 'true' && ci.valido === 'true' && nombre.valido === 'true' && apellidoPat.valido === 'true' && apellidoMat.valido === 'true' && sexo.valido === 'true'
            && fechaNac.valido === 'true' && celular.valido === 'true' && direccion.valido === 'true' && redes.valido === 'true' && validacion.valido === 'true', estado.valido === 'true'
            && idUsuario != '') {

            console.log("llega hasta aqui")
            try {
                await HttpPaciente(3, auth, ci, nombre, apellidoPat, apellidoMat, sexo, fechaNac, celular, telef, direccion, redes, idUsuario, id, validacion, estado).then(json => {

                    if (json.data.status === 1) {
                        ocultarModalEditar()
                    }

                    if (json.data.status === 2) {
                        setMensaje('error sql, consulte con el administrador')

                    }
                    if (json.data.status === 3) {
                        setMensaje('ya existe la informacion ! ')


                    }
                    if (json.data.status === 4) {
                        setMensaje('error del sistema, consulte con el administrador !')


                    }
                    if (json.data.status === 5) {
                        setMensaje('error al validar los campos')

                    }

                    if (json.data.status === 7) {
                        setMensaje('no se encuentra el registro en la base de datos !!!')
                    }
                })
            } catch (error) {
                setMensaje('error de sistema!!!, consulte con el administrador.')
            }
        } else {
            setMensaje('Por favor rellene bien los campos!!!')
        }
        // ocultarModalEditar()
    }

    const eliminar = async (pac) => {
        const ok = window.confirm('¿está seguro de eliminar este registro?');
        if (ok === true) {
            asignarValores(pac)

            if (id.valido === 'true' && idUsuario != '') {
                console.log('ci en la vista ', ci)
                try {
                    await HttpPaciente(4, auth, ci, nombre, apellidoPat, apellidoMat, sexo, fechaNac, celular, telef, direccion, redes, idUsuario, id, validacion, estado).then(json => {

                        if (json.data.status === 1) {
                            //mostramos un mensaje de exito
                            setMensaje('El regitro se ha eliminado correctamente')
                            listar()
                            miLista()
                        }

                        if (json.data.status === 2) {
                            setMensaje('error sql, consulte con el administrador')

                        }

                        if (json.data.status === 4) {
                            setMensaje('error del sistema, consulte con el administrador !')

                        }
                        if (json.data.status === 5) {
                            setMensaje('error al validar los campos en el servidor')

                        }

                        if (json.data.status === 7) {
                            setMensaje('no se encuentra el registro en la base de datos !!!')

                        }
                    })
                } catch (error) {
                    setMensaje('error de sistema!!!, consulte con el administrador.')
                }
            } else {
                setMensaje('Por favor rellene bien los campos!!!')
                console.log("no se paso de aqui")
            }
            ocultarModalEditar()
        }
    }

    const mostrarModalInsetar = () => {

        setModalInsertar(true);
        setMensaje('Por favor!! Asegúrese bien que la informacion proporcionada sea la correcta')
        listarRed()
        listarInfo()
    }


    const ok = () => {
        setMensaje('')
    }

    const anterior = () => {
        console.log('inicio: ', inicio)
        if (inicio > 0) {
            setInicio(inicio - 10)
            setLimite(limite - 10)

            miLista()
        }
        else {
            alert('ya se encuentra en la lista inicial')
        }
    }

    const siguiente = () => {
        if (misPacientes) {
            console.log('limite: ', limite)
            setInicio(inicio + 10)
            setLimite(limite + 10)

            miLista()
        }
        else {
            alert('ya se encuentra en la lista final')
        }
    }
    const anterior1 = () => {
        console.log('inicio1: ', inicio1)
        if (inicio1 > 0) {
            setInicio1(inicio1 - 10)
            setLimite1(limite1 - 10)
            listar()
            console.log(inicio1, limite1)
        }
        else {
            alert('ya se encuentra en la lista inicial')
        }
    }

    const siguiente1 = () => {
        if (Paciente) {
            console.log('limite1: ', limite1)
            setInicio1(inicio1 + 10)
            setLimite1(limite1 + 10)
            listar()
        }
        else {
            alert('ya se encuentra en la lista final')
        }
    }

    const buscar = () => {
        if (ciBuscar.valido === 'true') {
            try {
                Listas(3, auth, 0, 0, ciBuscar).then(json => {

                    if (json.data.status === 5) {
                        setMensaje('error al validar los campos')
                    }
                    if (json.data[0].idPersonal === idUsuario) {
                        setMisPaciente(json.data)
                    }
                    else {
                        setPaciente(json.data)
                    }
                })

            } catch (error) {
                auth.logout()
            }
        }
        else {
            setMensaje('Por favor, rellene bien los campos!!')
        }
    }

    // const salir = () => {
    //     auth.logout()
    // }

    // //evento de mouse en cualquier parte de la pantalla del navegador

    // const handleClick = () => {
    //     localStorage.setItem('tiempo', new Date().getMinutes())
    //     // console.log("cookie", cookies.get("tiempo"))

    // }

    // const handleKeyPress = () => {
    //     localStorage.setItem('tiempo', new Date().getMinutes())
    //     // console.log("cookie", cookies.get("tiempo"))
    // }

    const asignarPaciente = (pac) => {
        localStorage.setItem('id', pac.id)
        localStorage.setItem('ci', pac.ci)
        localStorage.setItem('paciente', pac.nombre + ' ' + pac.apellidoPat + ' ' + pac.apellidoMat)
        localStorage.setItem('fechaNac', pac.fechaNac)
        localStorage.setItem('sexo', pac.sexo)

    }

    return (
        <>
            {/* <div className="container-fluid"> */}

                {/* <section className="content"> */}
                {/* <div className="col-12 col-xl-12 ml-sm-0 ml-md-0 pl-lg-0 pl-md-0 pl-sm-0 pl-0 ml-0 pr-0 pr-lg-0 pr-md-0 pr-sm-0 container-fluid "> */}
                    <div className="page-wrapper mr-lg-0 pr-lg-0 ml-lg-0 pl-lg-0">
                        <div className="row">
                            <div className="mt-2 ml-1 col-lg-8 col-md-8 col-sm-8 col-6 ">
                                <Button color="success" className="registrar" onClick={mostrarModalInsetar} >Nuevo Paciente </Button>
                            </div>
                            <div className=" mt-2 col-lg-3 col-md-2 col-sm-3 col-5 pr-0 pl-0 ml-0">
                                <ComponenteInputBuscar
                                    estado={ciBuscar}
                                    cambiarEstado={setCiBuscar}
                                    tipo="text"
                                    name="buscarCi"
                                    placeholder="C.I."
                                    leyendaError=" el campo no cumple con las reglas de validadcion"
                                    ExpresionRegular={url.ci}  //expresion regular
                                    className_="form-control form-control-sm mr-0 ml-0 pr-0 pl-0"
                                    eventoBoton={buscar}
                                />
                            </div>
                        </div>
                        <br />
                        <div>
                            <div className="table table-responsive ml-0 ">
                                Mis Registros
                                <Table id="example12" className="col-12 col-sm-12 col-md-12 col-lg-12 table-striped table table-sm">
                                    <thead>
                                        <tr >
                                            {/* <th className="col-1 col-sm-1 col-md-1-col-lg-1  pl-4 pl-lg-4 pl-md-4 pl-sm-4">Nº</th> */}
                                            <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-4 pl-md-4 pl-sm-4 pl-3 pr-2 pr-lg-0 pr-md-0 pr-sm-0">C.I.</th>
                                            <th className="col-2 col-sm-2 col-md-2 col-lg-2 pl-lg-2 pl-md-2 pl-sm-2 pr-2 pr-lg-2 pr-md-0 pr-sm-2">Paciente</th>
                                            <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-0 pl-md-0 pl-sm-0 pr-2 pr-lg-2 pr-md-2 pr-sm-2">Primer Apellido</th>
                                            <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-0 pl-md-0 pl-sm-0 pr-2 pr-lg-2 pr-md-0 pr-sm-1 ">Segundo Apellido</th>
                                            <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-2 pl-md-3 pl-sm-1 pr-2 pr-lg-2 pr-md-0 pr-sm-4 ">sexo</th>
                                            <th className="col-2 col-sm-2 col-md-2 col-lg-1 pl-lg-2 pl-md-2 pl-sm-4 pr-2 pr-lg-2 pr-md-2 pr-sm-3 ">fecha Nac.</th>
                                            <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-4 pl-md-2 pl-sm-2 pr-3 pr-lg-2 pr-md-0 pr-sm-2">celular</th>
                                            <th className="col-2 col-sm-2 col-md-2 col-lg-2 pl-lg-4 pl-md-0 pl-sm-0 pr-0 pr-lg-2 pr-md-0 pr-sm-2">Dirección</th>
                                            <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-4 pl-md-2 pl-sm-2 pr-0 pr-lg-2 pr-md-0 pr-sm-2">telef.</th>
                                            {/* <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-2 pl-md-2 pl-sm-2 pr-0 pr-lg-2 pr-md-0 pr-sm-2"></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {misPacientes.map((pac) => (


                                            <tr >
                                                <td className="pl-lg-2 pl-md-2 pl-sm-2 pr-3">{pac.ci}</td>
                                                <td className="pl-lg-0 pl-md-0 pl-sm-0 pr-0 pr-lg-0 pr-md-0 pr-sm-0">{pac.nombre}</td>
                                                <td className="pl-lg-0 pl-md-0 pl-sm-0 pr-0 pr-lg-0 pr-md-0 pr-sm-3">{pac.apellidoPat}</td>
                                                <td className="pl-lg-0 pl-md-0 pl-sm-0 pr-0 pr-lg-0 pr-md-0 pr-sm-0">{pac.apellidoMat}</td>
                                                <td className="pl-lg-4 pl-md-4 pl-sm-4 pl-3 pr-lg-0 pr-md-0 pr-sm-0">{pac.sexo}</td>
                                                <td className="pl-lg-0 pl-md-0 pl-sm-0 pl-0 pr-0 pr-lg-0 pr-md-0 pr-sm-0">{pac.fechaNac}</td>
                                                <td className="pl-lg-3 pl-md-0 pl-sm-0 pr-3 pr-lg-2 pr-md-2 pr-sm-3">{pac.celular}</td>
                                                <td className="pl-lg-4 pl-md-0 pl-sm-0 pr-3 pr-lg-0 pr-md-2 pr-sm-0">{pac.direccion}</td>
                                                <td className="pl-lg-4 pl-md-0 pl-sm-0 pr-3 pr-lg-2 pr-md-2 pr-sm-2">{pac.telefono}</td>

                                                {/* OPERACIONES para asignacion de roles */}


                                                {pac != null &&
                                                    <td className="pl-lg-5 pl-md-4 pl-sm-4 pr-0 pr-lg-1 pr-md-1 pr-sm-1"><Button color="primary" onClick={() => abrirModalEditar(pac)}><FontAwesomeIcon icon={faEdit} /></Button></td>
                                                }

                                                {pac != null &&
                                                    <td className="pl-lg-0 pl-md-0 pl-sm-0 pr-0 pr-lg-2 pr-md-2 pr-sm-2"><Button color="danger" onClick={() => eliminar(pac)}><FontAwesomeIcon icon={faTrashAlt} /></Button></td>
                                                }
                                                {pac != null &&
                                                    <td className="pl-lg-0 pl-md-0 pl-sm-0 pr-0 pr-lg-2 pr-md-2 pr-sm-2" onClick={() => asignarPaciente(pac)} ><Link to="/sslformulario"><Button color="danger"  ><FontAwesomeIcon icon={faBookMedical} /> </Button></Link></td>
                                                }

                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>

                                    </tfoot>
                                </Table>
                            </div>
                            <div className='row ' >
                                <div className='col-4 col-lg-1 col-md-1 col-sm-2 ml-0 pl-0 pr-0 mr-0'><button className='btn btn-primary-outline  ml-1 text-primary' onClick={anterior}>{'<<'}anterior</button></div>
                                <div className='col-3 col-lg-1 col-md-1 col-sm-2 ml-1 pl-0 pr-0 mr-1 mt-2 ' >{''} {inicio}{' a '}{limite}{''}</div>
                                <div className='col-4 col-lg-2 col-md-2 col-sm-2 ml-0 pl-0 pr-0 mr-0'><button className='btn btn-primary-outline mb-2 text-primary ' onClick={siguiente}>siguiente {'>>'} </button></div>
                            </div>

                            <div className="table table-responsive ml-0 ">
                                <Table id="example12" className="col-12 col-sm-12 col-md-12 col-lg-12 table-striped table table-sm">
                                    <thead>
                                        <tr >
                                            {/* <th className="col-1 col-sm-1 col-md-1-col-lg-1  pl-4 pl-lg-4 pl-md-4 pl-sm-4">Nº</th> */}
                                            <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-4 pl-md-4 pl-sm-4 pl-3 pr-2 pr-lg-0 pr-md-0 pr-sm-0">C.I.</th>
                                            <th className="col-2 col-sm-2 col-md-2 col-lg-2 pl-lg-2 pl-md-2 pl-sm-2 pr-2 pr-lg-2 pr-md-0 pr-sm-2">Paciente</th>
                                            <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-0 pl-md-0 pl-sm-0 pr-2 pr-lg-2 pr-md-2 pr-sm-2">Primer Apellido</th>
                                            <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-0 pl-md-0 pl-sm-0 pr-2 pr-lg-2 pr-md-0 pr-sm-1 ">Segundo Apellido</th>
                                            <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-2 pl-md-3 pl-sm-1 pr-2 pr-lg-2 pr-md-0 pr-sm-4 ">sexo</th>
                                            <th className="col-2 col-sm-2 col-md-2 col-lg-1 pl-lg-2 pl-md-2 pl-sm-4 pr-2 pr-lg-2 pr-md-2 pr-sm-3 ">fecha Nac.</th>
                                            <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-4 pl-md-2 pl-sm-2 pr-3 pr-lg-2 pr-md-0 pr-sm-2">celular</th>
                                            <th className="col-2 col-sm-2 col-md-2 col-lg-2 pl-lg-4 pl-md-0 pl-sm-0 pr-0 pr-lg-2 pr-md-0 pr-sm-2">Dirección</th>
                                            <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-4 pl-md-2 pl-sm-2 pr-0 pr-lg-2 pr-md-0 pr-sm-2">telef.</th>
                                            {/* <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-2 pl-md-2 pl-sm-2 pr-0 pr-lg-2 pr-md-0 pr-sm-2"></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {pacientes.map((pac) => (


                                            <tr >
                                                <td className="pl-lg-2 pl-md-2 pl-sm-2 pr-3">{pac.ci}</td>
                                                <td className="pl-lg-0 pl-md-0 pl-sm-0 pr-0 pr-lg-0 pr-md-0 pr-sm-0">{pac.nombre}</td>
                                                <td className="pl-lg-0 pl-md-0 pl-sm-0 pr-0 pr-lg-0 pr-md-0 pr-sm-3">{pac.apellidoPat}</td>
                                                <td className="pl-lg-0 pl-md-0 pl-sm-0 pr-0 pr-lg-0 pr-md-0 pr-sm-0">{pac.apellidoMat}</td>
                                                <td className="pl-lg-4 pl-md-4 pl-sm-4 pl-3 pr-lg-0 pr-md-0 pr-sm-0">{pac.sexo}</td>
                                                <td className="pl-lg-0 pl-md-0 pl-sm-0 pl-0 pr-0 pr-lg-0 pr-md-0 pr-sm-0">{pac.fechaNac}</td>
                                                <td className="pl-lg-3 pl-md-0 pl-sm-0 pr-3 pr-lg-2 pr-md-2 pr-sm-3">{pac.celular}</td>
                                                <td className="pl-lg-4 pl-md-0 pl-sm-0 pr-3 pr-lg-0 pr-md-2 pr-sm-0">{pac.direccion}</td>
                                                <td className="pl-lg-4 pl-md-0 pl-sm-0 pr-3 pr-lg-2 pr-md-2 pr-sm-2">{pac.telefono}</td>

                                                {/* OPERACIONES para asignacion de roles */}


                                                {nivel == 1 && rol == 2 &&
                                                    <td className="pl-lg-5 pl-md-4 pl-sm-4 pr-0 pr-lg-1 pr-md-1 pr-sm-1"><Button color="primary" onClick={() => abrirModalEditar(pac)}><FontAwesomeIcon icon={faEdit} /></Button></td>
                                                }
                                                {nivel == 1 && rol == 3 &&
                                                    <td className="pl-lg-5 pl-md-4 pl-sm-4 pr-0 pr-lg-1 pr-md-1 pr-sm-1"><Button color="primary" onClick={() => abrirModalEditar(pac)}><FontAwesomeIcon icon={faEdit} /></Button></td>
                                                }
                                                {nivel == 1 && rol === 3 &&
                                                    <td className="pl-lg-0 pl-md-0 pl-sm-0 pr-0 pr-lg-2 pr-md-2 pr-sm-2"><Button color="danger" onClick={() => eliminar(pac)}><FontAwesomeIcon icon={faTrashAlt} /></Button></td>

                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>

                                    </tfoot>
                                </Table>
                            </div>
                            <div className='row ' >
                                <div className='col-4 col-lg-1 col-md-1 col-sm-2 ml-0 pl-0 pr-0 mr-0'><button className='btn btn-primary-outline  ml-1 text-primary' onClick={anterior1}>{'<<'}anterior</button></div>
                                <div className='col-3 col-lg-1 col-md-1 col-sm-2 ml-1 pl-0 pr-0 mr-1 mt-2 ' >{''} {inicio1}{' a '}{limite1}{''}</div>
                                <div className='col-4 col-lg-2 col-md-2 col-sm-2 ml-0 pl-0 pr-0 mr-0'><button className='btn btn-primary-outline mb-2 text-primary ' onClick={siguiente1}>siguiente {'>>'} </button></div>
                            </div>
                        </div>
                    </div>

                    <Modal isOpen={modalInsertar}>

                        <ModalHeader>
                            <div>
                                <h3>Nuevo Paciente</h3>
                                {mensaje !== '' && <LeyendaError onClick={ok} valido='false' >{mensaje}</LeyendaError>}

                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <form>
                                <div className="row">
                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 mb-2 mt-0 pr-1">
                                        <label>C.I.:</label> <label className='text-danger'>*</label>
                                        <ComponenteInputUser
                                            estado={ci}
                                            cambiarEstado={setCi}
                                            tipo="text"
                                            name="ci"
                                            placeholder="C.I."
                                            leyendaError=" el campo no cumple con las reglas de validadcion"
                                            ExpresionRegular={url.ci}  //expresion regular
                                            className_="form-control form-control-sm"
                                        // mayus='si'
                                        />
                                    </div>
                                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 mb-2 mt-0 pl-1">
                                        <label>Nombre Completo:</label> <label className='text-danger'>*</label>
                                        <ComponenteInputUser
                                            estado={nombre}
                                            cambiarEstado={setNombre}
                                            tipo="text"
                                            name="nombre"
                                            placeholder="Nombre"
                                            leyendaError=" el campo no cumple con las reglas de validadcion"
                                            ExpresionRegular={url.nombrePersona}  //expresion regular
                                            className_="form-control form-control-sm"
                                        // mayus='si'
                                        />
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-12 mr-0 ml-0">
                                        <div className="row">
                                            <div className="form-group col-6 col-sm-6 col-md-6 col-lg-6 mb-2 mt-1 pr-1">
                                                <label>Apellido Paterno</label> <label className='text-danger'>*</label>
                                                <ComponenteInputUser
                                                    estado={apellidoPat}
                                                    cambiarEstado={setApellidoPat}
                                                    tipo="text"
                                                    name="apellidoPat"
                                                    placeholder="apelido Paterno"
                                                    leyendaError=" el campo no cumple con las reglas de validadcion"
                                                    ExpresionRegular={url.persona}  //expresion regular
                                                    className_="form-control form-control-sm"
                                                />
                                            </div>

                                            <div className="form-group col-6 col-sm-6 col-md-6 col-lg-6 mb-2 mt-1 pl-1">
                                                <label className="ml-0">Apellido Materno</label> <label className='text-danger'>*</label>
                                                <ComponenteInputUser
                                                    estado={apellidoMat}
                                                    cambiarEstado={setApellidoMat}
                                                    tipo="text"
                                                    name="apellidoMat"
                                                    placeholder="Apellido Materno"
                                                    leyendaError=" el campo no cumple con las reglas de validadcion"
                                                    ExpresionRegular={url.nombre}  //expresion regular
                                                    className_="form-control form-control-sm"
                                                />
                                            </div>
                                            <div className="form-group col-5 col-sm-6 col-md-6 col-lg-6 mb-2 ">
                                                <label>Sexo:</label><label className='text-danger'>*</label>
                                                <Select1
                                                    name="sexo"
                                                    className_="form-control form-control-sm"
                                                    estado={sexo}
                                                    cambiarEstado={setSexo}
                                                    leyendaError="El campo no cumple con las reglas de validacion"
                                                    ExpresionRegular={url.sexo}
                                                    lista={sexos}
                                                >
                                                </Select1>

                                            </div>

                                            <div className="form-group col-5 col-sm-6 col-md-6 col-lg-6 mb-2">
                                                <label>Fecha de Nac.:</label> <label className='text-danger'>*</label>
                                                <div className="input-group">

                                                    <ComponenteInputfecha
                                                        estado={fechaNac}
                                                        cambiarEstado={setFechaNac}
                                                        name="fechaNac"
                                                        placeholder="red"
                                                        leyendaError=" el campo no cumple con las reglas de validadcion"
                                                        ExpresionRegular={url.fechas}  //expresion regular
                                                        className_="form-control form-control-sm"

                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group col-4 col-sm-5 col-md-5 col-lg-4 mb-2 mt-1 pr-1">
                                                <label><h8>Celular</h8></label> <label className='text-danger'>*</label>
                                                <ComponenteInputUser
                                                    estado={celular}
                                                    cambiarEstado={setCelular}
                                                    tipo="text"
                                                    name="celular"
                                                    placeholder="celular"
                                                    leyendaError=" el campo no cumple con las reglas de validadcion"
                                                    ExpresionRegular={url.celular}  //expresion regular
                                                    className_="form-control form-control-sm"
                                                />
                                            </div>
                                            <div className="form-group col-4 col-sm-4 col-md-4 col-lg-4 mb-2 mt-1 pr-1 pl-1">
                                                <label className="ml-0">Teléf. Opc.</label>
                                                <ComponenteInputUser
                                                    estado={telef}
                                                    cambiarEstado={setTelef}
                                                    tipo="text"
                                                    name="telef"
                                                    placeholder="telefono"
                                                    leyendaError=" el campo no cumple con las reglas de validadcion"
                                                    ExpresionRegular={url.telefono}  //expresion regular
                                                    className_="form-control form-control-sm"
                                                />
                                            </div>
                                            <div className="form-group col-4 col-sm-4 col-md-4 col-lg-4 mb-2 mt-1 pr-1 pl-1">
                                                <label><h8>Red/Salud</h8></label> <label className='text-danger'>*</label>

                                                <Select1
                                                    name="redes"
                                                    className_="form-control form-control-sm"
                                                    estado={redes}
                                                    cambiarEstado={setRedes}
                                                    leyendaError="El campo no cumple con las reglas de validacion"
                                                    ExpresionRegular={url.red}
                                                    lista={reds}
                                                >
                                                </Select1>


                                                {/* {redes.valido === 'false' && <LeyendaError valido={redes.valido} >SELECCIONE EL RED</LeyendaError>} */}
                                            </div>
                                            <div className="form-group col-sm-12 col-md-12 col-lg-12 mb-2">
                                                <label>Dirección </label> <label className='text-danger'>*</label>
                                                <ComponenteInputUser
                                                    estado={direccion}
                                                    cambiarEstado={setDireccion}
                                                    tipo="text"
                                                    name="direccion"
                                                    placeholder="Direccion"
                                                    leyendaError=" el campo no cumple con las reglas de validadcion"
                                                    ExpresionRegular={url.direccion}  //expresion regular
                                                    className_="form-control form-control-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <ModalFooter>
                                <button className='btn btn-success' onClick={insertar}>Registrar</button>
                                <button className='btn btn-danger' onClick={ocultarModalInsertar} >Cancelar</button>
                            </ModalFooter>
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={modalEditar}>
                        <ModalHeader>
                            <div>
                                <h3>Modificar Registro</h3>
                                {mensaje != '' && <LeyendaError onClick={ok} valido='false' >{mensaje}</LeyendaError>}
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <form>
                                <div className="row">



                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 mb-2 mt-0 pr-1">
                                        <label>C.I.:</label>
                                        <ComponenteInputUser
                                            estado={ci}
                                            cambiarEstado={setCi}
                                            tipo="text"
                                            name="ci"
                                            placeholder="red"
                                            leyendaError=" el campo no cumple con las reglas de validadcion"
                                            ExpresionRegular={url.ci}  //expresion regular
                                            className_="form-control form-control-sm"
                                        />
                                    </div>
                                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 mb-2 mt-0 pl-1">
                                        <label>Nombre Completo:</label>
                                        <ComponenteInputUser
                                            estado={nombre}
                                            cambiarEstado={setNombre}
                                            tipo="text"
                                            name="nombre"
                                            placeholder="red"
                                            leyendaError=" el campo no cumple con las reglas de validadcion"
                                            ExpresionRegular={url.persona}  //expresion regular
                                            className_="form-control form-control-sm"
                                        />
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-12 mr-0 ml-0">
                                        <div className="row">
                                            <div className="form-group col-6 col-sm-6 col-md-6 col-lg-6 mb-2 mt-1 pr-1">
                                                <label>Apellido Paterno</label>
                                                <ComponenteInputUser
                                                    estado={apellidoPat}
                                                    cambiarEstado={setApellidoPat}
                                                    tipo="text"
                                                    name="apellidoPat"
                                                    placeholder="apelido Paterno"
                                                    leyendaError=" el campo no cumple con las reglas de validadcion"
                                                    ExpresionRegular={url.persona}  //expresion regular
                                                    className_="form-control form-control-sm"
                                                />
                                            </div>

                                            <div className="form-group col-6 col-sm-6 col-md-6 col-lg-6 mb-2 mt-1 pl-1">
                                                <label className="ml-0">Apellido Materno</label>
                                                <ComponenteInputUser
                                                    estado={apellidoMat}
                                                    cambiarEstado={setApellidoMat}
                                                    tipo="text"
                                                    name="apellidoMat"
                                                    placeholder="Apellido Materno"
                                                    leyendaError=" el campo no cumple con las reglas de validadcion"
                                                    ExpresionRegular={url.persona}  //expresion regular
                                                    className_="form-control form-control-sm"
                                                />
                                            </div>
                                            <div className="form-group col-5 col-sm-6 col-md-6 col-lg-6 mb-2 ">
                                                <label>Sexo:</label><label className='text-danger'>*</label>
                                                <Select1
                                                    name="sexo"
                                                    className_="form-control form-control-sm"
                                                    estado={sexo}
                                                    cambiarEstado={setSexo}
                                                    leyendaError="El campo no cumple con las reglas de validacion"
                                                    ExpresionRegular={url.sexo}
                                                    lista={sexos}
                                                >
                                                </Select1>

                                            </div>
                                            <div className="form-group col-7 col-sm-6 col-md-6 col-lg-6 mb-2">
                                                <label>Fecha de Nac.:</label>
                                                <div className="input-group">
                                                    <ComponenteInputfecha
                                                        estado={fechaNac}
                                                        cambiarEstado={setFechaNac}
                                                        tipo="date"
                                                        name="fechaNac"
                                                        placeholder="red"
                                                        leyendaError=" el campo no cumple con las reglas de validadcion"
                                                        ExpresionRegular={url.fechas}  //expresion regular
                                                        className_="form-control form-control-sm"
                                                        isCalendar='far fa-calendar-alt'

                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group col-4 col-sm-5 col-md-5 col-lg-4 mb-2 mt-1 pr-1">
                                                <label><h8>Celular</h8></label>
                                                <ComponenteInputUser
                                                    estado={celular}
                                                    cambiarEstado={setCelular}
                                                    tipo="text"
                                                    name="celular"
                                                    placeholder="celular"
                                                    leyendaError=" el campo no cumple con las reglas de validadcion"
                                                    ExpresionRegular={url.celular}  //expresion regular
                                                    className_="form-control form-control-sm"
                                                />

                                            </div>

                                            <div className="form-group col-4 col-sm-4 col-md-4 col-lg-4 mb-2 mt-1 pr-1 pl-1">
                                                <label className="ml-0">Teléf. Opc.</label>
                                                <ComponenteInputUser
                                                    estado={telef}
                                                    cambiarEstado={setTelef}
                                                    tipo="text"
                                                    name="telef"
                                                    placeholder="telefono"
                                                    leyendaError=" el campo no cumple con las reglas de validadcion"
                                                    ExpresionRegular={url.telefono}  //expresion regular
                                                    className_="form-control form-control-sm"
                                                />
                                            </div>
                                            <div className="form-group col-4 col-sm-4 col-md-4 col-lg-4 mb-2 mt-1 pr-1 pl-1">
                                                <label><h8>Red/Salud</h8></label> <label className='text-danger'>*</label>

                                                <Select1
                                                    name="redes"
                                                    className_="form-control form-control-sm"
                                                    estado={redes}
                                                    cambiarEstado={setRedes}
                                                    leyendaError="El campo no cumple con las reglas de validacion"
                                                    ExpresionRegular={url.red}
                                                    lista={reds}
                                                >
                                                </Select1>

                                            </div>
                                            <div className="form-group col-sm-12 col-md-12 col-lg-12 mb-2">
                                                <label>Dirección </label>
                                                <ComponenteInputUser
                                                    estado={direccion}
                                                    cambiarEstado={setDireccion}
                                                    tipo="text"
                                                    name="direccion"
                                                    placeholder="Direccion"
                                                    leyendaError=" el campo no cumple con las reglas de validadcion"
                                                    ExpresionRegular={url.direccion}  //expresion regular
                                                    className_="form-control form-control-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <ModalFooter>
                                <button className='btn btn-success' onClick={e => editar(e)}>modificar</button>
                                <button className='btn btn-danger' onClick={ocultarModalEditar} >Cancelar</button>
                            </ModalFooter>
                        </ModalBody>
                    </Modal>
                {/* </div> */}
            {/* </div> */}
        </>
    );

}
export default Paciente;
