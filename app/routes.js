var express = require('express');
var http = require('http');
var router = express.Router();
var mongoose = require("mongoose");

router.get('/',function(req,res){
    res.sendFile('home.html',{root:"./views"});
})

module.exports = router;
