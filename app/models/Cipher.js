var mongoose = require('mongoose');

var cipherSchema = mongoose.Schema({

    cipherType: {
        type: String,
        required: true
    },

    encryptedText: {
        type: String,
        required: true
    },

    decryptedText: String,

    isDecrypted: {
        type: Boolean,
        default: false,
        required: true
    }

})

var Cipher = mongoose.model("ciphers", cipherSchema);

module.exports = Cipher;
