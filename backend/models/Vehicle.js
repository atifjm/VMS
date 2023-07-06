import mongoose from "mongoose"

const vehicleSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    category: {
        type: String,
        required: [true, "category is required"],
    },
    brand: {
        type: String,
        required: [true, "brand is required"],
    },
    model: {
        type: String,
        required: [true, "model is required"],
    },
    make: {
        type: Number,
        required: [true, "make is required"],
    },
    color: {
        type: String,
        required: [true, "color is required"],
    },
    registration: {
        type: String,
        required: [true, "registration no is required"],
    },

}, {timestamps:true}
);

export default mongoose.model("vehicle", vehicleSchema)