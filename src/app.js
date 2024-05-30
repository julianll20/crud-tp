import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./db.js";
import {PORT} from "./cofig.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/category.Routes.js";
import productRoute from "./routes/productRoute.js";



const app = express();
app.use(bodyParser.json());

//conexiion a la base de datos
connectDB();
//rutas de la aplicacion
//ruta base
app.get("/", (req, res)=>{
    res.send("hello world");
});
//ruta usuario
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/category",categoryRoute);

//iniciar servidor
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);

});