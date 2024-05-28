import express from "express";
import { create, get, update, deleteUser } from "../controllers/userController.js";

const userRoute = express.Router();

// Endpoints
userRoute.post("/create", create);
userRoute.get("/getAll", get);
// :id -> req.params.id
userRoute.put("/update/:id", update);
userRoute.delete("/deleteUser/:id", deleteUser);

export default userRoute;
