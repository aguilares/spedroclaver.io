import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'



// este archivo inicializa la pagina

ReactDOM.render( //rendizamos la aplicacion en pantalla
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root') //se pone la pagina en la aplicacion react
);