import express from "express";
import { create, get, update, deleteUser, validate } from "../controllers/userController.js";

const userRoute = express.Router();

// Endpoints
userRoute.post("/create", create);
userRoute.get("/getAll", get);
// :id -> req.params.id
userRoute.put("/update/:id", update);
userRoute.delete("/deleteUser/:id", deleteUser);
userRoute.post("/login", validate);

export default userRoute;
