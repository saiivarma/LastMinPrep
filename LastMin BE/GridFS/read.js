var mongoose = require('mongoose');
var Schema=mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1/gridFS')

var conn=mongoose.connection;
var path=require('path');

var Grid = require('gridfs-stream');
var fs=require('fs')

var videoPath=path.join(__dirname,'../oops.pdf')
Grid.mongo = mongoose.mongo;
conn.once('open', function () {
	
	console.log("connection open");

  var gfs = Grid(conn.db);

  var writestream = gfs.createWriteStream({
  	filename:'oop.pdf'

  });
fs.createReadStream(videoPath).pipe(writestream);

})

