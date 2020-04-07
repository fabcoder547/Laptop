const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProduCtcartSchema = new Schema({

    product: {
        type: Schema.Types.ObjectId,
        ref: 'myproduct',
    },
    name: String,
    count: Number,
    price: Number,

})

const productCart = mongoose.model('mycart', ProduCtcartSchema);

const orderSchema = new Schema({

    orders: [ProduCtcartSchema],
    transaction_id: {},
    amount: {
        type: Number
    },
    adress: {
        type: String,
    },
    updated: {
        type: Date,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "myuser",
    }



}, {
    timestamps: true
})

const Order = mongoose.model("myorder", orderSchema);

module.exports = {
    Order,
    productCart
}