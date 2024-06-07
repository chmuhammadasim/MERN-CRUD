const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Item = new Schema({
     productName: {
        type: String
    },
    productBrand: {
        type: String
    },
    price: {
        type: Number,
    },
     quantity: {
        type: Number,
    },
    userId: mongoose.Schema.Types.ObjectId,
});

Item.plugin(mongoosePaginate);

Item.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
   }

module.exports = mongoose.model("Item", Item);