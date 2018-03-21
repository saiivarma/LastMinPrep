var express=require('express');
var path=require('path');
var app=express();
var bodyParser=require('body-parser');
var mongojs=require('mongojs');
var db=mongojs('prep',['faq']);

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

var usr={
	qurb : null
}
var usrA={
	ans : null ,
	key : null
}

// Routing the faq 
app.get('/',function(req,res){

	
		// retrieve data from the faq
		//db.faq.find(function(err,docs){
		db.faq.find(({ branch : usr.qurb}),function(err,docs){
				
				res.render("faq.ejs",{users: docs });
			});
	});
		
		

app.get('/:type',function(req,res){
	var thing=req.params.type;
	res.send(thing);
});
// Starting the server on port:3000
app.listen(3000,function(){
		console.log("server started");
});

// Post requests
app.post('/varma',function(req,res){
	var NewUser={
		 question : req.body.ques,
		 branch: req.body.branch,
		 key: req.body.key
	}
	db.faq.insert(NewUser,function(err,result){
			if(err){
				console.log(err);
			}
	});
	res.redirect('/');
	

});

app.post('/qur',function(req,res){
	usr.qurb=req.body.branchq;
	res.redirect('/')
});
app.post('/ansInp',function(req,res){
	usrA.ans=req.body.ans;
	usrA.key=req.body.key;
	db.faq.update({key: usrA.key},({$set:{answer:usrA.ans}}),function(err,result){
		if (err) {
			console.log(err);
		}
	});
	res.redirect('/');
});
