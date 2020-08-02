var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var crypto = require('crypto');
var express = require('express');
var bodyParser = require('body-parser');

var buffer = require('buffer');
var path = require('path');
var fs = require('fs');
var http = require('http');

const cors = require('cors');
const { response } = require('express');
const { decode } = require('punycode');
// const { db } = require('../../../../Bitnami/wampstack-7.4.8-0/apache2/htdocs/week4/models/users');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('web_practice'));
app.use(express.static('bootstrap'));
app.use(express.static('moviegridview/'));
app.use(express.static('bootstrap2'));
app.use(express.static('/findall'));
app.use(express.static('/loadingitems'));
app.use(cors());
//Create MongoDB Client
var MongoClient = mongodb.MongoClient;

//Connection URL
//var url = 'mongodb+srv://admin:madcamp@week2.ivjze.mongodb.net/week2nodejs?retryWrites=true&w=majority' // 27017 is default port
// var url = 'mongodb://localhost:27017'
var url = 'mongodb+srv://vegan:1111@cluster0.hso7u.mongodb.net/Vegan?retryWrites=true&w=majority'



MongoClient.connect(url,{useUnifiedTopology: true},function(err,client){
  if (err)
    console.log('Unable to connect to the mongoDB server.Error', err);
  else{

    app.get('/loadingitems', function(req, res){
      var db = client.db('Vegan') 
      var area = req.query.area;
      console.log(area);
      db.collection('restaurant').find({'area':area}).toArray(function(err, users){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(users)
        
      })
    });

    app.get('/users', function(req, res){
        var db = client.db('Vegan') 
        
        db.collection('users').find().toArray(function(err, users){
          if(err) return res.status(500).send({error: 'database failure'});
          res.send(users)
          
        })
      });
    app.get('/users/id/:id', function(req, res){
        var db = client.db('Vegan') 
        db.collection('users').find({id: req.params.id}, {id:1, password:1, email:1}, function(err, user){
          if(err) return res.status(500).json({error: err});
          if(!user.length === 0) return res.status(404).json({error: 'user not found'});
          res.send(user);
        })
      })
    app.post('/users',(req,res)=>{
        console.log('check1')

        var db = client.db('Vegan') 
          
        db.collection('users').find({id: req.body.id} , function(err, user){
          console.log('check2')
          if(user.length){
             res.send({result: "failure"})
             return;
          }
          var name = req.body.name
          var id = req.body.id
          var password = req.body.password
          var email = req.body.email
          var newuser = {
              name : name,
              id : id,
              password : password,
              email : email
            }
          
          db.collection('users').save(newuser)
          res.json({result: "success"})
        })       
      });
    app.post('/users/login',function(req,res){
        var db = client.db('Vegan') 
        db.collection('users').find({id: req.body.id, password: req.body.password}, function(err, user){
          if(user.length === 0) return res.send(null)
          else{
            res.send(true)
          }
        })
      })
    app.delete('/users/:_id', function(req, res){
        var db = client.db('Vegan') 
        db.collection('users').remove({_id: req.params._id }, function(err, output){
          if(err) return res.status(500).json({ error: "database failure"});
          res.status(204).end();
        })
      })


    

    app.listen(8080,()=> {
      console.log('Connected to MongoDB Server, WebService running on port 8080');
    })
  }
}
)
