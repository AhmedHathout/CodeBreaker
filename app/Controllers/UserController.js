var LocalStrategy   = require('passport-local').Strategy;
let User = require('../models/User');
let Cipher = require('../models/Cipher');
let SubstitutionCipher = require('../models/SubstitutionCipher');
var bCrypt = require('bcrypt-nodejs');
let mongoose = require('mongoose');


let userController = {

    saveCipher: function (req, res) {
        console.log('hey');
        console.log(req.body);
        console.log('---------------------------');

        let username = req.body.username;
        let isDecrypted = req.body.isDecrypted;
        let encryptedTextOnly = req.body.encryptedTextOnly;
        let cipher = req.body.cipher;
        let plainText = req.body.plainText;
        let cipherType = req.body.cipherType;
        let replacee = req.body.replacee;
        let replacer = req.body.replacer;

        User.findOne({'profile.username': username}, function(err, user) {


            if (err)
                res.send("An error occured while searching for the user");
            else {
                console.log(user);
                var userCiphers = user.savedCiphers.concat(user.decryptedCiphers);
                console.log(userCiphers);

                Cipher.find({_id: {$in: userCiphers}}, function(err, ciphers) {
                    if (err) {
                        res.status(500); //Internal Server Error
                        res.message = "An error occured while searching for the cipher";
                        console.log(res.message);
                        return res;
                    }

                    else {
                        console.log(ciphers);

                        for (var i = 0; i < ciphers.length; i++) {

                            let currentCipher = ciphers[i];

                            if (currentCipher.encryptedText == cipher && currentCipher.cipherType == cipherType) {
                                res.status(406); //Not Acceptable
                                res.message = "This Cipher was saved before";
                                console.log(res.message);
                                return res;
                            }

                        }

                        let newCipher = new Cipher();
                        newCipher.encryptedText = cipher;
                        newCipher.cipherType = cipherType;

                        if (!encryptedTextOnly)
                            newCipher.decryptedText = plainText;

                        console.log(newCipher);

                        newCipher.save(function(err, savedCipher) {
                            if (err){
                                res.status(500); //Internal Server Error
                                res.message = "An error occured while trying to save the cipher";
                                console.log(res.message);
                                return res;
                            }

                            let newSubstitutionCipher = new SubstitutionCipher();
                            newSubstitutionCipher.cipherID = savedCipher._id;

                            if (isDecrypted)
                                encryptedTextOnly = false;

                            if (!encryptedTextOnly) {
                                newSubstitutionCipher.replacee = replacee;
                                newSubstitutionCipher.replacer = replacer;
                            }

                            newSubstitutionCipher.save(function(err, savedSubstitutionCipher) {

                                if (err){
                                    res.status(500); //Internal Server Error
                                    res.message = "An error occured while trying to save the substitution cipher";
                                    console.log(res.message);
                                    return res;
                                }

                                if (isDecrypted)
                                    user.decryptedCiphers.push(savedCipher._id);
                                else {
                                    user.savedCiphers.push(savedCipher._id);
                                }

                                user.save(function(err) {

                                    if (err) {
                                        res.status(500); //Internal Server Error
                                        res.message = "An error occured while trying to save the user";
                                        console.log(res.message);
                                        return res;
                                    }

                                });

                                res.status(200).send("Saved succesfully"); //ok

                            })

                        });

                    }

                })

            }

        })


    },

    getSavedCiphers: function (req, res) {

        let username = req.body.username;

        User.findOne({'profile.username': username}, function(err, user) {

            if (err) {
                res.status(500); //Internal Server Error
                res.message = "An error occured while searching for the user";
                console.log(res.message);
                return res;
            }

            let userCiphers = user.savedCiphers;

            Cipher.find({_id: {$in: userCiphers}}, function(err, ciphers) {

                if (err) {
                    res.status(500); //Internal Server Error
                    res.message = "An error occured while searching for the ciphers";
                    console.log(res.message);
                    return res;
                }

                var ciphersResult = {
                    ciphers: [],
                    substitutionCiphers: []
                };
                var cipherIDs = {
                    substitutionCiphers: []
                }

                for (var i = 0; i < ciphers.length; i++) {

                    let currentCipher = ciphers[i];

                    if (currentCipher.cipherType == "substitution") {
                        cipherIDs.substitutionCiphers.push(currentCipher._id);
                        ciphersResult.ciphers.push(currentCipher);
                    }

                }

                SubstitutionCipher.find({'cipherID': {$in: cipherIDs.substitutionCiphers}}, function (err, substitutionCiphers) {

                    if (err) {
                        res.status(500); //Internal Server Error
                        res.message = "An error occured while searching for a substitution cipher";
                        console.log(res.message);
                        return res;
                    }

                    ciphersResult.substitutionCiphers.push(substitutionCiphers);
                    res.result = ciphersResult;
                    console.log(res.result);
                    res.status(200).send(ciphersResult); //ok

                })

            })

        })

    }
    // (user.profile.username, isDecrypted, encryptedTextOnly, cipher, replacee, replacer)

}

module.exports = userController;
