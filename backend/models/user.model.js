const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const User = new Schema({
     firstName: {
        type: String
    },
    lastName: {
        type: String
    },
     email: {
        type: String,
        unique: true,
    },
     password: {
        type: String,
    }
});

User.plugin(mongoosePaginate);

User.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
   }

module.exports = mongoose.model("User", User);