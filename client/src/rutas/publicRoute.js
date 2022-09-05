import { Route} from "react-router-dom"
import useAuth from "../Auth/useAuth"


// const sesion = null;
// const user = { id: 1, username: 'juan', password: 1234, nivel: 2 }

export default function PublicRoute({ component: Component, ...rest }) {
    const auth = useAuth();

    return (
        
            <Route {...rest}>
                {auth.isLogged()? (
                    // <Redirect to = '/ssgl' /> // si el usuario esta logueado se redirige a la pagina principal
                    window.location.href = "/ssgl"
                
                ) : ( 
                    <Component /> // caso contrario se redirige al componente enviado, en este caso nos redirige a la pagina de usuario y contraseña
                )}
            </Route>
    );
} 