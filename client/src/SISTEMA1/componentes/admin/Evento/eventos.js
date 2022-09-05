
const Evento = {}

Evento.mostrarModalInsetar = (setModal, setMensaje, funcion1, funcion2) => {
    setModal(true);
    setMensaje('Por favor!! Asegúrese bien que la informacion proporcionada sea la correcta')
    if(funcion1) {
        funcion1() 
    }
    if(funcion2) {
        funcion2() 
    }

}


Evento.ocultarModalInsertar = (setModal, setForm, setMensaje, setFormulario) => {
    setModal(false);
    setForm({ id: '', nombre: "" , valido : null})
    setMensaje('')
    setFormulario(0)
}
Evento.mostrarModalEditar = (setModal, setForm, r, setMensaje) => {
    setModal(true)
    console.log(r)
    setForm({...r}) 
    setMensaje('En caso de éxito, este formulario se cerrara de forma automática despues de la transaccion. Asegúrese de proporcionar la informacion correcta')
}

Evento.eliminar = async( setForm, r) => {
    console.log(r, 'datos en eventos')
    setForm({id: r.id, nombre: r.nombre, valido : 'true'}) 
}

Evento.ocultarModalEditar = (estado, setForm, setMensaje, setFormulario) => {
    estado(false);
    setForm({ id: '', nombre: "", valido : null })
    setMensaje('')
    setFormulario(0)
}


export default Evento;