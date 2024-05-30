import { Router } from "express";
import {create,deleteProduct,findOne,getAll, update,} from "../controllers/productController.js";

const productRoute = Router();

productRoute.post("/create", create);
productRoute.get("/getAll", getAll);
productRoute.get("/findOne/:name", findOne);
productRoute.delete("/delete/:id", deleteProduct);
productRoute.put("/update/:id", update);

export default productRoute;