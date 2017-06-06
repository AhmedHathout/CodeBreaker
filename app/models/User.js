var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    id: String,

    profile: {

        username: {
            type: String,
            unique: true,
            required: true
        },


        password: {
            type: String,
            required: true
        },

        firstName: {
            type: String,
            required: true
        },

        lastName: {
            type: String,
            required: true
        },

        email: {
            type: String,
            unique: true,
            required: true
        },


        address: {
            street: String,
            city: String,
            governorate: String,
            country: String
        },

        mobileNumber: {
            type: String,
            unique: true
        },

        gender: String

    },

    savedCiphers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ciphers'
    }],

    decryptedCiphers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ciphers'
    }],

    encryptedCiphers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ciphers'
    }]

})

var User = mongoose.model("users", userSchema);

module.exports = User;
