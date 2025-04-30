import mongoose from "mongoose";


//definimo el schema, la estructura va a ser siempre la misma, y así voy a crear miles de schemas

const userSchema = new mongoose.Schema({
    nombre:{
        type : String,
        required: true
    },
    edad:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true  //el unique es para que no se repita el valor en la base de datos, y si se repitiera, que largue error

    }
})

//ahora vamos a crear el modelo en base al schema

const User = mongoose.model("User", userSchema) //model es una manera de tipar todo para que después se realicen las validaciones
//así se exporta correctamente
export default User; //acá exportamos el modelo