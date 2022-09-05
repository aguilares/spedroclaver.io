import '../../../../../elementos/adminlte.css';
// import { Table, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
// import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';


import url from '../../../../../Auth/varEntorno';  // variables globales que estan disponibles para todo el sistema client

import Inactivo from '../../../../services/ausencias';   // verificacion continua del caso de avandono del equipo por parte del usuario s

import useAuth from "../../../../../Auth/useAuth" // verificacion de la existencia de la sesion
import info from "../../../../../info"
import {
    paciente, salas, camas, seguros, examenes, otroLaboratorio, guardar, verInformacionCompleta, modificar
} from "../services/services"
import {
    Select1, ComponenteInputUser2, ComponenteInputBuscar, ComponenteInputfecha, ComponenteInputUserDisabled, ComponenteInputHora, ComponenteCheck, ComponenteCheck2,
    CheckSimple
} from '../../../../../elementos/input';  // componente input que incluye algunas de las
// import { Cabecera } from '../../../../../elementos/componentes'

import { Label } from '../../../../../elementos/estilos';

import '../../../../../elementos/icono.css';



function FormularioL() {
    const auth = useAuth()
    const [idUsuario, setIdUsuario] = useState(null)
    const [nombre, setNombre] = useState("")
    const [apellido1, setApellido1] = useState("")
    const [apellido2, setApellido2] = useState("")
    const [sistema, setSistema] = useState("")

    const [nivel, setNivel] = useState(null)
    const [rol, setRol] = useState(null)

    const [red, setRed] = useState(null)
    const [municipio, setMunicipio] = useState(null)
    const [distrito, setDistrito] = useState(null)
    const [centro, setCentro] = useState(null)
    const [idCentro, setIdCentro] = useState(null)
    const [unidad, setUnidad] = useState(null)
    const [area, setArea] = useState({ campo: null, valido: null })
    const [idArea, setIdArea] = useState(null)

    let id = useParams() || null


    //MENSAJES AL USUARIO
    const [mensaje, setMensaje] = useState('Por favor!! Asegúrese bien que la informacion proporcionada sea la correcta')

    const listarInfo = async () => {

        try {
            await info(auth).then(json => {
                setIdUsuario(json.data.id)
                setNombre(json.data.personal)
                setApellido1(json.data.apellido1)
                setApellido2(json.data.apellido2)
                setNivel(json.data.nivel)
                setRol(json.data.rol)
                setRed(json.data.red)
                setMunicipio(json.data.municipio)
                setDistrito(json.data.distrito)
                setIdCentro(json.data.idCentro)
                setCentro(json.data.centro)
                setIdArea(json.data.idArea)
                salasRegistro(json.data.idArea)
                setUnidad(json.data.unidad)
                setArea({ campo: json.data.area, valido: 'true' })
                listaExamen(json.data.idCentro)
                segurosRegistro(json.data.idCentro)
                if (id.id > 0) {
                    rellenarForm(json.data.id, id.id)
                }
            })
        } catch {
            auth.logout()
        }
    }

    /// *+***************************************************FORMULARIO****************************************************.
    /// *+***************************************************FORMULARIO****************************************************.
    /// *+***************************************************FORMULARIO****************************************************.
    /// *+***************************************************FORMULARIO****************************************************.



    const [datosSeguros, setDatosseguros] = useState([]) // seguros que estan vigentes en el hospital
    const [datosSalas, setDatosSalas] = useState([])   // salas que estan disponibles en el servicio
    const [datosCamas, setDatosCamas] = useState([]) // camas que estan disponibles en la sala escogida
    const [idSala, setIdSala] = useState({ campo: null, valido: null })
    const [idCama, setIdCama] = useState({ campo: null, valido: null })
    // hospitales con examenes disponibles
    const [otrosLaboratorios, setOtroslaboratorios] = useState([])  // hospitales con examenes

    //listas para los examenes de laboratorio
    const [examen, setExamen] = useState([])
    const [cantidades, setCantidades] = useState([]) // CANTIDAD DE EXAMENES 

    const [otroCentro, setOtroCentro] = useState(false)   //para imponer otro centro en la solicitud | valores true o false


    // en caso de escoger otros centros para solicitar el examen
    const [examenHospital, setExamenHospital] = useState({ campo: null, valido: null })// id de otro hospital escogido


    // ABRIR MODAL
    const [modalVistazo, setModalVistaso] = useState(false)

    const [idSolicitud, setIdSolicitud] = useState(null)
    // const [validacion , setValidacion] = useState(null)
    // const [realizado, setRealizado] = useState(null)
    let fecha = new Date().toLocaleDateString()
    // console.log('fecha de loggg : ', fecha.toLocaleString())
    let año = fecha.split('/')[2]
    let mes = fecha.split('/')[1]
    let dia = fecha.split('/')[0]
    if (mes < 10) {
        mes = 0 + '' + mes }
    if (dia < 10) { 
        dia = 0 + '' + dia}

    const [fechaSolicitud, setFechaSolicitud] = useState({ campo: año + '-' + mes + '-' + dia, valido: 'true' })
    const [idPaciente, setIdPaciente] = useState(null)
    const [ci, setCi] = useState({ campo: null, valido: null })
    const [edad, setEdad] = useState({ campo: null, valido: null })
    const [sexo, setSexo] = useState({ campo: null, valido: null })
    const [nhc, setNhc] = useState({ campo: null, valido: null })
    const [fechaNac, setFechaNac] = useState({ campo: null, valido: null })
    const [nombrePaciente, setNombrePaciente] = useState({ campo: null, valido: null })
    const [diagnostico, setDiagnostico] = useState({ campo: null, valido: null })
    const [HoraSolicitud, setHoraSolicitud] = useState({ campo: new Date().toLocaleTimeString(), valido: 'true' })
    const [HoraTomaMuestra, setHoratomaMuestra] = useState({ campo: new Date().toLocaleTimeString(), valido: 'true' })
    const [idSeguro, setIdseguro] = useState({ campo: null, valido: null })


    //EXAMENES ADMITIDOS POR EL USUARIO
    const [admitidosE, setAdmitidosE] = useState(new Array())
    const [idCentroAtareado, setIdCentroAtareado] = useState(null)
    const [formEdit, setFormEdit] = useState(false)

    const rellenarForm = async (user, sol) => {

        try {
            await verInformacionCompleta(auth, parseInt(user), parseInt(sol)).then(sol => {
                setIdSolicitud(sol.data.solicitud[0].id)
                setFechaSolicitud({ campo: sol.data.solicitud[0].fecha_sol.split('/')[2] + '-' + sol.data.solicitud[0].fecha_sol.split('/')[1] + '-' + sol.data.solicitud[0].fecha_sol.split('/')[0], valido: 'true' })
                setHoraSolicitud({ campo: sol.data.solicitud[0].hora_sol, valido: 'true' })
                setDiagnostico({ campo: sol.data.solicitud[0].diagnostico, valido: 'true' })
                setNhc({ campo: sol.data.solicitud[0].num_historial, valido: 'true' })
                setHoratomaMuestra({ campo: sol.data.solicitud[0].hora_toma_muestra, valido: 'true' })
                setExamenHospital({ campo: sol.data.solicitud[0].idCentroTarea, valido: 'true' })
                // console.log('id d los demas: ', sol.data)
                if (sol.data.idSeguro != null) {
                    setIdseguro({ campo: sol.data.idSeguro, valido: 'true' })
                }
                if (sol.data.idSala != null) {
                    // console.log('campo idSala : ', sol.data.idSala)
                    camasRegistro(sol.data.idSala)
                    setIdSala({ campo: sol.data.idSala, valido: 'true' })
                }
                if (sol.data.idCama != null) {
                    setIdCama({ campo: sol.data.idCama, valido: 'true' })
                }
                setIdPaciente(sol.data.solicitud[0].idPaciente)
                setCi({ campo: sol.data.solicitud[0].ci, valido: 'true' })
                setNombrePaciente({ campo: sol.data.solicitud[0].paciente, valido: 'true' })
                setSexo({ campo: sol.data.solicitud[0].sexo, valido: 'true' })
                setFechaNac({ campo: sol.data.solicitud[0].fechaNac.split('T')[0], valido: 'true' })
                let hoy = new Date()
                let antes = new Date(sol.data.solicitud[0].fechaNac) // formato: yyyy-MM-dd
                let edad1 = hoy.getFullYear() - antes.getFullYear()
                let mes = hoy.getMonth() - antes.getMonth()
                if (mes < 0 || (mes === 0 && hoy.getDate() < antes.getDate())) {
                    edad1--
                }
                setEdad({ campo: edad1, valido: 'true' })
                setFormEdit(true)
            })

        } catch (error) {
            alert('algo salio mal')
            window.location.href = '/ssgl'
        }
    }


    const buscarPaciente = async () => {
        if (ci.valido === 'true') {
            // alert('genial ssl')
            try {
                // console.log("entro a try")
                await paciente(auth, ci.campo).then(json => {

                    if (json.data.status === 5) {
                        setMensaje("ERROR !!!, CONSULTE CON EL ADMINISTRADOR DE SISTEMAS")
                    } else {
                        setIdPaciente(json.data[0].id) // el atributo .id consuce directamente a un error de modo que cuando no se encuentre ningun registro para dicho ci 
                        // el resultado saltara al cath, el valores donde se tiene que insertar listas el vacio [] no surte efecto para el cacth
                        // console.log("termian el try")
                        setCi({ campo: json.data[0].ci, valido: 'true' })
                        setNombrePaciente({ campo: json.data[0].nombre + ' ' + json.data[0].apellido1 + ' ' + json.data[0].apellido2, valido: 'true' })
                        setSexo({ campo: json.data[0].sexo, valido: 'true' })
                        setFechaNac({ campo: json.data[0].fechaNac.split('T')[0], valido: 'true' })
                        let hoy = new Date()
                        let antes = new Date(json.data[0].fechaNac) // formato: yyyy-MM-dd
                        let edad1 = hoy.getFullYear() - antes.getFullYear()
                        let mes = hoy.getMonth() - antes.getMonth()
                        if (mes < 0 || (mes === 0 && hoy.getDate() < antes.getDate())) {
                            edad1--
                        }
                        setEdad({ campo: edad1, valido: 'true' })
                    }
                })
            } catch (error) {
                alert('NO PUDIMOS CARGAR LA INFORMACIION !!!, POR FAVOR VERIFIQUE EN LA LISTA DE LOS PACIENTES')
            }
        }
    }




    const salasRegistro = async (id = null) => {

        try {
            await salas(auth, id).then(json => {
                if (json.data.status === 5) {

                    window.location.href = "/"

                }
                else {
                    setDatosSalas(json.data)
                }
            })
        } catch (error) {
            alert('NO PUDIMOS CARGAR LA LISTA DE SALAS, RECOMENDAMOS RECARGAR LA PAGINA O NO REALIZAR ESTA SOLCITUD')
        }
    }

    const camasRegistro = async (ids = null) => {

        let id = ids || idSala.campo
        try {
            // console.log("id sala: ", idSala)
            await camas(auth, id).then(json => {
                if (json.data.status === 5) {
                    window.location.href = "/"
                }
                else {
                    setDatosCamas(json.data)
                }
            })

        } catch (error) {

        }
    }


    const segurosRegistro = async (id) => {

        if (id) {
            try {
                await seguros(auth, id).then(json => {

                    if (json.data.status === 5) {

                        window.location.href = "/"

                    }
                    else {
                        setDatosseguros(json.data)
                    }
                })

            } catch (error) {
                alert('NO PUDIMOS CARGAR LA LISTA DE LOS SEGUROS DE SE ESTRABLECIMIENTO')
            }
        } else {
            alert('No existe el registro de su centro!! , recargue la pagina, o caso contrario no realice la solicitud')
        }
    }


    const listaExamen = async (id = null) => {
        setOtroslaboratorios([])
        setExamen([])
        setCantidades([])
        try {
            let ids = id || idCentro
            await examenes(auth, ids).then(json => {

                if (json.data.status === 5) {

                    window.location.href = "/"

                }
                else {
                    // console.log('examenes disponibles : ', json.data)
                    setCantidades(json.data.cantidad)

                    setExamen(json.data.examenes)
                }
            })
            setIdCentroAtareado(ids)
            setAdmitidosE(new Array())

        } catch (error) {
            alert('NO PUDIMOS CARGAR LA LISTA DE LOS EXAMENES, RECARGUE LA PAGINA O NO SOLICITE NINGUNA TAREA')
        }
    }

    //LISTA DE EXAMENES DE OTROS CENTRIS
    // se rellena la informacion en la misma variable examen
    const listaExamenOtroCentro = async () => {

        setExamen([])
        setCantidades([])
        if (examenHospital.campo !== null) {
            try {
                await examenes(auth, examenHospital.campo).then(json => {

                    if (json.data.status === 5) {
                        window.location.href = "/"
                    }
                    else {
                        setCantidades(json.data.cantidad)
                        setExamen(json.data.examenes)
                    }
                })

                setIdCentroAtareado(examenHospital.campo)
                setAdmitidosE(new Array())
            } catch (error) {
                alert('NO PUDIMOS CARGAR LA LISTA DE LOS EXAMENES, RECARGUE LA PAGINA O NO SOLICITE NINGUNA TAREA')
            }
        } else {
            alert('NO PUDIMOS CARGAR LA LISTA DE LOS EXAMENES, RECARGUE LA PAGINA O NO SOLICITE NINGUNA TAREA, jaja')
        }

    }

    // buscar otro hospital para los examenes
    const fotroLaboratorio = async () => {
        try {
            await otroLaboratorio(auth).then(json => {
                if (json.data.status === 5) {

                    window.location.href = "/"
                }
                else {
                    setOtroslaboratorios(json.data)
                }
            })
            setAdmitidosE(new Array())
            setExamen([])
            setCantidades([])

        } catch (error) {

            alert('NO PUDIMOS CARGAR LA LISTA DE OTROS CENTROS, RECARGUE LA PAGINA O NO SOLICITE NINGUNA TAREA,  otro centro')
        }
    }

    useEffect(() => {
        listarInfo()
        const inter = setInterval(() => {
            Inactivo(auth)
        }, 10000);
        return inter;
    }, [])


    const vaciarFormulario = () => {
        setIdPaciente(null)
        setCi({ campo: null, valido: null })
        setEdad({ campo: null, valido: null })
        setSexo({ campo: null, valido: null })
        setNhc({ campo: null, valido: null })
        setFechaNac({ campo: null, valido: null })
        setNombrePaciente({ campo: null, valido: null })
        setDiagnostico({ campo: null, valido: null })
        setIdSala({ campo: null, valido: null })
        setIdCama({ campo: null, valido: null })
        setIdseguro({ campo: null, valido: null })
        setAdmitidosE(new Array())
        setExamen([])
        setDatosSalas([])
        setDatosCamas([])
        setDatosseguros([])
        salasRegistro(idArea)
        segurosRegistro(idCentro)
        // console.log(admitidosE, admitidosH, admitidosBs, idCentroAtareado, idCentro)
        if (idCentroAtareado == idCentro) {
            listaExamen()
        }
        else {
            listaExamenOtroCentro()
        }
    }

    const registrar = async () => {
        try {

            if (fechaSolicitud.valido === 'true' && HoraSolicitud.valido === 'true' && HoraTomaMuestra.valido === 'true' && idSeguro.valido === 'true' &&
                nhc.valido === 'true' && diagnostico.valido === 'true' && idArea != null && idPaciente != null && idUsuario != null) {
                // alert("el usuario si es")
                let seleccionExamen = new Array()
                let ce = 0
                admitidosE.forEach(adm => {
                    if (adm !== null) {
                        seleccionExamen[ce] = adm
                        ce++
                    }
                });

                if (seleccionExamen.length > 0) {

                    await guardar(auth, fechaSolicitud.campo, HoraSolicitud.campo, HoraTomaMuestra.campo, nhc.campo, diagnostico.campo, idArea, idCama.campo, idSeguro.campo,
                        idPaciente, idUsuario, seleccionExamen).then(json => {
                            if (json.data.status === 5) {

                                // window.location.href = "/"
                                alert('A OCURRIDO UN ERROR, CONSULTE CON EL ADMINISTRADOR')
                            }
                            if (json.data.status === 1) {
                                alert('OPERACION EXITOSA')
                                // vaciarFormulario()
                            }
                        })
                }
                else {
                    alert("POR FAVOR SELECCIONE AL MENOS UN EXAMEN DE LOS DISPONIBLES")
                }
            }
        } catch (error) {
            alert("FALLÓ LA OPERACION")
        }
    }

    const actualizar = async () => {
        try {
            if (idSolicitud != null && fechaSolicitud.valido === 'true' && HoraSolicitud.valido === 'true' && HoraTomaMuestra.valido === 'true' && idSeguro.valido === 'true' &&
                nhc.valido === 'true' && diagnostico.valido === 'true' && idArea != null && idPaciente != null && idUsuario != null) {
                // alert("el usuario si es")
                let seleccionExamen = new Array()
                let ce = 0
                admitidosE.forEach(adm => {
                    if (adm !== null) {
                        seleccionExamen[ce] = adm
                        ce++
                    }
                });

                if (seleccionExamen.length > 0) {
                    await modificar(auth, idSolicitud, fechaSolicitud.campo, HoraSolicitud.campo, HoraTomaMuestra.campo, nhc.campo, diagnostico.campo, idArea, idCama.campo, idSeguro.campo,
                        idPaciente, idUsuario, seleccionExamen).then(json => {
                            if (json.data.status === 5) {
                                // window.location.href = "/"
                                alert('A OCURRIDO UN ERROR, CONSULTE CON EL ADMINISTRADOR')
                            }
                            if (json.data.status === 1) {
                                alert('OPERACION EXITOSA')
                                // vaciarFormulario()
                                window.location.href = "/ssgl"
                            }
                        })
                }
                else {
                    alert("POR FAVOR SELECCIONE AL MENOS UN EXAMEN DE LOS DISPONIBLES")
                }
            }
        } catch (error) {
            alert("FALLÓ LA OPERACION")
        }

        // console.log('terminamos en la funcion')
    }

    return (
        <>
            {/* <body className="hold-transition sidebar-mini">*/}
            <div className="wrapper">
                <div className="content-wrapper-form">
                    <div className="content">
                        {/* <div className='ml-0 mr-0'> */}<div className="container-fluid_mio">
                            <div className="small-box mb-2">
                                <div className="inner">
                                    <div className="font-weight-bold text-center" ><Label >SOLICITUD DE EXAMENES DE LABORATORIO Y SERVICIO DE SANGRE SEGURA </Label></div>
                                </div>
                                <div className="Label-box-footer bg-gray-dark">
                                    <div className="brand-text font-weight-light text-center" > <Label>{red + ' | HOSPITAL ' + centro + ' '}</Label></div>
                                </div>
                            </div>
                            <div className='row mr-0 ml-0'>
                                {/* <div className=" card-body pl-0 ml-0  mr-0 pr-0 mb-3 mb-0 pb-0 row "> */}
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" >
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-2">

                                            <ComponenteInputfecha
                                                estado={fechaSolicitud}
                                                cambiarEstado={setFechaSolicitud}
                                                name="fechaSolicitud"
                                                ExpresionRegular={url.fechas}  //expresion regular
                                                className_="form-control form-control-sm"
                                                etiqueta='FECHA DE SOLICITUD'
                                            />

                                            <ComponenteInputHora
                                                estado={HoraSolicitud}
                                                cambiarEstado={setHoraSolicitud}
                                                name="fechaNac"
                                                ExpresionRegular={url.hora}  //expresion regular
                                                className_="form-control form-control-sm"
                                                etiqueta='HORA DE SOLICITUD'
                                            />
                                            <ComponenteInputHora
                                                estado={HoraTomaMuestra}
                                                cambiarEstado={setHoratomaMuestra}
                                                name="fechaNac"
                                                ExpresionRegular={url.hora}  //expresion regular
                                                etiqueta='HORA TOMA DE MUESTRA'
                                            />
                                        </div>


                                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-2" >

                                            <Select1
                                                name="seguro"
                                                estado={idSeguro}
                                                cambiarEstado={setIdseguro}
                                                ExpresionRegular={url.red}
                                                lista={datosSeguros}
                                                etiqueta='SEGURO'
                                            />


                                            <Select1
                                                name="sala"
                                                estado={idSala}
                                                cambiarEstado={setIdSala}
                                                ExpresionRegular={url.sala}
                                                lista={datosSalas}
                                                funcion1={camasRegistro}
                                                etiqueta='SALA'
                                            />
                                            <div className='row'>
                                                <div className='col-7'>
                                                    <Select1
                                                        name="cama"
                                                        estado={idCama}
                                                        cambiarEstado={setIdCama}
                                                        ExpresionRegular={url.cama}
                                                        lista={datosCamas}
                                                        etiqueta='CAMA'
                                                    >
                                                    </Select1>
                                                </div>

                                                <div className='col-5'>
                                                    <ComponenteInputUser2
                                                        estado={nhc}
                                                        cambiarEstado={setNhc}
                                                        name="nhc"
                                                        placeholder="N.H.CL."
                                                        ExpresionRegular={url.nhc}  //expresion regular
                                                        etiqueta='NHC'
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-2" >

                                            <ComponenteInputBuscar
                                                estado={ci}
                                                cambiarEstado={setCi}
                                                name="ci"
                                                placeholder="C.I."
                                                ExpresionRegular={url.ci}  //expresion regular
                                                eventoBoton={buscarPaciente}
                                                etiqueta='CI'
                                            />
                                            <ComponenteInputUserDisabled
                                                estado={fechaNac}
                                                cambiarEstado={setFechaNac}
                                                name="fechaNac"
                                                ExpresionRegular={url.fechas}  //expresion regular
                                                etiqueta='FECHA DE NACIMIENTO'
                                            />

                                        </div>

                                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-2" >

                                            <ComponenteInputUserDisabled
                                                estado={nombrePaciente}
                                                cambiarEstado={setNombrePaciente}
                                                name="paciente"
                                                ExpresionRegular={url.nombrePersona}  //expresion regular
                                                etiqueta='PACIENTE'
                                            />

                                            <div className='row'>
                                                <div className='col-6'>
                                                    <ComponenteInputUserDisabled
                                                        estado={edad}
                                                        cambiarEstado={setEdad}
                                                        name="edad"
                                                        ExpresionRegular={url.edad}  //expresion regular
                                                        etiqueta='EDAD'
                                                    />
                                                </div>
                                                <div className='col-6'>
                                                    <ComponenteInputUserDisabled
                                                        estado={sexo}
                                                        cambiarEstado={setSexo}
                                                        name="sexo"
                                                        ExpresionRegular={url.sexo}  //expresion regular
                                                        etiqueta='SEXO'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-7 mb-2 row" >
                                            <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                                <ComponenteInputUserDisabled
                                                    estado={area}
                                                    cambiarEstado={setArea}
                                                    name="area"
                                                    ExpresionRegular={url.direccion}  //expresion regular
                                                    etiqueta='SERVICIO'
                                                />
                                            </div>

                                            <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                                <ComponenteInputUser2
                                                    estado={diagnostico}
                                                    cambiarEstado={setDiagnostico}
                                                    name="DIAGNOSTICO"
                                                    ExpresionRegular={url.diagnostico}  //expresion regular
                                                    etiqueta={'DIAGNOSTICO'}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-2" >
                                            <CheckSimple
                                                estado={otroCentro}
                                                cambiarEstado={setOtroCentro}
                                                item='SOLICITAR A OTRO ESTABLECIMIENTO ?'
                                                funcion={fotroLaboratorio} // true se cargaran otros centros con examenes disponibles
                                                funcion2={listaExamen}  // false vuelve a recargar los examenes de nuestro establecimiento

                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-2" >
                                            {otroCentro === true &&
                                                <Select1
                                                    estado={examenHospital} // id del otro hospital en caso de que el usuario escoja otro centro
                                                    cambiarEstado={setExamenHospital}
                                                    ExpresionRegular={url.cama}
                                                    lista={otrosLaboratorios}   // hospitales disponibles a escoger para dicho examen
                                                    funcion1={listaExamenOtroCentro} // se rellena informacion en la misma variable examen desde otra funcion, con otro id
                                                >
                                                </Select1>
                                            }
                                        </div>
                                    </div>
                                </div>



                                {cantidades.map((c) => (

                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        {/* <LabelExamenes>{c.examen}</LabelExamenes> */}
                                        <div className="Label-box-footer bg-gray-dark">
                                            <div className="brand-text font-weight-light text-center" ><Label>{c.examen}</Label></div>
                                        </div>
                                        <div className="mt-1 mb-2 row">

                                            {
                                                examen.map((x) => (
                                                    <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                                        {
                                                            x.itemExamen.length < 45 && x.examen == c.examen &&

                                                            <ComponenteCheck
                                                                id={x.idAsignacion}
                                                                item={x.itemExamen}
                                                                admitidos={admitidosE}
                                                            />

                                                        }

                                                        {
                                                            x.itemExamen.length >= 45 && x.examen == c.examen &&

                                                            <ComponenteCheck2
                                                                id={x.idAsignacion}
                                                                item={x.itemExamen}
                                                                admitidos={admitidosE}
                                                            />
                                                        }

                                                    </div>

                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                                }

                                <div className="card-footer">
                                    <div className='row'>
                                        <div className='col-6 col-xl-8 col-lg-8 col-md-8 col-sm-6'>
                                            <h1></h1>
                                        </div>
                                        <div className='col-12 col-xl-4 col-lg-4 col-md-4 col-sm-6'>
                                            {
                                                formEdit === false && <button className='btn btn-success mr-1 ml-1' onClick={registrar} >Registrar</button>
                                            }

                                            {
                                                formEdit === true && <button className='btn btn-success mr-1 ml-1' onClick={actualizar}>actualizar</button>
                                            }
                                            <a className='btn btn-danger mr-1 ml-1' href='/ssgl' >cancelar</a>

                                            <button className='btn btn-info mr-1 ml-1' onClick={vaciarFormulario}>Limpiar</button>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div>
                    </div >
                </div>
            </div>
            {/* <Modal className='fondo' isOpen={modalVistazo}>

                <ModalHeader>
                    <div>
                        <LabelModal><h3>PRELIMINAR</h3></LabelModal>
                    </div>
                </ModalHeader>
                <ModalBody>

                    <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'PERSONAL : ' + nombre + ' ' + apellido1 + ' ' + apellido2} </LabelModal>
                        </div>
                    </div>
                    <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'RED : ' + red} </LabelModal>
                        </div>
                    </div>
                    <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'MUNICIPIO : ' + municipio} </LabelModal>
                        </div>
                    </div>

                    <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'DISTRITO : ' + distrito} </LabelModal>
                        </div>
                    </div>
                    <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'CENTRO : ' + centro} </LabelModal>
                        </div>
                    </div>
                    <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'UNIDAD : ' + unidad} </LabelModal>
                        </div>
                    </div>
                    <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'SERVICIO : ' + area.campo} </LabelModal>
                        </div>
                    </div>

                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'FECHA DE SOLICITUD :   ' + fechaSolicitud.campo} </LabelModal>
                        </div>
                    </div>

                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'HORA SOLICITUD :   ' + HoraSolicitud.campo} </LabelModal>
                        </div>
                    </div>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'HORA TOMA MUESTRA :   ' + HoraTomaMuestra.campo} </LabelModal>
                        </div>
                    </div>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'DIAGNOSTICO :   ' + diagnostico.campo} </LabelModal>
                        </div>
                    </div>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'NHC :   ' + nhc.campo} </LabelModal>
                        </div>
                    </div>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'PACIENTE :   ' + nombrePaciente.campo} </LabelModal>
                        </div>
                    </div>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'CI :   ' + ci.campo} </LabelModal>
                        </div>
                    </div>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'FECHA DE NACIMIENTO :   ' + fechaNac.campo} </LabelModal>
                        </div>
                    </div>

                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'EDAD :   ' + edad.campo} </LabelModal>
                        </div>
                    </div>

                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'SEXO :   ' + sexo.campo} </LabelModal>
                        </div>
                    </div>


                    {
                        otrosLaboratorios === [] &&

                        <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'CENTRO RECEPTOR SOLICITUD :   ' + centro} </LabelModal>
                            </div>
                        </div>
                    }

                    {
                        otrosLaboratorios !== [] &&
                        otrosLaboratorios.map((lb) => (
                            lb.id === examenHospital.campo &&
                            <div className=" btn btn-sidebar pl-0 pr-0 ">
                                <div className='input-group-append pl-0 pr-0'>
                                    <LabelModal>  {'CENTRO RECEPTOR SOLICITUD :   ' + lb.nombre} </LabelModal>
                                </div>
                            </div>
                        ))
                    }

                    {
                        datosSalas.map((s) => (
                            s.id === idSala.campo &&
                            <div className=" btn btn-sidebar pl-0 pr-0 ">
                                <div className='input-group-append pl-0 pr-0'>
                                    <LabelModal>  {'SALA :   ' + s.nombre} </LabelModal>
                                </div>
                            </div>
                        ))
                    }
                    {
                        datosCamas.map((c) => (

                            c.id === idCama.campo &&
                            <div className=" btn btn-sidebar pl-0 pr-0 ">
                                <div className='input-group-append pl-0 pr-0'>
                                    <LabelModal>  {'CAMA :   ' + c.nombre} </LabelModal>
                                </div>
                            </div>
                        ))

                    }
                    {
                        datosSeguros.map((s)=>(
                            s.id === idSeguro.campo &&
                            <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'SEGURO :   ' + s.nombre} </LabelModal>
                            </div>
                        </div>
                        ))
                    }

                    <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'TAREAS SELECCIONADAS'} </LabelModal>
                        </div>
                    </div>


                    {examen.map((item) => (

                        admitidosE.forEach(a=>{
                            item.idAsignacion === a  &&
                            <div className='col-12'>
                                <div className=" btn btn-sidebar pl-0 pr-0 ">
                                    <div className='input-group-append pl-0 pr-0'>
                                        <LabelModal>  {item.itemExamen + ' | ' + item.examen} </LabelModal>
                                    </div>
                                </div>
                            </div>
                        })

                    ))}


                    <ModalFooter>
                        <button className='btn btn-danger' onClick={() => setModalVistaso(false)} >continuar</button>
                    </ModalFooter>
                </ModalBody>
            </Modal> */}
        </>

    );
}
export default FormularioL;
