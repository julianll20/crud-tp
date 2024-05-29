
import mongoose from "mongoose";
import { isGoodPassword } from "../utils/validators.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const carreraEnum = [
    "ingeniería",
    "medicina",
    "derecho",
    "matemáticas",
    "arte",
];

const usuarioEsquema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        maxlength: 16,
        minlength: 2,
        trim: true,
        lowercase: true,
    },

    apellido: {
        type: String,
        required: true,
        maxlength: 16,
        minlength: 2,
        trim: true,
        lowercase: true,
    },

    correo: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 8,
        trim: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/,
        unique: true,
    },

    carrera: {
        type: String,
        required: true,
        enum: carreraEnum,
        validate: {
            validator: function (v) {
                return carreraEnum.includes(v);
            },
            message: (props) => `${props.value} no es una carrera válida`,
        },
    },

    edad: {
        type: Number,
        required: true,
        min: 17,
        max: 120,
    },

    fechaRegistro: {
        type: Date,
        default: Date.now,
    },

    password: {
        type: String,
        validate: {
            validator: function (value) {
                return isGoodPassword(value);
            },
            message:
                "La contraseña debe tener entre 6 y 12 caracteres, contener un dígito numérico, una letra minúscula y una letra mayúscula",
        },
    },
});

usuarioEsquema.pre("save", function (next) {
    if (this.isModified("contraseña")) {
        this.contraseña = bcrypt.hashSync(this.contraseña, 10);
    }
    next();
});

usuarioEsquema.methods.generarTokenAutenticación = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
};

const Usuario = mongoose.model("usuario", usuarioEsquema);

export default Usuario;
