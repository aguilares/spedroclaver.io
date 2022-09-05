import axios from 'axios'
import url, { laboratorio } from '../../../../../Auth/varEntorno'



//peticiones al servidor

const paciente = async (auth, ci) => {

    // alert('estamos en servicios', ci)
    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },
        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/paciente', {
            token: token,
            ci: ci
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {

            // console.log(res)

            return res
        }

    } else {
        console.log("algo salio mal paciente")
        auth.logout()
    }
}

const salas = async (auth, id) => {

    const token = localStorage.getItem("token")


    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )



    if (token != null) {



        const res = await axios.post(url.url + '/servicioscompl/salas', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {

            // console.log(res)

            return res
        }

    } else {
        console.log("algo salio mal, salas")
        auth.logout()
    }
}

const camas = async (auth, id) => {

    // console.log('id de la sala en services: ', id)
    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/camas', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {

            // console.log(res)

            return res
        }

    } else {
        console.log("algo salio mal, camas")
        auth.logout()
    }
}
const seguros = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/seguros', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {

            // console.log(res)

            return res
        }

    } else {
        console.log("algo salio mal, seguros")
        auth.logout()
    }
}

const examenes = async (auth, idCentro) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/lab_examen', {
            token: token,
            id: idCentro,
            examen: url.laboratorio
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {

            // console.log(res)

            return res
        }

    } else {
        console.log("algo salio mal, examenes")
        auth.logout()
    }
}

const otroLaboratorio = async (auth) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/otroLaboratorio', {
            token: token,
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal , otro laboratorio")
        auth.logout()
    }
}

const guardar = async (auth, fecha_sol, hora_sol, hora_toma_muestra, num_historial, diagnostico, id_area, id_cama, id_seguro, id_paciente, id_usuario, examen) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/guardar', {
            token: token,
            fecha_sol: fecha_sol,
            hora_sol: hora_sol,
            hora_toma_muestra: hora_toma_muestra,
            num_historial: num_historial,
            diagnostico: diagnostico,
            id_area: id_area,
            id_cama: id_cama || null,
            id_seguro: id_seguro || null,
            id_paciente: id_paciente,
            id_usuario: id_usuario,
            examen: examen

        })

        if (res.data.status === 6) {
            auth.logout()
        } else {

            // console.log(res)

            return res
        }

    } else {
        console.log("algo salio mal, guardar solicitud")
        auth.logout()
    }
}


const cantidadA = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/cantidadA', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, cantidad aceptados")
        auth.logout()
    }
}


const cantidadP = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/cantidadP', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, cantidad pendientes!!!!!!!!!!!!!!!!!!!")
        auth.logout()
    }
}


const cantidadR = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/cantidadR', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, cantdad rechazados")
        auth.logout()
    }
}


//ADMINISTRACION
const cantidadAadmin = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/cantidadAadmin', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, cantidad aceptados")
        auth.logout()
    }
}


const cantidadPadmin = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/cantidadPadmin', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, cantidad pendientes!!!!!!!!!!!!!!!!!!!")
        auth.logout()
    }
}


const cantidadRadmin = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/cantidadRadmin', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, cantdad rechazados")
        auth.logout()
    }
}


// VER SOLICITUD ROL SOLICITANTE PRIMERA LINEA

const vercantidadA = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/vercantidadA', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, ver cantidad aceptados")
        auth.logout()
    }
}

const vercantidadP = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/vercantidadP', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, ver cantodad pendientes")
        auth.logout()
    }
}

const vercantidadR = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/vercantidadR', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, ver cantidad rechazados")
        auth.logout()
    }
}


// VER SOLICITUD ROL ADMINISTRACION

const vercantidadAadmin = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/vercantidadAadmin', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, ver cantidad aceptados")
        auth.logout()
    }
}

const vercantidadPadmin = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/vercantidadPadmin', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, ver cantodad pendientes")
        auth.logout()
    }
}

const vercantidadRadmin = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/vercantidadRadmin', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, ver cantidad rechazados")
        auth.logout()
    }
}

const buscarSolicitudadmin = async (auth, id, ci) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/buscarsolicitudadmin', {
            token: token,
            id: id,
            cinhc: ci
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, ver cantidad rechazados")
        auth.logout()
    }
}
const verInformacionCompletaadmin = async (auth, sol) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/especificoadmin', {
            token: token,
            sol: sol
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, ver services ruta informacion completa")
        auth.logout()
    }
}

const autorizarLab = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/autorizar', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, ver services ruta informacion completa")
        auth.logout()
    }
}

const rechazarLab = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/rechazar', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, ver services ruta informacion completa")
        auth.logout()
    }
}


// ver la informacion completa
const verInformacionCompleta = async (auth, user, sol) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/especifico', {
            token: token,
            user: user,
            sol: sol
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, ver services ruta informacion completa")
        auth.logout()
    }
}
//************************************************************************REGISTROS********************************************************** */
const buscarSolicitud = async (auth, id, ci) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/buscarsolicitud', {
            token: token,
            id: id,
            cinhc: ci
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, ver cantidad rechazados")
        auth.logout()
    }
}

const modificar = async (auth, id, fecha_sol, hora_sol, hora_toma_muestra, num_historial, diagnostico, id_area, id_cama, id_seguro, id_paciente, id_usuario, examen) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/modificar', {
            token: token,
            id: id,
            fecha_sol: fecha_sol,
            hora_sol: hora_sol,
            hora_toma_muestra: hora_toma_muestra,
            num_historial: num_historial,
            diagnostico: diagnostico,
            id_area: id_area,
            id_cama: id_cama || null,
            id_seguro: id_seguro || null,
            id_paciente: id_paciente,
            id_usuario: id_usuario,
            examen: examen

        })

        if (res.data.status === 6) {
            auth.logout()
        } else {

            // console.log(res)

            return res
        }

    } else {
        console.log("algo salio mal, modificar solicitud solicitud")
        auth.logout()
    }
}


const eliminar = async (auth, id, id_usuario) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/eliminarsol', {
            token: token,
            id: id,
            id_usuario: id_usuario
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {

            // console.log(res)

            return res
        }

    } else {
        console.log("algo salio mal, eliminar solicitud solicitud")
        auth.logout()
    }
}


const realizado = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/realizado', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {

            // console.log(res)

            return res
        }

    } else {
        console.log("algo salio mal, eliminar solicitud solicitud")
        auth.logout()
    }
}


const cantidadPservicios = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/cantidadPservicios', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, ver cantidad aceptados")
        auth.logout()
    }
}

const cantidadRservicios = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/cantidadRservicios', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, ver cantidad aceptados")
        auth.logout()
    }
}

const vercantidadPservicios = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/vercantidadPservicios', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, ver cantidad aceptados")
        auth.logout()
    }
}

const vercantidadRservicios = async (auth, id) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/vercantidadRservicios', {
            token: token,
            id: id
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, ver cantidad aceptados")
        auth.logout()
    }
}
const verInformacionCompletaServicios = async (auth, sol) => {

    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },

        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )

    if (token != null) {

        const res = await axios.post(url.url + '/servicioscompl/especificosevicios', {
            token: token,
            id: sol
        })

        if (res.data.status === 6) {
            auth.logout()
        } else {
            return res
        }

    } else {
        console.log("algo salio mal, ver services ruta informacion completa")
        auth.logout()
    }
}

export {
    paciente, salas, camas, seguros, examenes, otroLaboratorio, guardar, cantidadA, cantidadP, cantidadR, cantidadAadmin, cantidadPadmin, cantidadRadmin,
    vercantidadA, vercantidadP, vercantidadR, vercantidadAadmin, vercantidadPadmin, vercantidadRadmin, buscarSolicitudadmin, verInformacionCompletaadmin, autorizarLab,
    rechazarLab, verInformacionCompleta,
    buscarSolicitud, modificar,
    eliminar,
    realizado, cantidadPservicios, cantidadRservicios, vercantidadPservicios, vercantidadRservicios,verInformacionCompletaServicios
}