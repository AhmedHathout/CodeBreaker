var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    savedCiphers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ciphers'
    }],

    decryptedCiphers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ciphers'
    }],

    user-encryptedCiphers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ciphers'
    }]

})

var User = mongoose.model("users", userSchema);

module.exports = User;
