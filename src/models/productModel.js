import mongoose from "mongoose";

const statusEnum = ["AVAILABLE", "NOT AVAILABLE", "DISCONTINUED"];

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field is required"],
        minLength: [3, "Name must be at least 3 characters long"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Price field is required"],
        min: [0, "Price must be a positive number"],
        get: (value) => value * 1.21,
    },
    description: {
        type: String,
        trim: true,
    },
    quantity: {
        type: Number,
        min: [0, "Quantity must be a positive number"],
        default: 0,
    },
    status: {
        type: String,
        validate: {
            validator: (v) => statusEnum.includes(v),
            message: (props) => `${props.value} is not a valid status`,
        },
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "category",
        required: [true, "Category field is required"],
    },
    destacado: {
        type: Boolean,
        default: false,
    },
});

productSchema.set("toJSON", { getters: true, setters: true });

export default mongoose.model("Product", productSchema);
