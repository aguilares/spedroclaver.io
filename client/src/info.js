import axios from 'axios'

import url from "./Auth/varEntorno"

const info = async(auth) => {
    // console.log("desde info actual")
    const token = localStorage.getItem("token")
    

    if (token != null) {

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
        // console.log("desde info actual recien ", token)
        const res = await axios.post(url.url + '/token', {

            "token": token 

        })
        // console.log("desde info actual recien ", token, res.data)

        if (res.data.status === 6 || res.data.status === 2) {
            // console.log("se serro la sesion estados")
            auth.logout()
        } 
            
        return res



    } else {
        console.log("se serro la sesion sin token")
        
        auth.logout()
    }

}



export default info;