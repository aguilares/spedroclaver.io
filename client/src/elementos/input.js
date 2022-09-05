import {
    LeyendaError, Input, Inputfecha, Select, InputDisabled, InputArea, ContenedorCheck, ContenedorCheck2, Label, ContenedorCheckSimple, LabelModal
} from './estilos';

import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer'
import sello from '../elementos/images/sellospc.png'


import './icono.css';



import { Link } from "react-router-dom";

const CheckSimple = ({ estado, cambiarEstado, item, funcion, funcion2 }) => {
    const onChange = (e) => {
        if (e.target.checked) {
            cambiarEstado(true)
            if (funcion) {
                funcion()
            }
        }
        else {
            cambiarEstado(false)
            if (funcion2) {
                funcion2()
            }
        }

    }
    return (
        <ContenedorCheckSimple>
            <label htmlFor={item + 'ssl'} > {/*el id es un elemento escencial al momento de marcar el check  */}
                <input
                    type="checkbox"
                    name={item}
                    value={estado}
                    id={item + 'ssl'}
                    onChange={onChange}
                />
                <small >{item}</small>
            </label>
        </ContenedorCheckSimple>
    )
}
const ComponenteCheck = ({ id, item, admitidos }) => {
    const onChange = (e) => {
        if (e.target.checked) {
            admitidos[e.target.value] = e.target.value
            console.log(item, admitidos)
        }
        else {
            admitidos[e.target.value] = null
            console.log(item, admitidos)
        }
    }

    return (
        <ContenedorCheck>
            <label htmlFor={id + ' ' + item + 'ssl'} > {/*el id es un elemento escencial al momento de marcar el check  */}
                <input
                    type="checkbox"
                    name={id}
                    value={id}
                    id={id + ' ' + item + 'ssl'}
                    onChange={onChange}
                />
                <small >{item}</small>
            </label>
        </ContenedorCheck>
    )
}

const ComponenteCheck2 = ({ id, item, admitidos }) => {
    const onChange = (e) => {
        if (e.target.checked) {
            admitidos[e.target.value] = e.target.value
            console.log(item, admitidos)
        }
        else {
            admitidos[e.target.value] = null
            console.log(item, admitidos)
        }
    }
    return (
        <ContenedorCheck2>
            <label htmlFor={id + ' ' + item + 'ssl'} > {/*el id es un elemento escencial al momento de marcar el check  */}
                <input
                    type="checkbox"
                    name={item}
                    value={id}
                    id={id + ' ' + item + 'ssl'}
                    onChange={onChange}
                />
                <small>{item}</small>
            </label>
        </ContenedorCheck2>
    )
}


const ComponenteInputfechaDisabled = ({ estado, cambiarEstado, name, placeholder, ExpresionRegular }) => {

    // 
    const onChange = (e) => {
        cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() }) // cambiarEstado({ ...estado, campo: e.target})
        // console.log(estado)
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
        // console.log("fechas: ", estado)

    }

    return (
        <>

            {/* <div className="input-group-prepend"> */}
            {/* <span className="input-group-text"><i className='far fa-calendar-alt'></i></span> */}
            <Inputfecha
                type='date'
                className="form-control form-control-sm"
                id={name}
                name={name}
                expresionRegular={ExpresionRegular}
                placeholder={placeholder}
                value={estado.campo}
                onChange={onChange}
                onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                onBlur={validacion}  //si presionamos fuera del input
                valido={estado.valido}
                toUpperCase
                disabled={true}
            />
            {/* <IconoValidacionfecha valido={estado.valido}
                icon={estado.valido === 'false' && faTimesCircle} /> */}

            {/* </div> */}
            {/* {estado.valido === 'false' && <LeyendaError valido={estado.valido} >{"campo invalido !"}</LeyendaError>} */}
        </>
    )
}

const ComponenteInputfecha = ({ estado, cambiarEstado, name, placeholder, ExpresionRegular, etiqueta }) => {

    // 
    const onChange = (e) => {
        cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() }) // cambiarEstado({ ...estado, campo: e.target})
        // console.log(estado)
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
        // console.log("fechas: ", estado)

    }

    return (
        <div className="input-group form-inline mb-1" >
            <div className="btn btn-sidebar ">
                <div className='input-group-append'>
                    <Label>{etiqueta + ':'}</Label>
                </div>
            </div>
            <Inputfecha
                type='date'
                className="form-control form-control-sm"
                id={name}
                name={name}
                expresionRegular={ExpresionRegular}
                placeholder={placeholder}
                value={estado.campo}
                onChange={onChange}
                onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                onBlur={validacion}  //si presionamos fuera del input
                valido={estado.valido}
                toUpperCase
            />
        </div>
    )
}

const ComponenteInputHora = ({ estado, cambiarEstado, name, placeholder, ExpresionRegular, etiqueta }) => {

    // 
    const onChange = (e) => {
        cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() }) // cambiarEstado({ ...estado, campo: e.target})
        // console.log(estado)
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
        // console.log("fechas: ", estado)

    }

    return (
        <div className="input-group form-inline mb-1" >
            <div className="btn btn-sidebar">
                <div className='input-group-append '>
                    <Label>{etiqueta + ':'}</Label>
                </div>
            </div>
            <Inputfecha
                type='time'
                className="form-control form-control-sm"
                id={name}
                name={name}
                expresionRegular={ExpresionRegular}
                placeholder={placeholder}
                value={estado.campo}
                onChange={onChange}
                onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                onBlur={validacion}  //si presionamos fuera del input
                valido={estado.valido}
                toUpperCase
            />
        </div>
    )
}

const ComponenteInputBuscar = ({ estado, cambiarEstado, name, ExpresionRegular, placeholder, eventoBoton, etiqueta }) => {


    const onchange = (e) => {

        cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() }) // cambiarEstado({ ...estado, campo: e.target})

    }

    const validacion = () => {
        if (ExpresionRegular) {

            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 

            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })

            }
        }

    }

    return (
        <div className="input-group form-inline mb-1">
            <div className="btn btn-sidebar ">
                <div className='input-group-append'>
                    <Label> {etiqueta + ':'} </Label>
                </div>
            </div>
            <Input
                type='text'
                value={estado.campo}
                id={name}
                className="form-control form-control-sm"
                name={name}
                placeholder={placeholder}
                onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                onBlur={validacion}  //si presionamos fuera del input
                onChange={onchange}
                valido={estado.valido}
            />
            <Button color="primary" className='boton' onClick={eventoBoton}><FontAwesomeIcon className='icono' icon={faSearch} /> </Button>
        </div>
    )
}

const ComponenteInputUser = ({ estado, cambiarEstado, name, placeholder, ExpresionRegular, span = '', useri = null }) => {

    const onChange = (e) => {
        if (useri) {
            cambiarEstado({ ...estado, campo: e.target.value }) // cambiarEstado({ ...estado, campo: e.target})
        }
        if (useri === null || useri === false) {
            cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() })
        }
        // console.log(estado)
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
    }

    return (
        <div className="row">
            <div className="input-group mb-0">

                <Input
                    type='text'
                    className="form-control form-control-sm"
                    id={name}
                    name={name}
                    expresionRegular={ExpresionRegular}
                    placeholder={placeholder}
                    value={estado.campo}
                    onChange={onChange}
                    onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                    onBlur={validacion}  //si presionamos fuera del input
                    valido={estado.valido}
                    toUpperCase
                />

                {span !== '' && <div className="input-group-append">
                    <div className="input-group-text styles" >
                        <span className={span}></span>
                    </div>
                </div>}

            </div>
            {estado.valido === 'false' && <LeyendaError valido={estado.valido} >{"campo invalido !"}</LeyendaError>}
        </div>
    )
}

const ComponenteInputUser2 = ({ estado, cambiarEstado, name, placeholder, ExpresionRegular, useri = null, etiqueta }) => {

    const onChange = (e) => {
        if (useri) {
            cambiarEstado({ ...estado, campo: e.target.value }) // cambiarEstado({ ...estado, campo: e.target})
        }
        if (useri === null || useri === false) {
            cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() })
        }
        // console.log(estado)
    }
    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
    }

    return (
        <div className="input-group form-inline mb-1">
            <div className="btn btn-sidebar ">
                <div className='input-group-append '>
                    <Label> {etiqueta + ':'} </Label>
                </div>
            </div>
            <Input
                type='text'
                className="form-control form-control-sm"
                id={name}
                name={name}
                expresionRegular={ExpresionRegular}
                placeholder={placeholder}
                value={estado.campo}
                onChange={onChange}
                onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                onBlur={validacion}  //si presionamos fuera del input
                valido={estado.valido}
                toUpperCase
            />
        </div>
    )
}

const ComponenteInputArea = ({ estado, cambiarEstado, name, placeholder, ExpresionRegular, span = '', useri = null }) => {

    const onChange = (e) => {
        if (useri) {
            cambiarEstado({ ...estado, campo: e.target.value }) // cambiarEstado({ ...estado, campo: e.target})
        }
        if (useri === null || useri === false) {
            cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() })
        }
        // console.log(estado)
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
    }

    return (
        <div className="row">
            <div className="input-group mb-0">

                <InputArea

                    className="form-control form-control-sm"
                    id={name}
                    name={name}
                    expresionRegular={ExpresionRegular}
                    placeholder={placeholder}
                    value={estado.campo}
                    onChange={onChange}
                    onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                    onBlur={validacion}  //si presionamos fuera del input
                    valido={estado.valido}
                    toUpperCase
                />




                {/* {span !== '' ? (<IconoValidacion valido={estado.valido}
                    icon={estado.valido === 'false' && faTimesCircle}/>)
                    : (<IconoValidacionCampos valido={estado.valido}
                        icon={estado.valido === 'false' && faTimesCircle} />)
                } */}

                {span !== '' && <div className="input-group-append">
                    <div className="input-group-text">
                        <span className={span}></span>
                    </div>
                </div>}

            </div>
            {estado.valido === 'false' && <LeyendaError valido={estado.valido} >{"campo invalido !"}</LeyendaError>}
        </div>
    )
}

const ComponenteInputUserDisabled = ({ estado, name, ExpresionRegular, span = '', etiqueta }) => {


    return (
        <div className="input-group form-inline mb-1" >
            <div className="btn btn-sidebar ">
                <div className='input-group-append'>
                    <Label> {etiqueta + ':'} </Label>
                </div>
            </div>
            <InputDisabled
                type='text'
                className="form-control form-control-sm"
                id={name}
                name={name}
                expresionRegular={ExpresionRegular}
                value={estado.campo}
                valido={estado.valido}
                toUpperCase
                disabled={true}
            />
            {span !== '' && <div className="input-group-append">
                <div className="input-group-text styles" >
                    <span className={span}></span>
                </div>
            </div>}
        </div>
    )
}



const ComponenteInputCampo = ({ estado, cambiarEstado, name, placeholder, ExpresionRegular, validar, evento = null, eventoBoton = null }) => {

    const onChange = (e) => {
        cambiarEstado({
            ...estado,
            [e.target.name]: e.target.value
        })
        // console.log(estado, 'valores')

    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(validar)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
                // console.log(estado)
            }
            // setUsername(event.target.value.toUpperCase());
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
    }

    // console.log(estado, 'desde el input')
    return (
        // <div className="row">
        <>
            <div className="input-group mb-0">

                {/* <label htmlFor = {name}>{placeholder}</label> */}
                <Input
                    className="form-control form-control-sm"
                    type='text'
                    id={name}
                    name={name}
                    expresionRegular={ExpresionRegular}
                    placeholder={placeholder}
                    value={validar.toUpperCase()}
                    onChange={onChange}
                    onKeyUp={validacion}    //se ejecuta cuando dejamos de presionar la tecla
                    onBlur={validacion}     //si presionamos fuera del input
                    valido={estado.valido}

                />
                {evento === true && <Link to="#" className="btn btn-primary boton" type="submit" id="btnNavbarSearch" onClick={eventoBoton}><i className="fas fa-search icono"></i></Link>}
                {/* 
                {evento == null ? (<IconoValidacionCampos valido={estado.valido}
                    icon={estado.valido === 'false' && faTimesCircle} />
                ) : (
                    <IconoValidacionCamposBuscar valido={estado.valido}
                    icon={estado.valido === 'false' && faTimesCircle}/>
                )} */}


            </div>
            {estado.valido === 'false' && <LeyendaError valido={estado.valido} >{'campo invalido !!!'}</LeyendaError>}
            {/* </div> */}
        </>
    )
}


const Select1 = ({ estado, cambiarEstado, Name, ExpresionRegular, lista, funcion1, etiqueta }) => {


    // console.log("camas", estado)
    const onChange = (e) => {
        cambiarEstado({ campo: e.target.value, valido: 'true' })
    }
    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
                // console.log("buena aproximacion")
                if (funcion1) {
                    funcion1()
                }
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
        // console.log("red seleccionado: ", cambiarEstado)
    }

    return (
        <div className="input-group form-inline mb-1" >
            <div className="btn btn-sidebar  ">
                {etiqueta != null && <div className='input-group-append '>
                    <Label>  {etiqueta + ':'} </Label>
                </div>}
            </div>
            <Select
                name={Name}
                className="form-control form-control-sm"
                onChange={onChange}
                // onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                // onBlur={validacion}  //si presionamos fuera del input
                valido={estado.valido}
                value={estado.campo}
                onClick={validacion}
            >
                <option>seleccione</option>
                {lista.map((r) => (
                    <option value={r.id}>{r.nombre}</option>
                ))}
            </Select>
        </div>
    )
}

const Vista = async ({ solicitud, activo, cerrar }) => {


    let fechaNac = solicitud.solicitud[0].fechaNac.split('T')[0]
    let hoy = new Date()
    let antes = new Date(solicitud.solicitud[0].fechaNac) // formato: yyyy-MM-dd
    let edad1 = hoy.getFullYear() - antes.getFullYear()
    let mes = hoy.getMonth() - antes.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < antes.getDate())) {
        edad1--
    }

    let hrs = ''
    if (solicitud.solicitud[0].hora_rec_sol === null) {
        hrs = 'NO RECIBIDA'
    }
    else {
        hrs = solicitud.solicitud[0].hora_rec_sol
    }

    return (
        <Modal isOpen={activo}>

            <ModalHeader>
                <div>
                    <LabelModal><h7>SOLICITUD DE EXAMEN DE LABORATORIO</h7></LabelModal>
                </div>
            </ModalHeader>
            <ModalBody>

                <div className='row'>
                    <div className='col-12'>
                        <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'PERSONAL : ' + solicitud.solicitud[0].personal} </LabelModal>
                            </div>
                        </div>
                    </div>
                    <div className='col-5'>
                        <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'RED : ' + solicitud.solicitud[0].red} </LabelModal>
                            </div>
                        </div>
                    </div>
                    <div className='col-7'>
                        <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'MUNICIPIO : ' + solicitud.solicitud[0].municipio} </LabelModal>
                            </div>
                        </div>
                    </div>

                    <div className='col-12'>
                        <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'CENTRO : ' + solicitud.solicitud[0].centro} </LabelModal>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'UNIDAD : ' + solicitud.solicitud[0].unidad} </LabelModal>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'SERVICIO : ' + solicitud.solicitud[0].area} </LabelModal>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'FECHA DE SOLICITUD :   ' + solicitud.solicitud[0].fecha_sol} </LabelModal>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'HORA SOLICITUD :   ' + solicitud.solicitud[0].hora_sol} </LabelModal>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'HORA TOMA MUESTRA :   ' + solicitud.solicitud[0].hora_toma_muestra} </LabelModal>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'HORA REC. SOLICITUD :   ' + hrs} </LabelModal>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'DIAGNOSTICO :   ' + solicitud.solicitud[0].diagnostico} </LabelModal>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                {solicitud.solicitud[0].validacion === 0 &&
                                    <LabelModal>  {'PENDIENTE :   SI'} </LabelModal>
                                }
                                {solicitud.solicitud[0].validacion === 1 &&
                                    <LabelModal>  {'ACEPTADO :   SI'} </LabelModal>
                                }
                                {solicitud.solicitud[0].validacion === 2 &&
                                    <LabelModal>  {'RECHAZADO :   SI'} </LabelModal>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                {solicitud.solicitud[0].realizado === 0 &&
                                    <LabelModal>  {'REALIZADO :   NO'} </LabelModal>
                                }
                                {solicitud.solicitud[0].realizado === 1 &&
                                    <LabelModal>  {'REALIZADO :   SI'} </LabelModal>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'NUMERO HISTORIAL CLINICO :   ' + solicitud.solicitud[0].num_historial} </LabelModal>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'PACIENTE :   ' + solicitud.solicitud[0].paciente} </LabelModal>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'FECHA DE NACIMIENTO :   ' + fechaNac} </LabelModal>
                            </div>
                        </div>
                    </div>

                    <div className='col-4'>
                        <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'CI :   ' + solicitud.solicitud[0].ci} </LabelModal>
                            </div>
                        </div>
                    </div>

                    <div className='col-4'>
                        <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'EDAD :   ' + edad1} </LabelModal>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'SEXO :   ' + solicitud.solicitud[0].sexo} </LabelModal>
                            </div>
                        </div>
                    </div>

                    <div className='col-8 '>
                        <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'SALA :   ' + solicitud.sala} </LabelModal>
                            </div>
                        </div>
                    </div>

                    <div className='col-4 '>
                        <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'CAMA :   ' + solicitud.numero} </LabelModal>
                            </div>
                        </div>
                    </div>

                    <div className='col-12'>
                        <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'SEGURO :   ' + solicitud.seguro} </LabelModal>
                            </div>
                        </div>
                    </div>

                    <div className='col-12'>
                        <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {'EXAMENES REGISTRADOS PARA EL HOSPITAL  : ' + solicitud.solicitud[0].centroTarea} </LabelModal>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                            <div className='input-group-append pl-0 pr-0'>
                                {/* <LabelModal>  {'EXAMENES REGISTRADOS PARA EL HOSPITAL  : ' + solicitud.solicitud[0].centroTarea+' :'} </LabelModal> */}
                            </div>
                        </div>
                    </div>

                    {solicitud.item.map((item) => (
                        <div className='col-12'>
                            <div className=" btn btn-sidebar pl-0 pr-0 ">
                                <div className='input-group-append pl-0 pr-0'>
                                    <LabelModal>  {item.nombreExamen + ' | ' + item.grupo} </LabelModal>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                <ModalFooter>
                    <button className='btn btn-danger' onClick={() => cerrar(false)} >cerrar</button>
                </ModalFooter>
            </ModalBody>
        </Modal>
    )
}

const Vista1 = async ({ solicitud, cerrar }) => {


    let fechaNac = solicitud.solicitud[0].fechaNac.split('T')[0]
    let hoy = new Date()
    let antes = new Date(solicitud.solicitud[0].fechaNac) // formato: yyyy-MM-dd
    let edad1 = hoy.getFullYear() - antes.getFullYear()
    let mes = hoy.getMonth() - antes.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < antes.getDate())) {
        edad1--
    }

    let hrs = ''
    if (solicitud.solicitud[0].hora_rec_sol === null) {
        hrs = 'NO RECIBIDA'
    }
    else {
        hrs = solicitud.solicitud[0].hora_rec_sol
    }

    return (
        <div>


            <div className='row'>
                <div className='col-12'>
                    <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'PERSONAL : ' + solicitud.solicitud[0].personal} </LabelModal>
                        </div>
                    </div>
                </div>
                <div className='col-5'>
                    <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'RED : ' + solicitud.solicitud[0].red} </LabelModal>
                        </div>
                    </div>
                </div>
                <div className='col-7'>
                    <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'MUNICIPIO : ' + solicitud.solicitud[0].municipio} </LabelModal>
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'CENTRO : ' + solicitud.solicitud[0].centro} </LabelModal>
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'UNIDAD : ' + solicitud.solicitud[0].unidad} </LabelModal>
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'SERVICIO : ' + solicitud.solicitud[0].area} </LabelModal>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'FECHA DE SOLICITUD :   ' + solicitud.solicitud[0].fecha_sol} </LabelModal>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'HORA SOLICITUD :   ' + solicitud.solicitud[0].hora_sol} </LabelModal>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'HORA TOMA MUESTRA :   ' + solicitud.solicitud[0].hora_toma_muestra} </LabelModal>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'HORA REC. SOLICITUD :   ' + hrs} </LabelModal>
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'DIAGNOSTICO :   ' + solicitud.solicitud[0].diagnostico} </LabelModal>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            {solicitud.solicitud[0].validacion === 0 &&
                                <LabelModal>  {'PENDIENTE :   SI'} </LabelModal>
                            }
                            {solicitud.solicitud[0].validacion === 1 &&
                                <LabelModal>  {'ACEPTADO :   SI'} </LabelModal>
                            }
                            {solicitud.solicitud[0].validacion === 2 &&
                                <LabelModal>  {'RECHAZADO :   SI'} </LabelModal>
                            }
                        </div>
                    </div>
                </div>

                <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            {solicitud.solicitud[0].realizado === 0 &&
                                <LabelModal>  {'REALIZADO :   NO'} </LabelModal>
                            }
                            {solicitud.solicitud[0].realizado === 1 &&
                                <LabelModal>  {'REALIZADO :   SI'} </LabelModal>
                            }
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'NUMERO HISTORIAL CLINICO :   ' + solicitud.solicitud[0].num_historial} </LabelModal>
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'PACIENTE :   ' + solicitud.solicitud[0].paciente} </LabelModal>
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'FECHA DE NACIMIENTO :   ' + fechaNac} </LabelModal>
                        </div>
                    </div>
                </div>

                <div className='col-4'>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'CI :   ' + solicitud.solicitud[0].ci} </LabelModal>
                        </div>
                    </div>
                </div>

                <div className='col-4'>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'EDAD :   ' + edad1} </LabelModal>
                        </div>
                    </div>
                </div>
                <div className='col-4'>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'SEXO :   ' + solicitud.solicitud[0].sexo} </LabelModal>
                        </div>
                    </div>
                </div>

                <div className='col-8 '>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'SALA :   ' + solicitud.sala} </LabelModal>
                        </div>
                    </div>
                </div>

                <div className='col-4 '>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'CAMA :   ' + solicitud.numero} </LabelModal>
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className=" btn btn-sidebar pl-0 pr-0 ">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'SEGURO :   ' + solicitud.seguro} </LabelModal>
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                        <div className='input-group-append pl-0 pr-0'>
                            <LabelModal>  {'EXAMENES REGISTRADOS PARA EL HOSPITAL  : ' + solicitud.solicitud[0].centroTarea} </LabelModal>
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <div className=" btn btn-sidebar pl-0 pr-0 col-12">
                        <div className='input-group-append pl-0 pr-0'>
                            {/* <LabelModal>  {'EXAMENES REGISTRADOS PARA EL HOSPITAL  : ' + solicitud.solicitud[0].centroTarea+' :'} </LabelModal> */}
                        </div>
                    </div>
                </div>

                {solicitud.item.map((item) => (
                    <div className='col-12'>
                        <div className=" btn btn-sidebar pl-0 pr-0 ">
                            <div className='input-group-append pl-0 pr-0'>
                                <LabelModal>  {item.nombreExamen + ' | ' + item.grupo} </LabelModal>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <button className='btn btn-danger' onClick={() => cerrar(false)} >cerrar</button>
        </div>
    )
}


const VerPdf = ({ solicitud }) => {

    let fechaNac = solicitud.solicitud[0].fechaNac.split('T')[0]
    let hoy = new Date()
    let antes = new Date(solicitud.solicitud[0].fechaNac) // formato: yyyy-MM-dd
    let edad1 = hoy.getFullYear() - antes.getFullYear()
    let mes = hoy.getMonth() - antes.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < antes.getDate())) {
        edad1--
    }

    let hrs = ''
    if (solicitud.solicitud[0].hora_rec_sol === null) {
        hrs = 'NO RECIBIDA'
    }
    else {
        hrs = solicitud.solicitud[0].hora_rec_sol
    }
    let realizado = ''
    if (solicitud.solicitud[0].realizado === 0) {
        realizado = 'SIN REALIZAR'
    } if (solicitud.solicitud[0].realizado === 1) {
        realizado = 'REALIZADO'
    }

    let estado = ''
    if (solicitud.solicitud[0].validacion === 0) {
        estado = 'PENDIENTE'
    }
    if (solicitud.solicitud[0].validacion === 1) {
        estado = 'AUTORIZADO'
    }
    if (solicitud.solicitud[0].validacion === 2) {
        estado = 'RECHAZADO'
    }

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#C0C0C0'

        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
            fontSize: '10px'
        },
        titulo: {
            color: '#3388af',
            fontSize: '20px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        body: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'left',
            alignItems: 'left',
            margin: 10,
            padding: 10,
            flexGrow: 1,
            fontSize: '10px'
            // flexGrow:2
        },
        img: {
            maxWidth: '150px',
            maxHeight: '100',
            // flexDirection: 'column',
            // justifyContent: 'center',
            // alignItems: 'center'
        }

    });


    return (
        <Document>
            <Page size='A4'>
                <View style={styles.titulo}  >
                    <Text >SOLICITUD DE EXAMEN DE LABORATORIO</Text>
                </View>
                <View style={styles.body}>
                    <Text>  {'REALIZADO:  ' + realizado + '               ESTADO:   ' + estado} </Text>
                    <Text>  {'_________________________________________________________________________________________________'} </Text>
                    <Text>  {'                                                                  '} </Text>

                    <Text>  {'PERSONAL DE SALUD SOLICITANTE : ' + solicitud.solicitud[0].personal} </Text>
                    <Text>  {'HOSPITAL:  ' + solicitud.solicitud[0].centro} </Text>
                    <Text>  {'MUNICIPIO:  ' + solicitud.solicitud[0].municipio + '               RED:   ' + solicitud.solicitud[0].municipio} </Text>
                    <Text>  {'UNIDAD:  ' + solicitud.solicitud[0].unidad + '       AREA DE SERVICIO:  ' + solicitud.solicitud[0].area} </Text>
                    <Text>  {'SALA:   ' + solicitud.sala + '                         CAMA:  ' + solicitud.numero + '         SEGURO:   ' + solicitud.seguro} </Text>
                    <Text>  {'                                              '} </Text>

                    <Text>  {'FECHA DE SOLICITUD:  ' + solicitud.solicitud[0].fecha_sol + '          HORA SOLICITUD:  ' + solicitud.solicitud[0].hora_sol + '          HORA TOMA MUESTRA: ' + solicitud.solicitud[0].hora_toma_muestra} </Text>
                    <Text>  {'HORA RECEPCION SOLICITUD:  ' + hrs} </Text>
                    <Text>  {'                                                                  '} </Text>

                    <Text>  {'_________________________________________________________________________________________________'} </Text>
                    <Text>  {'                                                                  '} </Text>

                    <Text>  {'DIAGNOSTICO:  ' + solicitud.solicitud[0].diagnostico} </Text>
                    <Text>  {'NUMERO HISTORIAL CLÍNICO:  ' + solicitud.solicitud[0].num_historial + '        FECHA DE NACIMIENTO: ' + fechaNac} </Text>
                    <Text>  {'PACIENTE:   ' + solicitud.solicitud[0].paciente} </Text>
                    <Text>  {'CI:   ' + solicitud.solicitud[0].ci + '                         EDAD:  ' + edad1 + '         SEXO:   ' + solicitud.solicitud[0].sexo} </Text>
                    <Text>  {'                                                                                                '} </Text>
                    <Text>  {'                                                                                                '} </Text>
                    <Text>  {'ITEMS REGISTRADOS'} </Text>
                    <Text>  {'                                                                                                '} </Text>

                    {solicitud.item.map((item) => (
                        <Text>  {item.nombreExamen + ' | ' + item.grupo} </Text>
                    ))}
                    <Text>  {'                                                                                                '} </Text>
                    <Text>  {'                                                                                                '} </Text>
                    <Text>  {'                                                                                                '} </Text>
                    <View style={styles.titulo} >
                        <Image
                            src={sello}
                            // alt='randomImage'
                            style={styles.img}
                        />
                    </View>
                </View>
            </Page >
        </Document >
    )
}

export {
    ComponenteInputfecha, ComponenteInputCampo, ComponenteInputUser, Select1, ComponenteInputBuscar, ComponenteCheck, ComponenteInputUserDisabled, ComponenteInputfechaDisabled,
    ComponenteInputArea, ComponenteInputHora, ComponenteCheck2, ComponenteInputUser2, CheckSimple, Vista, Vista1, VerPdf
}
