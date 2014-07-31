var repl = require('repl');
var db = require('./models/index.js');
var pkge = require("./package");
var newREPL = repl.start(pkge.name + " > ");

// newREPL.context.db = db;

// create a new user in DB
db.user.findAll().success(function(user){
	console.log(user);
});

// db.post.create({title: "blah", body: "stuff"});

db.user.find({id:1}), success(function(user){
	console.log(user);
});

// .findAll
// .find
// .create // save right after
// .build && .save
// .findOrCreate

// .addPost