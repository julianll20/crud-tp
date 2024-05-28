
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
    },
    apellido: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    carrera: {
        type: String,
        require: true,

    },
    edad: {
        type: Number,
        require: true,
    },
});


export default mongoose.model("user", userSchema);
