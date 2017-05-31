var mongoose = require('mongoose');

var cipherSchema = mongoose.Schema({

    type: {
        type: String;
        required: true;
    }

    encryptedText: {
        type: String;
        required: true;
    },

    decryptedText: {
        type: String;
    },

    isDecrypted {
        type: Boolean;
        default: false;
        required: true;
    }

})

var Cipher = mongoose.model("ciphers", cipherSchema);

module.exports = Cipher;
