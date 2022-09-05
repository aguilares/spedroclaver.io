import '../../../../../elementos/adminlte.css';

import { useEffect, useState } from "react";

import url from '../../../../../Auth/varEntorno';  // variables globales que estan disponibles para todo el sistema client

import useAuth from "../../../../../Auth/useAuth" // verificacion de la existencia de la sesion
import info from "../../../../../info"
import {
    buscarSolicitudadmin, realizado, cantidadPservicios, cantidadRservicios, vercantidadPservicios, vercantidadRservicios, verInformacionCompletaServicios
} from "../services/services"
import { ComponenteInputBuscar, Vista, VerPdf } from '../../../../../elementos/input';  // componente input que incluye algunas de las

import { Parrafos } from '../../../../../elementos/estilos';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

import '../../../../../elementos/icono.css';




function RegistrosLServicios() {
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

    const [mensaje, setMensaje] = useState('Por favor!! Asegúrese bien que la informacion proporcionada sea la correcta')

    const [modalVistazo, setModalVistaso] = useState(false)
    const [solicitud, setSolicitud] = useState(null)
    const [pdf, setPdf] = useState(null)


    // const [HoraRecSolicitud, setHoraRecSolicitud] = useState({ campo: new Date().toLocaleTimeString(), valido: 'true' })




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
                cantidad_solex(json.data.idCentro)
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
    const [realizados, setRealizados] = useState(0)
    // const [rechazados, setRechazados] = useState(0)
    const [pendientes, setPendientes] = useState(0)



    // ************************************************ver cantidad de solicitudes realizados rechazados y pendientes, solo en numeros*****************************************
    const cantidad_solex = async (id) => {
        if (id != null) {
            try {
                await cantidadPservicios(auth, id).then(json => {
                    // console.log(json)
                    setPendientes(json.data.p)
                })
                await cantidadRservicios(auth, id).then(json => {
                    setRealizados(json.data.r)
                })
            } catch {
                alert('alerta alerta !!')
            }
        }
    }
    //*******************************************************REGISTROS pendientes**************************************************************************** */


    const fcantidad_p = async () => {
        if (idCentro !== null) {
            try {
                await vercantidadPservicios(auth, idCentro).then(json => {
                    console.log(json)
                    setCantidad(json.data)
                })

                setPresentacion(false)
                setRegistros(true)
            } catch {
                alert('NO PUDIMOS CARGAR LA INFORMACION, POR FAVOR PONGASE EN CONTACTO CON EL ADMINISTRADOR')
            }
        }
    }
    // ****************************************************registros realizados**********************************************************************************
    const fcantidad_r = async () => {
        if (idCentro !== null) {
            try {
                await vercantidadRservicios(auth, idCentro).then(json => {
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

    // ***********************************************************BUSCAR REGISTROS CON CI O NHC****************************************************************
    const f_buscarSolicitud = async () => {

        if (idCentro !== null, ciBuscar.valido === 'true') {
            try {
                await buscarSolicitudadmin(auth, idCentro, ciBuscar.campo).then(json => {
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

    const frealizado = async (id) => {
        let ok = window.confirm('TAREA COMPLETADA ?')
        if (ok) {
            try {
                await realizado(auth, id).then(json => {
                    if (json.data.status === 1) {
                        fcantidad_p()
                    }
                })
            } catch {
                alert('no se puede cargar los resultados !!!')
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
        cantidad_solex(idCentro)
        setRegistros(false)
    }


    const ver = async (id) => {
        try {
            await verInformacionCompletaServicios(auth, id).then(json => {
                console.log(json.data)
                setSolicitud(json.data)
            })

            setModalVistaso(true)

        } catch (error) {
            // window.location.href = '/ssgl'
        }
    }

    const verPdf = async (id) => {
        // console.log('revision acepatada')
        try {
            await verInformacionCompletaServicios(auth, id).then(json => {
                setSolicitud(json.data)
                // console.log(json.data)
                setPdf(true)
            })
        } catch (error) {
            window.location.href = '/ssgl'
        }
    }

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
                                    <div className=" mt-2 col-lg-4 col-md-4 col-sm-4 col-12">
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
                                                <h3>{realizados}</h3>
                                                <p>Realizados</p>
                                            </div>
                                            <div className="icon">
                                                <i className="ion ion-bag"></i>
                                            </div>
                                            {
                                                realizados > 0 &&
                                                <a href="#" className="small-box-footer" onClick={fcantidad_r}>ver mas <i className="fas fa-arrow-circle-right"></i></a>

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
                                                {c.realizado === 1 && <div className="card-header bg-success" >
                                                    <h5>{c.paciente}</h5>
                                                    <span className='tooltip-text'>{' REALIZADO: 0K'} </span>
                                                </div>}

                                                {c.realizado === 0 && <div className="card-header bg-info" >
                                                    <h5>{c.paciente}</h5>
                                                    <span className='tooltip-text'>{'ESTADO : PENDIENTE'}</span>
                                                </div>}

                                                <div className='row'>
                                                    <div className="card-block col-9">
                                                        <p> {c.diagnostico}
                                                            <Parrafos >{'PARA : ' + c.centroTarea}</Parrafos>
                                                            <Parrafos>{'HISTORIAL CLINICO : ' + c.num_historial}</Parrafos>
                                                            <Parrafos>{'FECHA DE SOLICITUD : ' + c.fecha_sol}</Parrafos>
                                                            <Parrafos>{'HORA DE SOLICITUD : ' + c.hora_sol}</Parrafos>

                                                            <Parrafos className="mytooltip tooltip-effect-2">
                                                                <div onClick={() => ver(c.id, c.hora_rec_sol)} className="tooltip-item mt-0">mas detalles</div>
                                                            </Parrafos>
                                                        </p>
                                                    </div>
                                                    <div className="mt-2 ml-1 col-2">
                                                        <div className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages" >
                                                            <div onClick={() => verPdf(c.id)} className="sb-nav-link-icon"><i className="fas fa-print"></i></div>
                                                        </div>
                                                        <div className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages" >
                                                            <div className="sb-nav-link-icon"><i className="fas fa-download"></i></div>
                                                        </div>
                                                        {c.realizado === 0 &&
                                                            <div className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages" >
                                                                <div onClick={() => frealizado(c.id, c.hora_rec_sol)} className="sb-nav-link-icon"><i className="fas fa-check"></i></div>
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
export default RegistrosLServicios;
