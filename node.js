var request = require('request');
var smoke = require('./lib')
const express = require('express')
const app = express()
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbo;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  dbo = db.db("mydb2");
  dbo.collection("users").find().toArray(function(err, result) {
for (var r in result){
getFollowing(result[r].username, 0)
}
});
  dbo.createCollection("users", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
  });
  dbo.createCollection("followers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
  });
});

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set('view engine', 'ejs');
app.get('/', function(req, res) {
  console.log('lala');
    res.render('pages/index');
});
setInterval(function(){
  upSmoke();
}, 60 * 1000);
upSmoke();
let followType = 'blog';
let limit = 100;
var followers = {}
function getFollowing(follower, startFollowing){
console.log(startFollowing);
smoke.api.getFollowing(follower, startFollowing, followType, limit, function(err, result) {
var last;
if (followers[follower] == undefined){
  followers[follower] = []
}

  for (var r in result){
    followers[follower  ].push(result[r].following);
  last = result[r].following;

  }
  console.log(result.length)
  if (result.length == 100){
  getFollowing(last);
  }
  else {
       var myobj = { followers:followers};
  dbo.collection("followers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });

  }
});
}
function setTimeoutDo(count, wif, username,author, permlink, weight){

               setTimeout(function(){
      console.log(permlink)

                      upSmokeDo(wif, username,author, permlink, weight)
        }, 3500 * count);
}
var doSmoke = {}
function upSmokeDo(wif, username,author, permlink, weight){
  console.log(permlink)

            smoke.broadcast.vote(wif, username,author, permlink, weight, function(err, result) {
            console.log(err, result);
        });
}
var doSmokes = {}
function upSmoke(){
  var query = {
  limit: 100
};
  
smoke.api.getDiscussionsByCreated(query, function (err, discussions) {
  dbo.collection("users").find().toArray(function(err, result) {

      dbo.collection("followers").find().toArray(function(err, followers) {
    if (err) throw err;
    console.log(result);
  for (var r in result){
  console.log(result[r])
    if (doSmoke[result[r].username] == undefined){
      doSmoke[result[r].username] = []
    }
  if (!err) {
    var count = 0;
    for (var d in discussions){
      doSmoke[result[r].username][discussions[d].permlink] = true;
    for (var e in followers){
      for (var f in followers[e]){
      for (var following in followers[e][f]){
      for (var follower in followers[e][f][following]){
        if (followers[e][f][following][follower] == discussions[d].author){
          if (  doSmoke[result[r].username][discussions[d].permlink] == true){
              doSmoke[result[r].username][discussions[d].permlink] = false
              count++;  
              console.log(discussions[d].permlink)
              //console.log(discussions[d].url)
  setTimeoutDo(count, result[r].wif, result[r].username, discussions[d].author, discussions[d].permlink, result[r].weight);
          }
        }
      }
    }
}
  }
}
  }
  }

  
  


})
  
});
  })
}
app.post('/', function(req, res) {
  var username = req.body.username;
  var weight = req.body.weight;
  var wif = req.body.wif;
         var query = { username: username };
  dbo.collection("users").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
   var myobj = { username: username, wif: wif, weight:parseFloat(weight)};
  dbo.collection("users").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });

  
  });
    res.render('pages/index');
});
var port = 3030;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


var fees = 0.95;