import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();
//instanciamos express

const app = express()

const PORT = process.env.PORT || 3000;

//vamos a usar middleware
//el middleware es para decirle a la app que va a manejar ciertas cuestiones y que no la tiene que descartar
app.use(express.json()) //esto hace que cuando le mande una consulta, le pueda meter en el body de la consulta "json"

//rutas

//importación de modelos
import User from './models/User.js'

//creación de rutas
//en los parentesis de la función guardamos la peticion y la respuesta, son los manejadores 
app.get("/usuario",(req,res)=>{
    User.find()//esto lo que hace es buscar a todos los user
    .then((usuarios)=>{
        res.json(usuarios) //el res.json va a ser la respuesta que a mi me va a dar el postman
    })
    .catch((err)=>{
        //si hubo error, respondemos con un mensaje de error
        res.status(500).json({error: 'Error al traer usuarios',details : err});
    })
})

//creación del metodo POST

app.post("/usuario",(req,res)=> {
    //acá hay que crear un nuevo usuario con lo que me trae la request
    const nuevoUsuario = new User({
        nombre: req.body.nombre,
        edad : req.body.edad,
        email: req.body.email
    })
    nuevoUsuario.save()
    .then((usuarioGuardado)=>{
        res.status(201).json(usuarioGuardado) //acá le mostramos que usuario guardamos a quien hizo la consulta
    })
    .catch((err)=>{
        //si hubo error, respondemos con un mensaje de error
        res.status(500).json({error: 'Error al guardar el usuario ',details : err});
    })
})

//conexcion a mongoDB(base de datos)
//las conexiones suelen ser muy parecidas, o todas iguales

const MONGO_URL = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@localhost:27017/?authSource=admin` //esta es la direccion en la que esta la base de datos

//ahora usaremos mongoose
//mongoose nos brinda un método para conectarnos a mongodata

mongoose.connect(MONGO_URL).then(()=>console.log("conexión exitosa")).catch((err) => console.log("conexión fallida",err))
app.listen(PORT,()=>console.log("servidor corriendo")) //esto es para que la app escuche al puerto que definimos
//ponemos un clg para ver que este corriendo
