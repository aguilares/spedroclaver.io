const express = require('express')
const rutas = require('./routes/routes')
const app = express()

app.use(express.urlencoded({ extended: false }))
// le diremos a la API que recibirá archivos de tipo json
app.use(express.json())


// Access-Control-Allow-Origin: Para controlar quien puede consumir mi API
// Access-Control-Allow-Headers: Para configurar los headers que acepta la API
// Access-Control-Allow-Methods: Para declarar los métodos que acepta el API

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use(rutas)



////puerto y puesta en marcha d el servidor expres
app.set('port', process.env.port || 9000)
app.listen(app.get('port'), () => {
    // process.on('SIGTERM', ()=>{
    //     server.exit(()=>{
    //         console.log('proceso finalizado')
    //     })
    // })
// process.on('uncaughtException', (err) => {

//     console.log('actuacion de procces')
//     if(1==1){
    
//         process.exit(1)
//     }
// })
    console.log('EL SERVIDOR ESTA CORRIENDO EN: ', 'http://localhost:' + app.get('port'))
})