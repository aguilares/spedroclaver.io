import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Check from './check';
import Home from '../home';
import Formulario from '../login/login'
import PublicRoute from './publicRoute';
import ssgl from '../SISTEMA1/componentes/admin/ssgl';
import FormularioL from '../SISTEMA1/componentes/admin/examenes/laboratorio/formulario';



export default function AppRouter() {

  return (
    
    <BrowserRouter>
      <div>
        <Switch>

          <PublicRoute exact path = "/" component={Formulario}/>
          <Check exact path = '/home' component = {Home}/>
          <Check exact path = '/ssgl' component = {ssgl}/>
          <Check exact path = '/form' component = {FormularioL}/>
          <Check exact path = '/form/:id' component = {FormularioL}/>

          <Route path="*" >
            <h1>
              no Existe la url, CLICK <Link to='/'>aqui</Link> para volver a la pagina principal
            </h1>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
    
  )
}

