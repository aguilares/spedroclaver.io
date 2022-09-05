
import { Route } from "react-router-dom"
import useAuth from "../Auth/useAuth"

// const sesion = null;
// const user = { id: 1, username: 'juan', password: 1234, nivel: 2 }

export default function Check({ component: Component, ...rest }) {
    const auth = useAuth();
    return (
        
            <Route {...rest}>
                {auth.isLogged() ? <Component /> :window.location.href="/" }
                
            </Route> 
        
    )

}
