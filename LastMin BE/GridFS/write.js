var mongoose = require('mongoose');
var Schema=mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1/gridFS')

var conn=mongoose.connection;
var path=require('path');

var Grid = require('gridfs-stream');

var fs=require('fs')

var videoPath=path.join(__dirname,'../Data/oop.pdf')

Grid.mongo = mongoose.mongo;
conn.once('open', function () {
	
	console.log("connection open");

  var gfs = Grid(conn.db);

  var fs_w=fs.createWriteStream(videoPath);

  var readstream = gfs.createReadStream({
  	filename:'oop.pdf'

  });
  readstream.pipe(fs_w);

  	fs_w.on('close',function(){
  		console.log("file saved")
  	});
})
