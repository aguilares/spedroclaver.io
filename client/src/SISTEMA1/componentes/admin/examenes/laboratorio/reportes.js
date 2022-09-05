import useAuth from "../../../../../Auth/useAuth" // verificacion de la existencia de la sesion
import info from "../../../../../info"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from "react";
import { ComponenteInputBuscar } from '../../../../../elementos/input';  // componente input que incluye algunas de las
import { Table, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import url from '../../../../../Auth/varEntorno';  // variables globales que estan disponibles para todo el sistema client

function ReportesL() {
    const [ciBuscar, setCiBuscar] = useState({ campo: null, valido: null })
    const [formulario, setFormulario] = useState(null)
    const [registros, setRegistros] = useState(null)
    const [tabla, setTabla] = useState(null)
    const [presentacion, setPresentacion] = useState(true)

    const [idUsuario, setIdUsuario] = useState(null)
    const [nivel, setNivel] = useState(null)
    const [rol, setRol] = useState(null)

    const [red, setRed] = useState(null)
    const [municipio, setMunicipio] = useState(null)
    const [area, setArea] = useState({ campo: null, valido: null })
    const [idArea, setIdArea] = useState(null)
    const [centro, setCentro] = useState(null)
    const [idCentro, setIdCentro] = useState(null)
    const [mensaje, setMensaje] = useState('Por favor!! Asegúrese bien que la informacion proporcionada sea la correcta')
    const [cantidad, setCantidad] = useState([]) // cantidad de solicitudes en inicio y registros





    const auth = useAuth()
    const [Solicitud, setSolicitud] = useState([])   // Solicitud en general 
    const [miSolicitud, setMiSolicitud] = useState([]) //  solicitud registrado por un usuario en especifico
    const [inicio, setInicio] = useState(0)
    const [limite, setLimite] = useState(9)


    const anterior = () => {
        console.log('inicio: ', inicio)
        if (inicio > 0) {
            setInicio(inicio - 10)
            setLimite(limite - 10)
        }
        else {
            alert('ya se encuentra en la lista inicial')
        }
    }

    const siguiente = () => {
        if (Solicitud) {
            console.log('limite: ', limite)
            setInicio(inicio + 10)
            setLimite(limite + 10)
        }
        else {
            alert('ya se encuentra en la lista final')
        }
    }


    return (
        <>
            <div className="page-wrapper mr-lg-0 pr-lg-0 ml-lg-0 pl-lg-0 ">
                <div className="row">
                    <div className="mt-2 ml-1 col-lg-8 col-md-8 col-sm-8 col-6 ">
                        <Button color="success" > Nueva Solicitud</Button>

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
                            className_="form-control form-control-sm mr-0 ml-0 pr-0 pl-"
                        // eventoBoton={buscarPaciente}
                        />
                    </div>
                </div>
                <br />

                <div>
                    <div className="table table-responsive ml-0 ">
                        Mis Solicitudes
                        <Table className="col-12 col-sm-12 col-md-12 col-lg-12 table-striped table table-sm">
                            <thead>
                                <tr >
                                    {/* <th className="col-1 col-sm-1 col-md-1-col-lg-1  pl-4 pl-lg-4 pl-md-4 pl-sm-4">Nº</th> */}
                                    <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-4 pl-md-4 pl-sm-4 pl-3 pr-2 pr-lg-0 pr-md-0 pr-sm-0">Municipio</th>
                                    <th className="col-2 col-sm-2 col-md-2 col-lg-2 pl-lg-2 pl-md-2 pl-sm-2 pr-2 pr-lg-2 pr-md-0 pr-sm-2">Fecha Solicitud</th>
                                    <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-0 pl-md-0 pl-sm-0 pr-2 pr-lg-2 pr-md-2 pr-sm-2">Hospital</th>
                                    <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-0 pl-md-0 pl-sm-0 pr-2 pr-lg-2 pr-md-0 pr-sm-1 ">Seguro</th>
                                    <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-2 pl-md-3 pl-sm-1 pr-2 pr-lg-2 pr-md-0 pr-sm-4 ">Servicio</th>
                                    <th className="col-2 col-sm-2 col-md-2 col-lg-1 pl-lg-2 pl-md-2 pl-sm-4 pr-2 pr-lg-2 pr-md-2 pr-sm-3 ">C.I</th>
                                    <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-4 pl-md-2 pl-sm-2 pr-3 pr-lg-2 pr-md-0 pr-sm-2">Fecha Nac.</th>
                                    <th className="col-2 col-sm-2 col-md-2 col-lg-2 pl-lg-4 pl-md-0 pl-sm-0 pr-0 pr-lg-2 pr-md-0 pr-sm-2">N.H.CL.</th>
                                    <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-4 pl-md-2 pl-sm-2 pr-0 pr-lg-2 pr-md-0 pr-sm-2">Paciente</th>
                                    <th className="col-1 col-sm-1 col-md-1 col-lg-1 pl-lg-2 pl-md-2 pl-sm-2 pr-0 pr-lg-2 pr-md-0 pr-sm-2">Diagnostico</th>
                                </tr>
                            </thead>
                            <tbody>

                                {miSolicitud.map((sol) => (


                                    <tr >
                                        <td className="pl-lg-2 pl-md-2 pl-sm-2 pr-3">{sol.ci}</td>
                                        <td className="pl-lg-0 pl-md-0 pl-sm-0 pr-0 pr-lg-0 pr-md-0 pr-sm-0">{sol.nombre}</td>
                                        <td className="pl-lg-0 pl-md-0 pl-sm-0 pr-0 pr-lg-0 pr-md-0 pr-sm-3">{sol.apellidoPat}</td>
                                        <td className="pl-lg-0 pl-md-0 pl-sm-0 pr-0 pr-lg-0 pr-md-0 pr-sm-0">{sol.apellidoMat}</td>
                                        <td className="pl-lg-4 pl-md-4 pl-sm-4 pl-3 pr-lg-0 pr-md-0 pr-sm-0">{sol.sexo}</td>
                                        <td className="pl-lg-0 pl-md-0 pl-sm-0 pl-0 pr-0 pr-lg-0 pr-md-0 pr-sm-0">{sol.fechaNac}</td>
                                        <td className="pl-lg-3 pl-md-0 pl-sm-0 pr-3 pr-lg-2 pr-md-2 pr-sm-3">{sol.celular}</td>
                                        <td className="pl-lg-4 pl-md-0 pl-sm-0 pr-3 pr-lg-0 pr-md-2 pr-sm-0">{sol.direccion}</td>
                                        <td className="pl-lg-4 pl-md-0 pl-sm-0 pr-3 pr-lg-2 pr-md-2 pr-sm-2">{sol.telefono}</td>

                                        {/* OPERACIONES para asignacion de roles */}


                                        {sol != null &&
                                            <td className="pl-lg-5 pl-md-4 pl-sm-4 pr-0 pr-lg-1 pr-md-1 pr-sm-1"><Button color="primary" ><FontAwesomeIcon icon={faEdit} /></Button></td>
                                        }

                                        {sol != null &&
                                            <td className="pl-lg-0 pl-md-0 pl-sm-0 pr-0 pr-lg-2 pr-md-2 pr-sm-2"><Button color="danger" ><FontAwesomeIcon icon={faTrashAlt} /></Button></td>
                                        }

                                        {sol != null &&
                                            <td className="pl-lg-0 pl-md-0 pl-sm-0 pr-0 pr-lg-2 pr-md-2 pr-sm-2"><Button color="danger" onClick={() => localStorage.setItem("paciente", sol)}><FontAwesomeIcon icon={faTrashAlt} /></Button></td>
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
                </div>
            </div>
        </>
    )
}
export default ReportesL;
