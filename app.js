// app.js

var express = require('express'),
  db = require('./models/index.js'),
  bodyParser = require('body-parser'),
  methodOvrride = require('method-override'),
  passport = require("passport"),
  passportLocal = require("passport-local"),
  cookieParser = require("cookie-parser"),
  cookieSession = require("cookie-session"),
  flash = require("connect-flash"),
  app = express();
  db = require("./models/index");


app.set('view engine', 'ejs');

app.use(methodOvrride());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

app.use(cookieSession({
  secret: 'thisismysecretkey',
  name: 'cookie created by Sana',
  //maxage is in milliseconds
  maxage: 360000
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// prepare our serialize function
passport.serializeUser(function(user, done){
  console.log("SERIALIZE JUST RAN");
  done(null, user.id); // when the function is done snatch the userid and save it
});

passport.deserializeUser(function(id, done){
  console.log("DESERIALIZE JUST RAN");
  db.user.find({
    where: {
      id: id
    }
  }).done(function(error, user){
    done(error, user);

  });
});

//Directs to the index page or the homepage
app.get('/', function(req, res){
  // check if the user is logged in
  if (req.user) {
    res.render('index');
  }
  else {
    res.render('home');
  }
});

//Directs to the signup page
app.get('/signup', function(req, res){
  if (!req.user) {
  res.render('signup', {message: null, username: ""}); // message object is defined here
}
else {
  res.render('home');
}
});

// loging in
app.use(function(req, res, next){
  console.log(req.method, req.url);
  next();
});

app.get('/posts/new', function(req, res){
  res.render('posts/new');
});

app.post('/posts', function(req, res){
  console.log("Inside /post posts");
  db.user.findOrCreate({username:req.body.username, password: req.body.pass})
  .error(function(err){

    res.send(req.body);
  })
  .success(function(user) {
  // console.log(req.body);
  // res.send("ok");
  var newPost = db.post.build({title: req.body.title, body: req.body.body});
  user.addPost(newPost).success(function(post){
      res.send(post);

  });
});
});

app.get('/users', function (req,res) {
//
});

app.get('/users/:id', function (req,res) {
  //
});

app.get('/posts/:id', function (req,res) {
  var id = req.params.id;
  //

});

app.get('/users/:id/posts/new', function(req, res){
  var id = req.params.id;
  //
});

app.post('/users/:id/posts', function(req, res){
  var id = req.params.id;
  //
});




app.listen(3000, function(){
  console.log("Get this party started on port 3000");
});