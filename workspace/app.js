/**
 * Created by hieun on 5/26/2017.
 */
// Read Synchrously
var express = require('express');
var fs = require("fs");
var app = express();


var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Parser = require('body-parser');

// Retrieve
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

server.listen(6969);

// Connect to the db
MongoClient.connect("mongodb://128.199.247.152:27017/splunk", function(err, db) {
    if(!err) {
        console.log("We are connected");
    }
    var note = db.collection('Logon.posts');
    var newService = db.collection('New_Service.posts');
    var Process = db.collection('Process.posts');
    var filewall = db.collection('filewall_change.posts');
    var rule = db.collection('rule_filewall_change.posts');

    note.aggregate([
        {$match: {}}
        , {$group:
            {_id:{User:"$User",IP:"$IP",Workstation:"$Workstation",Domain:"$Domain",time:"$time",TypeLogon:"$TypeLogon"}}
        }
    ]).toArray(function(err, results){
        // output all records
        //console.log(results);
        //console.log(results[1]._id.User);
        var data=[];
        for (i=0 ; i<results.length ; i++){
            data[i] = [results[i]._id.User,results[i]._id.IP,results[i]._id.Workstation,results[i]._id.Domain,results[i]._id.time];
        }
        //console.log(data);
        io.on('connection', function (socket) {
            socket.emit('news', data);
        });
    });

    //count user/workstation
    note.aggregate([
        {$match: {}}
        , {$group:
            {_id:{User:"$User",Workstation:"$Workstation"}, count:{$sum:1}}
        }
    ]).toArray(function(err, results){
        // output all records
        //console.log(results);
        //console.log(results);
        var data = {};
        for (i=0 ; i<results.length ; i++){
            data[results[i]._id.User + '/' + results[i]._id.Workstation] = results[i].count;
        }
        //console.log(data);
        io.on('connection', function (socket) {
            socket.emit('news1', data);
        });
    });

    //count ip
    note.aggregate([
        {$match: {}}
        , {$group:
            {_id:{IP:"$IP"}, count:{$sum:1}}
        }
    ]).toArray(function(err, results){
        var data = {};
        for (i=0 ; i<results.length ; i++){
            data[results[i]._id.IP] = results[i].count;
        }
        //console.log(data);
        io.on('connection', function (socket) {
            socket.emit('news2', data);
        });
    });

    //count workstation
    note.aggregate([
        {$match: {}}
        , {$group:
            {_id:{Workstation:"$Workstation"}, count:{$sum:1}}
        }
    ]).toArray(function(err, results){
        var data = {};
        for (i=0 ; i<results.length ; i++){
            data[results[i]._id.Workstation] = results[i].count;
        }
        //console.log(data);
        io.on('connection', function (socket) {
            socket.emit('news3', data);
        });
    });


});

app.get('/', function (req, res) {
    res.sendfile(__dirname +'/demp/views/index.html');
});

app.use(express.static(__dirname + '/demp'));





