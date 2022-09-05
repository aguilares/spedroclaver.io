
import useAuth from "../../../Auth/useAuth";
import { useEffect, useState, useMemo } from "react";
import info from "../../../info"
import { Link } from "react-router-dom";

import Inactivo from '../../services/ausencias';   // verificacion continua del caso de avandono del equipo por parte del usuario s
import Paciente from "./Pacientes";
import RegistrosL from "./examenes/laboratorio/registros";
import RegistrosLServicios from "./examenes/laboratorio/registrosServicios";
import RegistrosLadmin from "./examenes/laboratorio/registrosAdmin";

import ReportesL from "./examenes/laboratorio/reportes";
// import FormularioL from "./examenes/laboratorio/formulario";
import { Labelinicio } from '../../../elementos/estilos'


// import script from './css/scripts'

function Sistema1() {
    const auth = useAuth()

    const [usuario, setUsuario] = useState("")
    const [centro, setCentro] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellido1, setApellido1] = useState("")
    const [apellido2, setApellido2] = useState("")
    const [sistema, setSistema] = useState("")
    const [area, setArea] = useState("")

    const [nivel, setNivel] = useState("")
    const [rol, setRol] = useState("")
    const [nombre_rol, setNombre_Rol] = useState("")




    // ******************************************************************EXAMENES DE LABORATORIO+**********************************************************
    const [registrosL, setRegistrosL] = useState(true)
    const [reportesL, setReportesL] = useState(false)
    // const [formularioL, setFormularioL] = useState(false)
    const [paciente, setPaciente] = useState(false)



    const listar = async () => {
        await info(auth).then(json => {
            setUsuario(json.data.usuario)
            setNombre(json.data.personal)
            setApellido1(json.data.apellido1)
            setApellido2(json.data.apellido2)
            setSistema(json.data.sistema)
            setNivel(json.data.nivel)
            setRol(json.data.rol)
            setNombre_Rol(json.data.nombre_rol)
            setCentro(json.data.centro)

            setArea(json.data.area)
            // console.log(json.data)
        })

    }

    useEffect(() => {
        listar()
        //CONFIGURACION PARA monitorear el estado de LA PAGINA CADA 10 SEGUNDOS
        const inter = setInterval(() => {
            Inactivo(auth)
        }, 10000);
        return inter;

    }, [])

    const salir = () => {
        let ok = window.confirm('Cerrar Sesion ?')
        if (ok) {
            auth.logout()
        }
    }

    //evento de mouse en cualquier parte de la pantalla del navegador

    const handleClick = () => {
        localStorage.setItem('tiempo', new Date().getMinutes())
        // console.log("cookie", cookies.get("tiempo"))

    }

    const handleKeyPress = () => {
        localStorage.setItem('tiempo', new Date().getMinutes())
        // console.log("cookie", cookies.get("tiempo"))
    }

    const entrarPaciente = () => {
        setPaciente(true)
        setReportesL(false)
        setRegistrosL(false)
    }


    const entrarRerpotesL = () => {
        setReportesL(true)
        setRegistrosL(false)
        setPaciente(false)
    }

    const entrarRegistrosL = () => {
        setRegistrosL(true)
        setReportesL(false)
        setPaciente(false)
    }

    // console.log("nueva persona: ", nombre, apellido1, apellido2)
    return (
        <>
            <body className="hold-transition sidebar-mini" onClick={handleClick} onKeyPress={handleKeyPress}>
                <div className="wrapper">
                    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                            </li>
                            <li className="nav-item d-none d-sm-inline-block">
                                <a href="index3.html" className="nav-link">Inicio</a>
                            </li>
                            <li className="nav-item d-none d-sm-inline-block">
                                <a href="#" className="nav-link">Contactos</a>
                            </li>
                        </ul>

                        {/* <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                                    <i className="fas fa-search"></i>
                                </a>
                                <div className="navbar-search-block">
                                    <form className="form-inline">
                                        <div className="input-group input-group-sm">
                                            <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                                            <div className="input-group-append">
                                                <button className="btn btn-navbar" type="submit">
                                                    <i className="fas fa-search"></i>
                                                </button>
                                                <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </li>
                        </ul> */}
                    </nav>

                    <aside className="main-sidebar sidebar-dark-primary elevation-4">

                        <Labelinicio >{sistema}</Labelinicio>


                        <div className="sidebar">

                            <div className="brand-text text-white d-block font-weight-light text-center">{nombre + ' ' + apellido1 + ' ' + apellido2}</div>
                            <div className="brand-text text-white d-block font-weight-light text-center">{'ROL ' + nombre_rol}</div>

                            {/* <div className="form-inline">

                                <div className="input-group" data-widget="sidebar-search">
                                    <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                    <div className="input-group-append">
                                        <button className="btn btn-sidebar">
                                            <i className="fas fa-search fa-fw"></i>
                                        </button>
                                    </div>
                                </div>
                            </div> */}

                            <div className="user-panel mt-3 pb-3 mb-3 d-flex">

                                <div className="info">
                                    <small className="brand-text text-white d-block font-weight-light text-center">{centro}</small>
                                    <div className="brand-text text-white d-block font-weight-light text-center">{'AREA ' + area}</div>
                                </div>
                            </div>



                            <nav className="mt-2">
                                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                    <li className="nav-item">
                                        <a className="nav-link active">
                                            <i className="nav-icon fas fa-laptop-medical" ></i>
                                            <p>
                                                laboratorio
                                                <i className="right fas fa-angle-left"></i>
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a onClick={entrarRegistrosL} className="nav-link">
                                                    <i className="far fa-registered nav-icon"></i>
                                                    <p>Registros</p>
                                                </a>
                                            </li>
                                            {

                                                rol === 1 ?
                                                    <li className="nav-item">
                                                        <Link to='/form' className="nav-link">
                                                            <i className="fas fa-notes-medical nav-icon"></i>
                                                            <p>formulario</p>
                                                        </Link>
                                                    </li> : null
                                            }
                                            {
                                                rol === 3 ?
                                                    <li className="nav-item">
                                                        <a onClick={entrarRerpotesL} className="nav-link">
                                                            <i className="fas fa-laptop-medical nav-icon"></i>
                                                            <p>reportes</p>
                                                        </a>
                                                    </li>:null
                                            }

                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a onClick={entrarPaciente} className="nav-link">
                                            <i className="nav-icon fas fa-th"></i>
                                            <p>
                                                Pacientes
                                                <span className="right badge badge-danger">New</span>
                                            </p>
                                        </a>
                                    </li>
                                   {
                                       rol ===3 ?<li className="nav-item">
                                       <a onClick={entrarPaciente} className="nav-link">
                                           <i className="nav-icon fas fa-user"></i>
                                           <p>
                                               Usuarios
                                               {/* <span className="right badge badge-danger">New</span> */}
                                           </p>
                                       </a>
                                   </li>:null
                                   } 
                                    <li className="nav-item" >
                                        <a className="nav-link">
                                            <i className="nav-icon fas fa-power-off"></i>
                                            <p>
                                                CERRAR SESION
                                                <i className="right fas fa-angle-left"></i>
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a onClick={salir} className="nav-link">
                                                    <i className="fas fa-exclamation nav-icon"></i>
                                                    <p>SALIR</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    {/* <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon fas fa-copy"></i>
                                            <p>
                                                Layout Options
                                                <i className="fas fa-angle-left right"></i>
                                                <span className="badge badge-info right">6</span>
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href="pages/layout/top-nav.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Top Navigation</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/layout/top-nav-sidebar.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Top Navigation + Sidebar</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/layout/boxed.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Boxed</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/layout/fixed-sidebar.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Fixed Sidebar</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/layout/fixed-sidebar-custom.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Fixed Sidebar <small>+ Custom Area</small></p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/layout/fixed-topnav.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Fixed Navbar</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/layout/fixed-footer.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Fixed Footer</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/layout/collapsed-sidebar.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Collapsed Sidebar</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon fas fa-chart-pie"></i>
                                            <p>
                                                Charts
                                                <i className="right fas fa-angle-left"></i>
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href="pages/charts/chartjs.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>ChartJS</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/charts/flot.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Flot</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/charts/inline.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Inline</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/charts/uplot.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>uPlot</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon fas fa-tree"></i>
                                            <p>
                                                UI Elements
                                                <i className="fas fa-angle-left right"></i>
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href="pages/UI/general.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>General</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/UI/icons.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Icons</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/UI/buttons.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Buttons</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/UI/sliders.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Sliders</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/UI/modals.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Modals & Alerts</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/UI/navbar.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Navbar & Tabs</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/UI/timeline.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Timeline</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/UI/ribbons.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Ribbons</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon fas fa-edit"></i>
                                            <p>
                                                Forms
                                                <i className="fas fa-angle-left right"></i>
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href="pages/forms/general.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>General Elements</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/forms/advanced.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Advanced Elements</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/forms/editors.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Editors</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/forms/validation.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Validation</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon fas fa-table"></i>
                                            <p>
                                                Tables
                                                <i className="fas fa-angle-left right"></i>
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href="pages/tables/simple.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Simple Tables</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/tables/data.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>DataTables</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/tables/jsgrid.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>jsGrid</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-header">EXAMPLES</li>
                                    <li className="nav-item">
                                        <a href="pages/calendar.html" className="nav-link">
                                            <i className="nav-icon fas fa-calendar-alt"></i>
                                            <p>
                                                Calendar
                                                <span className="badge badge-info right">2</span>
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="pages/gallery.html" className="nav-link">
                                            <i className="nav-icon far fa-image"></i>
                                            <p>
                                                Gallery
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="pages/kanban.html" className="nav-link">
                                            <i className="nav-icon fas fa-columns"></i>
                                            <p>
                                                Kanban Board
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon far fa-envelope"></i>
                                            <p>
                                                Mailbox
                                                <i className="fas fa-angle-left right"></i>
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href="pages/mailbox/mailbox.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Inbox</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/mailbox/compose.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Compose</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/mailbox/read-mail.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Read</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon fas fa-book"></i>
                                            <p>
                                                Pages
                                                <i className="fas fa-angle-left right"></i>
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href="pages/examples/invoice.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Invoice</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/examples/profile.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Profile</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/examples/e-commerce.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>E-commerce</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/examples/projects.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Projects</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/examples/project-add.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Project Add</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/examples/project-edit.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Project Edit</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/examples/project-detail.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Project Detail</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/examples/contacts.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Contacts</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/examples/faq.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>FAQ</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/examples/contact-us.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Contact us</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon far fa-plus-square"></i>
                                            <p>
                                                Extras
                                                <i className="fas fa-angle-left right"></i>
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href="#" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>
                                                        Login & Register v1
                                                        <i className="fas fa-angle-left right"></i>
                                                    </p>
                                                </a>
                                                <ul className="nav nav-treeview">
                                                    <li className="nav-item">
                                                        <a href="pages/examples/login.html" className="nav-link">
                                                            <i className="far fa-circle nav-icon"></i>
                                                            <p>Login v1</p>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="pages/examples/register.html" className="nav-link">
                                                            <i className="far fa-circle nav-icon"></i>
                                                            <p>Register v1</p>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="pages/examples/forgot-password.html" className="nav-link">
                                                            <i className="far fa-circle nav-icon"></i>
                                                            <p>Forgot Password v1</p>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="pages/examples/recover-password.html" className="nav-link">
                                                            <i className="far fa-circle nav-icon"></i>
                                                            <p>Recover Password v1</p>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>
                                                        Login & Register v2
                                                        <i className="fas fa-angle-left right"></i>
                                                    </p>
                                                </a>
                                                <ul className="nav nav-treeview">
                                                    <li className="nav-item">
                                                        <a href="pages/examples/login-v2.html" className="nav-link">
                                                            <i className="far fa-circle nav-icon"></i>
                                                            <p>Login v2</p>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="pages/examples/register-v2.html" className="nav-link">
                                                            <i className="far fa-circle nav-icon"></i>
                                                            <p>Register v2</p>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="pages/examples/forgot-password-v2.html" className="nav-link">
                                                            <i className="far fa-circle nav-icon"></i>
                                                            <p>Forgot Password v2</p>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="pages/examples/recover-password-v2.html" className="nav-link">
                                                            <i className="far fa-circle nav-icon"></i>
                                                            <p>Recover Password v2</p>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/examples/lockscreen.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Lockscreen</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/examples/legacy-user-menu.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Legacy User Menu</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/examples/language-menu.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Language Menu</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/examples/404.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Error 404</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/examples/500.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Error 500</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/examples/pace.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Pace</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/examples/blank.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Blank Page</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="starter.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Starter Page</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon fas fa-search"></i>
                                            <p>
                                                Search
                                                <i className="fas fa-angle-left right"></i>
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href="pages/search/simple.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Simple Search</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/search/enhanced.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Enhanced</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-header">MISCELLANEOUS</li>
                                    <li className="nav-item">
                                        <a href="iframe.html" className="nav-link">
                                            <i className="nav-icon fas fa-ellipsis-h"></i>
                                            <p>Tabbed IFrame Plugin</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="https://adminlte.io/docs/3.1/" className="nav-link">
                                            <i className="nav-icon fas fa-file"></i>
                                            <p>Documentation</p>
                                        </a>
                                    </li>
                                    <li className="nav-header">MULTI LEVEL EXAMPLE</li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="fas fa-circle nav-icon"></i>
                                            <p>Level 1</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon fas fa-circle"></i>
                                            <p>
                                                Level 1
                                                <i className="right fas fa-angle-left"></i>
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href="#" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Level 2</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>
                                                        Level 2
                                                        <i className="right fas fa-angle-left"></i>
                                                    </p>
                                                </a>
                                                <ul className="nav nav-treeview">
                                                    <li className="nav-item">
                                                        <a href="#" className="nav-link">
                                                            <i className="far fa-dot-circle nav-icon"></i>
                                                            <p>Level 3</p>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="#" className="nav-link">
                                                            <i className="far fa-dot-circle nav-icon"></i>
                                                            <p>Level 3</p>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="#" className="nav-link">
                                                            <i className="far fa-dot-circle nav-icon"></i>
                                                            <p>Level 3</p>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Level 2</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="fas fa-circle nav-icon"></i>
                                            <p>Level 1</p>
                                        </a>
                                    </li>
                                    <li className="nav-header">LABELS</li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon far fa-circle text-danger"></i>
                                            <p className="text">Important</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon far fa-circle text-warning"></i>
                                            <p>Warning</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon far fa-circle text-info"></i>
                                            <p>Informational</p>
                                        </a>
                                    </li> */}
                                </ul>
                            </nav>
                        </div>
                    </aside>


                    <div className="content-wrapper">
                        <div className="content">
                            <div className="container-fluid">
                                {/* {paciente === true && <Paciente />} */}

                                {/* *********************EXAMENES DE LABORATORIO*******************************++ */}
                                {registrosL === true && nivel === 1 && rol === 1 && <RegistrosL />}
                                {registrosL === true && nivel === 1 && rol === 2 && <RegistrosLServicios />}
                                {registrosL === true && nivel === 1 && rol === 3 && <RegistrosLadmin />}


                                {reportesL === true && nivel === 1 && rol === 3 && <ReportesL />}
                                {paciente === true && <Paciente />}

                            </div>
                        </div>
                    </div>

                    <aside className="control-sidebar control-sidebar-dark">
                    </aside>
                </div>
            </body>

        </>

    );
}
export default Sistema1;
