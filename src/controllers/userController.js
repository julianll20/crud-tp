import User from "../models/userModel.js";

export const create = async (req, res) => {
    try {
        // Tomar datos de body (POST)
        const userData = new User(req.body);
        
        // Buscar si existe usuario (filtrar por email)
        const { email } = userData;
        const userExist = await User.findOne({ email });
        
        if (userExist) {
            return res.status(400).json({ message: `User with email: ${email} already exists` });
        }
        
        // Guardar el usuario 
        const savedUser = await userData.save();
        
        // Mostrar información del usuario guardado
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const get = async (req, res) => {
    try {
        const users = await User.find();
        
        if (users.length === 0) {
            return res.status(404).json({ message: "There are no users" });
        }
        
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Buscar si el usuario existe por ID
        const userExist = await User.findOne({ _id: id });
        
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Actualizar el usuario
        const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Buscar si el usuario existe por ID
        const userExist = await User.findOne({ _id: id });
        
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Eliminar el usuario
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
