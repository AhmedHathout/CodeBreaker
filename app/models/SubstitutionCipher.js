var mongoose = require('mongoose');

var substitutionCipherSchema = mongoose.Schema({

    cipherID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ciphers',
        required: true
    },

    replacee: String,

    replacer: String
    
});

var substitutionCipher = mongoose.model("substitutionciphers", substitutionCipherSchema);

module.exports = substitutionCipher;
