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

// const { db, remove } = require('../../../../Bitnami/wampstack-7.4.8-0/apache2/htdocs/week4/models/users');
const multer = require('multer');
const router = express.Router();
var tls = require('tls');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('web_practice'));
app.use(express.static('bootstrap'));
app.use(express.static('moviegridview/'));
app.use(express.static('bootstrap2'));
app.use(express.static('/findall'));
app.use(express.static('/loadingitems'));
app.use(
  cors({
    origin: ["http://localhost:8080","http://localhost:3000"],
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    // maxAge: 5,
    // credentials: true,
    allowMethods: ["GET", "POST", "DELETE"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "application/json",
      "X-Requested-With",
      "Origin",
    ],
  })
);

//Create MongoDB Client
var MongoClient = mongodb.MongoClient;


app.use(express.static('nodemailerTest'));
var MongoClient = mongodb.MongoClient;
//Connection URL
//var url = 'mongodb+srv://admin:madcamp@week2.ivjze.mongodb.net/week2nodejs?retryWrites=true&w=majority' // 27017 is default port
// var url = 'mongodb://localhost:27017'
var url = 'mongodb+srv://vegan:1111@cluster0.hso7u.mongodb.net/Vegan?retryWrites=true&w=majority'

const nodemailer = require('nodemailer');
const { timeStamp } = require('console');
fs.readdir('uploads', (error) => {
  // uploads 폴더 없으면 생성
  if (error) {
      fs.mkdirSync('uploads');
  }
})

const upload = multer({
  storage: multer.diskStorage({
      destination(req, file, cb) {
          cb(null, '../React-Landing-Page-Template/public/img/');
      },
      filename(req, file, cb) {
          const ext = path.extname(file.originalname);
          cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
      },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
})

//Create MongoDB Client
var MongoClient = mongodb.MongoClient;


MongoClient.connect(url,{useUnifiedTopology: true},function(err,client){
  if (err)
    console.log('Unable to connect to the mongoDB server.Error', err);
  else{

    app.get('/oneitem', function(req, res){
      var db = client.db('Vegan') 
      
      var area = req.query.area;
      var name = req.query.name;
      console.log(name);
      console.log(area);

      db.collection('restaurant').find({"name": name, "area": area}).toArray(function(err, users){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(users)
      })
    });
    app.post('/restaurant/like', function(req, res){
      var db = client.db('Vegan') 
      
      db.collection('restaurant').update({contact: req.body.contact},{$set: {like: req.body.like}})
      
      res.json({result: "success"})
    })
    app.post('/restaurant/seelater', function(req, res){
      var db = client.db('Vegan') 
      
      db.collection('restaurant').update({contact: req.body.contact},{$set: {seelater: req.body.seelater}})
      
      res.json({result: "success"})
    })


    app.get('/loadingitems', function(req, res){
      var db = client.db('Vegan');
      var area = req.query.area;
      console.log(area);
      if (area == '') {
        db.collection('restaurant').find().toArray(function(err, users){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(users)
        
      })
      }
      else {
        db.collection('restaurant').find({'area':area}).toArray(function(err, users){
          if(err) return res.status(500).send({error: 'database failure'});
            res.json(users)
          
        })
      }
      
    });

    app.get('/addcomment', function(req, res){
      var db = client.db('Vegan');
      var name = req.query.name;
      var area = req.query.area;
      var text = req.query.text;
      var user = req.query.user;
      console.log(user);
      
      db.collection('restaurant').find({'name':name, 'area': area}).toArray(function(err, users){
        var currentDate = new Date();
        var date = currentDate.getDate();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        var hour = currentDate.getHours();
        var min = currentDate.getMinutes();
        var dateString = year + "년 " + (month + 1) + "월 " + date + "일 " + hour + "시 " + min + "분";
      

        db.collection('restaurant').updateMany({'name':name, 'area': area},{$set: {'comment': users[0].comment.concat([[user,dateString,text]])}});
        
        db.collection('restaurant').find({'name':name, 'area': area}).toArray(function(err, users){
          res.json(users);
        });

      })
      
    });


    app.post("/nodemailerTest", function(req, res){
      let email = req.body.email;
      let name = req.body.name;
      let message = req.body.message;
    
  
      //내가 사용자한테 보내는게 됨...
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dudwn1814@gmail.com',  // gmail 계정 아이디를 입력
          pass: 'QWvpfm86!!er'          // gmail 계정의 비밀번호를 입력
        },
        tls: {rejectUnauthorized: false}
      });
    
      let mailOptions = {
        from: email,    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: 'dudwn1814@gmail.com',                     // 수신 메일 주소
        subject: name,   // 제목
        text: message  // 내용
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        console.log('들어왔어');
        if (error) {
          console.log(error);
        }
        else {
          console.log('Email sent: ' + info.response);
        }
      });
      
      //res.redirect("/");
    })
  
 

    app.get('/users', function(req, res){
        var db = client.db('Vegan') 
        
        db.collection('users').find().toArray(function(err, users){
          if(err) return res.status(500).send({error: 'database failure'});
          res.send(users)
          
        })
      });
    app.get('/users/name/:name', function(req, res){
        var db = client.db('Vegan') 
        db.collection('users').find({name: req.params.name}).toArray(function(err, user){
          if(err) return res.status(500).json({error: err});
          if(!user.length === 0) return res.status(404).json({error: 'user not found'});
          res.send(user);
        })
      })

      app.post('/users/name/uploader/', function(req, res){
        var db = client.db('Vegan') 
        // db.collection('users').find({name: req.body.name}).toArray(function(err, user){
          
        //   var name = user[0].name
        //   var id = user[0].id
        //   var password = user[0].password
        //   var email = user[0].email
        //   const modified = {
        //       name: name,
        //       id: id,
        //       password: password,
        //       email: email,
        //       like : user[0].like,  
        //       seelater: user[0].seelater,
        //       upload: user[0].upload.concat([req.body.upload])
        //     }
        //   console.log(req.body.name)
        //   console.log(user[0])
        //   console.log(user)
        //   console.log(modified)
        //   db.collection('users').remove({name: req.body.name})
        //   db.collection('users').save(modified)
        // })
        db.collection('users').find({name: req.body.name}).toArray(function(err, user){
          db.collection('users').update({name: req.body.name}, {$set : {upload: user[0].upload.concat(req.body.upload)}})
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
          db.collection('users').find({name: req.body.name}, function(err, name){
            if(name. length){
              res.send({result: "failure"})
              return;
            }
          })
          var name = req.body.name
          var id = req.body.id
          var password = req.body.password
          var email = req.body.email
          var like = req.body.like
          var seelater = req.body.seelater
          var upload = req.body.upload
          var newuser = {
              name : name,
              id : id,
              password : password,
              email : email,
              like : like,
              seelater : seelater,
              upload : upload
            }
          
          db.collection('users').save(newuser)
          res.json({result: "success"})
        })       
      });
    app.post('/users/like', function(req,res){
        var db = client.db('Vegan')
        // db.collection('users').find({name: req.body.name}).toArray(function(err, user){
            
        //   let modified = {
        //       name: user[0].name,
        //       id: user[0].id,
        //       password: user[0].password,
        //       email: user[0].email,
              
        //       like : user[0].like.concat([req.body.like]),
        //       seelater: user[0].seelater,
        //       upload: user[0].upload
              
        //     }
        //   db.collection('users').remove({name: req.body.name})
        //   db.collection('users').save(modified)
        // })
        db.collection('users').find({name: req.body.name}).toArray(function(err, user){
          db.collection('users').update({name: req.body.name}, {$set : {like: user[0].like.concat(req.body.like)}})
        })
      })
    app.post('/users/later', function(req,res){
      var db = client.db('Vegan')
      db.collection('users').find({name: req.body.name}).toArray(function(err, user){
          
        // let modified = {
        //     name: user[0].name,
        //     id: user[0].id,
        //     password: user[0].password,
        //     email: user[0].email,
            
        //         like : user[0].like,
        //         seelater: user[0].seelater.concat([req.body.later]),
        //         upload: user[0].upload
            
        //   }
        // db.collection('users').remove({name: req.body.name})
        // db.collection('users').save(modified)
        db.collection('users').find({name: req.body.name}).toArray(function(err, user){
          db.collection('users').update({name: req.body.name}, {$set : {seelater: user[0].seelater.concat(req.body.later)}})
        })
      })
    })
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
  
    app.post('/upload', upload.single('file'), (req, res) => {
        //console.log(req.file);
        res.send(req.file.filename);
    })
    
    app.post('/foodrecipe', function(req, res){
      var db = client.db('Vegan')
      var recipe = {
        food: req.body.food,
        ingredients: req.body.ingredients,
        img : req.body.img,
        content: req.body.content,
        like: req.body.like,
        seelater: req.body.seelater,
        writer: req.body.writer
      }
      db.collection('Recipes').save(recipe)
      res.json({result: "success"})
    })
    app.post('/foodrecipe/like', function(req, res){
      var db = client.db('Vegan')
      // var recipe = {
      //   food: req.body.food,
      //   ingredients: req.body.ingredients,
      //   img : req.body.img,
      //   content: req.body.content,
      //   like: req.body.like,
      //   seelater: req.body.seelater
      // }
      // db.collection('Recipes').remove({img : req.body.img})
      // db.collection('Recipes').save(recipe)
      db.collection('Recipes').update({img : req.body.img},{$set: {like: req.body.like}})
      
      res.json({result: "success"})
    })
    app.post('/foodrecipe/seelater', function(req, res){
      var db = client.db('Vegan')
      // var recipe = {
      //   food: req.body.food,
      //   ingredients: req.body.ingredients,
      //   img : req.body.img,
      //   content: req.body.content,
      //   like: req.body.like,
      //   seelater: req.body.seelater
      // }
      // db.collection('Recipes').remove({img : req.body.img})
      // db.collection('Recipes').save(recipe)
      
      db.collection('Recipes').update({img : req.body.img},{$set: {seelater: req.body.seelater}})
      res.json({result: "success"})
    })
    app.get('/foodrecipe', function(req, res){
      var db = client.db('Vegan')
      db.collection('Recipes').find().toArray(function(err, recipes){
        res.send(recipes)
      })
    })
    app.get('/foodrecipe/:food', function(req, res){
      var db = client.db('Vegan')
      db.collection('Recipes').find({food: req.params.food},{food: 1, img: 1, ingredients:1, content: 1}).toArray(function(err, recipe){
        res.send(recipe)
      })
    })

    app.listen(8080,()=> {
      console.log('Connected to MongoDB Server, WebService running on port 8080');
    })
  }
}
)
