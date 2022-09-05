import Sistema1 from "./SISTEMA1/componentes/admin/ssgl";

import useAuth from './Auth/useAuth'
import axios from "axios";

import url from "./Auth/varEntorno"


    export const Home = async (usuario, password) => {
        const token = localStorage.getItem("token")

        console.log("hola desde servicios login", token)
        return await axios.post(url.url+'/token', { 
            
                "user":token, 
                
          
        }).then(json=>{
            console.log(json.data)
        })
    
    }
    

export default Home;