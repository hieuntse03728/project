/**
 * Created by hieun on 5/26/2017.
 */
var express = require('express');
var fs = require("fs");
var app = express();
var tools = require('./demp/Public/assets/js/myFunction.js');


var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Parser = require('body-parser');


// Retrieve
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

server.listen(3000);

// Connect to the db
MongoClient.connect("mongodb://128.199.247.152:27017/splunk", function(err, db) {
    if(!err) {
        console.log("We are connected");
    }
    var logOn = db.collection('Logon.posts');
    var newService = db.collection('New_Service.posts');
    var Process = db.collection('Process.posts');
    var filewall = db.collection('filewall_change.posts');
    var rule = db.collection('rule_filewall_change.posts');
    var alarm = db.collection('Alarm_BruteForce.posts');
    var linux = db.collection('Linux_users.posts');

    //count user/workstation
    logOn.aggregate([
            {$match: {}}
            , {$group:
                {_id:{User:"$User",Workstation:"$Workstation"}, count:{$sum:1}}
            }
    ]).toArray(function(err, results){
        var data = {};
        for (i=0 ; i<results.length ; i++){
            data[results[i]._id.User + '/' + results[i]._id.Workstation] = results[i].count;
        }
        io.on('connection', function (socket) {
            socket.emit('news1', data);
        });
    });

    //count ip
    logOn.aggregate([
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
    logOn.aggregate([
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


    //tableLogon
    logOn.aggregate([
        {$match: {}}
        , {$group:
            {_id:{time:"$time",User:"$User",IP:"$IP",Workstation:"$Workstation",Domain:"$Domain"}}
        }
    ]).toArray(function(err, results){
        var data=[];
        for (i=0 ; i<results.length ; i++){
            data[i] = [results[i]._id.time,results[i]._id.User,results[i]._id.IP,results[i]._id.Workstation,results[i]._id.Domain,results[i]._id.time];
        }
        io.on('connection', function (socket) {
            socket.emit('news', data);
        });
    });

    //tableNew_Service
    newService.aggregate([
        {$match: {}}
        , {$group:
            {_id:{Service_Name:"$Service_Name",Service_Start_Type:"$Service_Start_Type",_time: "$_time",host:"$host",Service_Account:"$Service_Account",Service_Type:"$Service_Type",Short_Message:"$Short_Message"}}
        }
    ]).toArray(function(err, results){

        var data=[];
        for (i=0 ; i<results.length ; i++){
            data[i] = [tools.convert( results[i]._id._time),results[i]._id.Service_Name,results[i]._id.Service_Start_Type,results[i]._id.host,results[i]._id.Service_Account,results[i]._id.Service_Type,results[i]._id.Short_Message];
        }
        io.on('connection', function (socket) {
            socket.emit('_newService', data);
        });
    });

    //tableProcess
    Process.aggregate([
        {$match: {}}
        , {$group:
            {_id:{_time:"$_time",host:"$host",New_Process_ID:"$New_Process_ID",New_Process_Name:"$New_Process_Name",Creator_Process_ID:"$Creator_Process_ID",Account_Name:"$Account_Name",Short_Message:"$Short_Message"}}
        }
    ]).toArray(function(err, results){
        var data=[];
        for (i=0 ; i<results.length ; i++){
            data[i] = [tools.convert( results[i]._id._time),results[i]._id.host,results[i]._id.New_Process_ID,results[i]._id.New_Process_Name,results[i]._id.Creator_Process_ID,results[i]._id.Account_Name,results[i]._id.Short_Message];
        }
        //console.log(data);
        io.on('connection', function (socket) {
            socket.emit('_Process', data);
        });
    });

    //tableFilewall
    filewall.aggregate([
        {$match: {}}
        , {$group:
            {_id:{_time:"$_time",ModifyingApplication:"$Modifying Application",Value:"$Value",host:"$host",msg:"$msg",Type:"$Type",ModifyingUser:"$Modifying User"}}
        }
    ]).toArray(function(err, results){
        var data=[];
        for (i=0 ; i<results.length ; i++){
            data[i] = [tools.convert(results[i]._id._time),results[i]._id.ModifyingApplication,results[i]._id.Value,results[i]._id.host,results[i]._id.msg,results[i]._id.Type,results[i]._id.ModifyingUser];
        }
        //console.log(data);
        io.on('connection', function (socket) {
            socket.emit('_Filewall', data);
        });
    });

    //tableRule
    rule.aggregate([
        {$match: {}}
        , {$group:
            {_id:{_time:"$_time",Protocol:"$Protocol",Reason:"$Reason",host:"$host",Process_Id:"$Process_Id",IP_Version:"$IP_Version",Application_Path:"$Application_Path",Port:"$Port"}
        }}
    ]).toArray(function(err, results){
        var data=[];
        for (i=0 ; i<results.length ; i++){
            data[i] = [tools.convert(results[i]._id._time),results[i]._id.Protocol,results[i]._id.Reason,results[i]._id.host,results[i]._id.Process_Id,results[i]._id.IP_Version,results[i]._id.Application_Path,results[i]._id.Port];
        }
        //console.log(data);
        io.on('connection', function (socket) {
            socket.emit('_rule', data);
        });
    });

    //alarm
    alarm.aggregate([
        {$match: {}}
        , {$group:
            {_id:{Source_Network_Address:"$Source_Network_Address",Se:"$Se"}
            }}
    ]).toArray(function(err, results){
        var quantityAlarm = results.length;
        var data=[];
        for (i=0 ; i<results.length ; i++){
            data[i] = [results[i]._id.Source_Network_Address,results[i]._id.Se];
        }
        //console.log(data);
        io.on('connection', function (socket) {
            socket.emit('alarm', quantityAlarm);
            socket.emit('nofi', data);
        });
    });

    //linux log
    linux.aggregate([
        {$match: {}}
        , {$group:
            {_id:{time:"$time",shell:"$shell",description:"$description",action:"$action",User:"$User",directory:"$directory"}
            }}
    ]).toArray(function(err, results){
        var data=[];
        for (i=0 ; i<results.length ; i++){
            data[i] = [results[i]._id.time,results[i]._id.shell,results[i]._id.description,results[i]._id.action,results[i]._id.User,results[i]._id.directory];
        }
        //console.log(data);
        io.on('connection', function (socket) {
            socket.emit('linux', data);
        });
    });


});



app.get('/', function (req, res) {
    res.sendfile(express.static(__dirname + '/demp/views/index.html'));
});


app.use(express.static( __dirname + '/demp'));





