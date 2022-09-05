import '../../../../../elementos/adminlte.css';

import { useEffect, useState } from "react";
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';


import url from '../../../../../Auth/varEntorno';  // variables globales que estan disponibles para todo el sistema client

import useAuth from "../../../../../Auth/useAuth" // verificacion de la existencia de la sesion
import info from "../../../../../info"
import {
    cantidadA, cantidadP, cantidadR, vercantidadA, vercantidadP,
    vercantidadR, buscarSolicitud, verInformacionCompleta, eliminar
} from "../services/services"
import { ComponenteInputBuscar, Vista, VerPdf } from '../../../../../elementos/input';  // componente input que incluye algunas de las
// import { Cabecera } from '../../../../../elementos/componentes'

import { Parrafos } from '../../../../../elementos/estilos';

import '../../../../../elementos/icono.css';


function RegistrosL() {
    const auth = useAuth()

    // ***************************************VARIABLES COMPARTIDOS*******************************************

    const [ciBuscar, setCiBuscar] = useState({ campo: null, valido: null })
    const [registros, setRegistros] = useState(null)
    const [presentacion, setPresentacion] = useState(true)
    const [cantidad, setCantidad] = useState([]) // cantidad de solicitudes en inicio y registros

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
    const [pdf, setPdf] = useState(null)


    const [mensaje, setMensaje] = useState('Por favor!! Asegúrese bien que la informacion proporcionada sea la correcta')

    const [modalVistazo, setModalVistaso] = useState(false)
    const [solicitud, setSolicitud] = useState(null)



    const listarInfo = async () => {

        try {
            await info(auth).then(json => {
                setIdUsuario(json.data.id)
                setNombre(json.data.personal)
                setApellido1(json.data.apellido1)
                setApellido2(json.data.apellido2)
                cantidad_solex(json.data.id)
                setNivel(json.data.nivel)
                setRol(json.data.rol)
                setRed(json.data.red)
                setMunicipio(json.data.municipio)
                setDistrito(json.data.distrito)
                setIdCentro(json.data.idCentro)
                setCentro(json.data.centro)
                setIdArea(json.data.idArea)
                setUnidad(json.data.unidad)
                setArea({ campo: json.data.area, valido: 'true' })
                // console.log(idCentro)
            })
        } catch {
            auth.logout()
        }
    }

    // ****************************************************************PRESENTACION******************************************************
    // ****************************************************************PRESENTACION******************************************************
    // ****************************************************************PRESENTACION******************************************************
    // ****************************************************************PRESENTACION******************************************************
    const [aceptados, setAceptados] = useState(0)
    const [rechazados, setRechazados] = useState(0)
    const [pendientes, setPendientes] = useState(0)



    // ************************************************ver cantidad de solicitudes aceptados rechazados y pendientes, solo en numeros*****************************************
    const cantidad_solex = async (id) => {
        if (id != null) {
            try {
                await cantidadA(auth, id).then(json => {
                    // console.log(json)
                    setAceptados(json.data.a)
                })
                await cantidadP(auth, id).then(json => {
                    setPendientes(json.data.p)
                })
                await cantidadR(auth, id).then(json => {
                    setRechazados(json.data.r)
                })
            } catch {
                alert('alerta alerta !!')
            }
        }
    }
    //*******************************************************REGISTROS ACEPTADOS**************************************************************************** */
    // const [idSeguroSends, setIdeSegurosends] = useState(null)
    // const [nombreSegurosSends, setNombreSegurosSends] = useState(null)
    // const [idCamaSends, setIdCamaSends] = useState(null)
    // const [numeroCamaSends, setNumeroCamaSends] = useState(null)
    // const [idSalaSends, setIdSalaSends] = useState(null)
    // const [salaSends, setSalaSends] = useState(null)

    const fcantidad_a = async () => {
        if (idUsuario !== null) {
            try {
                await vercantidadA(auth, idUsuario).then(json => {
                    // console.log(json)
                    setCantidad(json.data)
                })

                setPresentacion(false)
                setRegistros(true)
            } catch {
                alert('NO PUDIMOS CARGAR LA INFORMACION, POR FAVOR PONGASE EN CONTACTO CON EL ADMINISTRADOR')
            }
        }
    }
    // ****************************************************registros pendientes**********************************************************************************
    const fcantidad_p = async () => {
        if (idUsuario !== null) {
            try {
                await vercantidadP(auth, idUsuario).then(json => {
                    // console.log(json)
                    setCantidad(json.data)
                })
                setPresentacion(false)
                setRegistros(true)

            } catch {
                alert('NO PUDIMOS CARGAR LA INFORMACION, POR FAVOR PONGASE EN CONTACTO CON EL ADMINISTRADOR')
            }
        }
    }
    // ***************************************************************registros rechazados***********************************************************************
    const fcantidad_r = async () => {
        if (idUsuario !== null) {
            try {
                console.log('entro a cargar datos')
                await vercantidadR(auth, idUsuario).then(json => {
                    // console.log(json.data.solicitud)
                    setCantidad(json.data)
                    // cantidad_solex()
                })
                setRegistros(true)
                setPresentacion(false)
                console.log('estamos en true')

            } catch {
                alert('NO PUDIMOS CARGAR LA INFORMACION, POR FAVOR PONGASE EN CONTACTO CON EL ADMINISTRADOR')
            }
        }
    }

    // ***********************************************************BUSCAR REGISTROS CON CI O NHC****************************************************************
    const f_buscarSolicitud = async () => {

        if (idUsuario !== null, ciBuscar.valido === 'true') {
            try {
                await buscarSolicitud(auth, idUsuario, ciBuscar.campo).then(json => {
                    // console.log(json.data)
                    setCantidad(json.data)
                })
                setPresentacion(false)
                setRegistros(true)
            } catch {
                alert('no se puede cargar los rsultados !!!')
            }
        }
    }

    useEffect(() => {
        listarInfo()
    }, [])


    // ***************************************************************CAMBIO DE VENTANAS*********************************************************
    // ***************************************************************CAMBIO DE VENTANAS*********************************************************
    // ***************************************************************CAMBIO DE VENTANAS*********************************************************
    // ***************************************************************CAMBIO DE VENTANAS*********************************************************

    const miPresentacion = () => {
        setPresentacion(true)
        setRegistros(false)
    }

    const edicion = (id) => {
        return (
            window.location.href = "/form/" + id
        );
    }

    const ver = async (id) => {
        try {
            await verInformacionCompleta(auth, idUsuario, id).then(json => {
                setSolicitud(json.data)
            })
            setModalVistaso(true)
        } catch (error) {
            window.location.href = '/ssgl'
        }
    }

    const eliminarSol = async (id) => {
        let ok = window.confirm('DESEA ELIMINAR ESTE REGISTRO ?')
        if (ok) {
            await eliminar(auth, id, idUsuario).then(json => {
                if (json.data.status === 1) {
                    alert('OPERACION EJECUTADA EXITOSAMENTE')
                    fcantidad_p()
                }
            })
        }
    }

    const verPdf = async (id) => {
        // console.log('revision acepatada')
        try {
            await verInformacionCompleta(auth, idUsuario, id).then(json => {
                setSolicitud(json.data)
                // console.log(json.data)
                setPdf(true)
            })
        } catch (error) {
            window.location.href = '/ssgl'
        }
    }

    // const cargarSol = async(id) => {
    //     try {
    //         await verInformacionCompleta(auth, idUsuario, id).then(json => {
    //             setSolicitud(json.data)
    //             // console.log(json.data)
    //         })
    //     } catch (error) {
    //         window.location.href = '/ssgl'
    //     }
    // }

    return (
        <>
            {pdf ?
                <>
                    <div className="row">
                        <a class="nav-link bg-light" data-widget="iframe-scrollleft" onClick={() => setPdf(null)}><i class="fas fa-angle-double-left"></i></a>
                    </div>

                    <PDFViewer style={{ width: '100%', height: '90vh' }}>
                        <VerPdf solicitud={solicitud} />
                    </PDFViewer>
                </>
                : <>

                    {presentacion === true &&
                        <div className="page-wrapper mr-lg-0 pr-lg-0 ml-lg-0 pl-lg-0">
                            <div className='col-12 col-xl-9 col-lg-9 col-md-9 col-sm-9'>
                                <div className="row">
                                    <div className="mt-2 col-lg-8 col-md-8 col-sm-8 col-12 ">
                                        <h1></h1>
                                    </div>
                                    <div className=" mt-2 col-lg-4 col-md-4 col-sm-4 col-6">
                                        <ComponenteInputBuscar
                                            estado={ciBuscar}
                                            cambiarEstado={setCiBuscar}
                                            tipo="text"
                                            name="buscarCINHC"
                                            placeholder="C.I. | N.H.C. "
                                            leyendaError=" el campo no cumple con las reglas de validadcion"
                                            ExpresionRegular={url.cinhc}  //expresion regular
                                            className_="form-control form-control-sm mr-0 ml-0 pr-0 pl-0"
                                            eventoBoton={f_buscarSolicitud}
                                            etiqueta='CI|NHC'
                                        />
                                    </div>

                                </div>
                                <br />
                                <div className='row'>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 pt-3">
                                        <div className="small-box bg-success">
                                            <div className="inner">
                                                <h3>{aceptados}</h3>
                                                <p>Aceptados</p>
                                            </div>
                                            <div className="icon">
                                                <i className="ion ion-bag"></i>
                                            </div>
                                            {
                                                aceptados > 0 &&
                                                <a href="#" className="small-box-footer" onClick={fcantidad_a}>ver mas <i className="fas fa-arrow-circle-right"></i></a>

                                            }
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 pt-3">
                                        <div className="small-box bg-info">
                                            <div className="inner">
                                                <h3>{pendientes}</h3>

                                                <p>Pendientes</p>
                                            </div>
                                            <div className="icon">
                                                <i className="ion ion-bag"></i>
                                            </div>
                                            {pendientes > 0 &&
                                                <a href="#" className="small-box-footer" onClick={fcantidad_p}>ver mas <i className="fas fa-arrow-circle-right"></i></a>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 pt-3">
                                        <div className="small-box bg-danger">
                                            <div className="inner">
                                                <h3>{rechazados}</h3>

                                                <p>rechazados</p>
                                            </div>
                                            <div className="icon">
                                                <i className="ion ion-bag"></i>
                                            </div>
                                            {rechazados > 0 &&
                                                <a href="#" className="small-box-footer" onClick={fcantidad_r}>ver mas <i className="fas fa-arrow-circle-right"></i></a>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-3'>

                            </div>
                        </div>
                    }


                    {registros === true &&
                        < div className="page-wrapper mr-lg-0 pr-lg-0 ml-lg-0 pl-lg-0">
                            <div className="row">
                                <a class="nav-link bg-light" data-widget="iframe-scrollleft" onClick={miPresentacion}><i class="fas fa-angle-double-left"></i></a>
                            </div>
                            <br />
                            <div className='page-body'>
                                <div className="row">
                                    {cantidad.map((c) => (
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                                            <div className="card o-visible" >
                                                {c.validacion === 1 && <div className="card-header bg-success" >
                                                    <h5>{c.paciente}</h5>
                                                    <span className='tooltip-text'>{'ESTADO : ACEPTADO'}{'  '}{c.realizado === 1 && ' REALIZADO: 0K'} </span>
                                                </div>}

                                                {c.validacion === 0 && <div className="card-header bg-info" >
                                                    <h5>{c.paciente}</h5>
                                                    <span className='tooltip-text'>{'ESTADO : PENDIENTE'}</span>
                                                </div>}

                                                {c.validacion === 2 && <div className="card-header bg-danger" >
                                                    <h5>{c.paciente}</h5>
                                                    <span className='tooltip-text'>{'ESTADO : RECHAZADO'}</span>
                                                </div>}
                                                <div className='row'>
                                                    <div className="card-block col-9">
                                                        <p> {c.diagnostico}
                                                            <Parrafos >{'PARA : ' + c.centroTarea}</Parrafos>
                                                            <Parrafos>{'HISTORIAL CLINICO : ' + c.num_historial}</Parrafos>
                                                            <Parrafos>{'FECHA DE SOLICITUD : ' + c.fecha_sol}</Parrafos>
                                                            <Parrafos>{'HORA DE SOLICITUD : ' + c.hora_sol}</Parrafos>

                                                            <Parrafos className="mytooltip tooltip-effect-2">
                                                                <div onClick={() => ver(c.id)} className="tooltip-item mt-0">mas detalles</div>
                                                            </Parrafos>
                                                        </p>
                                                    </div>
                                                    <div className="mt-2 ml-1 col-2">
                                                        <div className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages" >
                                                            <div onClick={() => verPdf(c.id)} className="sb-nav-link-icon"><i className="fas fa-print"></i></div>
                                                        </div>

                                                        {/* <div onClick={()=>cargarSol(c.id)} className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages" >
                                                            <PDFDownloadLink document={<VerPdf solicitud={solicitud} />} fileName={c.paciente+'examen_laboratorio.pdf'} >
                                                                <div className="sb-nav-link-icon"><i className="fas fa-download"></i></div>
                                                            </PDFDownloadLink>
                                                        </div> */}
                                                        {
                                                            c.validacion === 0 &&
                                                            <div className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages" >
                                                                <div onClick={() => edicion(c.id)} className="sb-nav-link-icon"><i className="fas fa-edit"></i></div>
                                                            </div>

                                                        }
                                                        {
                                                            c.validacion === 0 &&
                                                            <div className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages" >
                                                                <div onClick={() => eliminarSol(c.id)} className="sb-nav-link-icon"><i className="fas fa-trash-alt"></i></div>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    }
                    {modalVistazo === true &&
                        <Vista
                            solicitud={solicitud}
                            activo={modalVistazo}
                            cerrar={setModalVistaso}
                        />
                    }
                </>
            }
        </>

    );
}
export default RegistrosL;
