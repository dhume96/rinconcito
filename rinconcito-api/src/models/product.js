import { model, Schema } from 'mongoose';

const productSchema = new Schema({
    name: String,
    store: String,
    dateAdded: Date,
    quantity: Number,
    unitPrice: Number,
    pic: String,
});

export default model("Product", productSchema);