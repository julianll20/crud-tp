import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js"



//inicializamos expres para correr el servidor
const app = express();

app.use(bodyParser.json());
//inicializacion de variables de entorno
dotenv.config();
//accedemos a la variable de entorno por: process.env.VARIABLE
const PORT = process.env.PORT || 3001;
const MONGOURI = process.env.MONGODB_URI;
//conexion mongo
mongoose
    .connect(MONGOURI)
    .then(() => {
        console.log("Database conected");
        app.listen(PORT, () => {
            console.log(`Server is on port ${PORT}`);
        });
    })
    .catch(error => console.log(error));
//url inicial, ruta base
app.get("/", (req, res) => {
    res.send("hello world");
});
//rutas, "use" sirve para rutas
//agrupa los endpoints de la misma entidad
app.use("/api/user", userRoute);