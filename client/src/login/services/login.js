import axios from 'axios'

import url from '../../Auth/varEntorno'


//peticiones al servidor

export const Login = async (usuario, password) => {

    // console.log("hola desde servicios login")
    return await axios.post(url.url, { 
        
            "user":usuario, 
            "pass" : password
      
    })

}