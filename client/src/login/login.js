import { Fragment, useState } from "react";
import { Link } from 'react-router-dom';
import useAuth from "../Auth/useAuth";
import 'bootstrap/dist/css/bootstrap.min.css';
import md5 from 'md5'

import { ComponenteInputUser } from '../elementos/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ContenedormensajeError } from '../elementos/estilos'


import { Login } from "./services/login";

import Cookies from 'universal-cookie'
const cookie = new Cookies()
const Formulario = () => {

  const [usuario, setUsuario] = useState({ campo: '', valido: null })
  const [password, setPassword] = useState({ campo: '', valido: null })
  const [formulario, setFormulario] = useState(null)
  const [mensaje, setMensaje] = useState('')

  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }

  const auth = useAuth()

  const iniciarSesion = async (e) => {

    if ((usuario.valido === 'true' && password.valido === 'true')) {
      // const md5s = md5()
      const user = usuario.campo;
      const pass = md5(password.campo);

      e.preventDefault()  //para que la pagina no se recargue

      try {
        await Login(user, pass).then(json => {

          // console.log("token del servidor hoy: ",json.data.token)

          if (json.data.token != null) {
            setFormulario(true);
            localStorage.setItem('tiempo', new Date().getMinutes())
            const token = json.data.token
            localStorage.setItem("token", token)
            auth.login("ok")

          } else {
            alert("Datos incorrectos !!!")
          }
        })

      } catch (error) {
        setMensaje('SERVIDOR AUSENTE')
      }

    } else {
      setFormulario(false);
    }

  }

  return (
    <Fragment>
      <div className="hold-transition login-page mt-0">
        <div className="row  ">
          {/* <h4>{datos.usuario} - {datos.contraseña} </h4> */}
          <div className="col-1 col-sm-2 col-md-3 col-lg-4 "></div>
          <div className="col-11">
            <div className="login-box mt-0">
              <div className="card card-outline card-primary mt-0">
                <div className="card-header text-center">
                  <h4 className="login-box-msg"> <p> LABORATORIOS </p></h4>
                  {mensaje !== '' && <p className='text-danger'>{mensaje}</p>}
                </div>
                <div className=" card-body">
                  <p className="login-box-msg">inicie session</p>
                  <form >

                    <div className="mb-3">
                      <ComponenteInputUser
                        estado={usuario}
                        cambiarEstado={setUsuario}
                        tipo="text"
                        name="user"
                        placeholder="Usuario"
                        leyendaError=" el usuario no cumple con las requisitos"
                        ExpresionRegular={expresiones.usuario}
                        span="fas fa-envelope"
                        className_="form-control form-control-sm"
                        useri={true}
                      />
                    </div>


                    <div>
                      <ComponenteInputUser
                        estado={password}
                        cambiarEstado={setPassword}
                        tipo="password"
                        name="pass"
                        placeholder="Contraseña"
                        leyendaError=" la contraseña no cumple con las requisitos"
                        ExpresionRegular={expresiones.password}
                        span="fas fa-lock"
                        className_="form-control form-control-sm"
                        useri={true}
                      />
                    </div>
                    {formulario === false && <ContenedormensajeError >
                      <p>
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        <b>Error:  </b> Por favor rellene el formulario
                        correctamente
                      </p>

                    </ContenedormensajeError>}
                    <div className="row pt-3">
                      <div className=" col-lg-6">

                      </div>
                      <div className=" row pl-4 pr-0 col-12 col-lg-12 ">
                        <Link
                          onClick={iniciarSesion}
                          to="/ssgl"
                          type="submit"
                          className="btn btn-primary btn-block float-rigth">Ingresar
                        </Link>

                      </div>
                    </div>
                  </form>
                  <div className="card-header"></div>
                  <p className="text-left">
                    <a href="indrec_contraseña.html">olvidó su contraseña ?</a>
                  </p>
                  <br></br>
                  <p className="text-left">
                    Si es personal de salud de este area
                  </p>
                  <p className="text-left">
                    <a href="ind_registro.html" className="text-center">Solicite su cuenta ahora! </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Formulario;
