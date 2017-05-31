var mongoose = require('mongoose');

var substitutionCipherSchema = mongoose.Schema({
    replacee: String;
    replacer: String;
})

var substitutionCipher = mongoose.model("substitutionciphers", substitutionCipherSchema);

module.exports = substitutionCipher;
