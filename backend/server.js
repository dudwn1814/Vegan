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

const { db } = require('../../../../Bitnami/wampstack-7.4.8-0/apache2/htdocs/week4/models/users');
const multer = require('multer');
const router = express.Router();

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

app.use(express.static('nodemailerTest'));

//Connection URL
//var url = 'mongodb+srv://admin:madcamp@week2.ivjze.mongodb.net/week2nodejs?retryWrites=true&w=majority' // 27017 is default port
// var url = 'mongodb://localhost:27017'
var url = 'mongodb+srv://vegan:1111@cluster0.hso7u.mongodb.net/Vegan?retryWrites=true&w=majority'

const nodemailer = require('nodemailer');
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


MongoClient.connect(url,{useUnifiedTopology: true},function(err,client){
  if (err)
    console.log('Unable to connect to the mongoDB server.Error', err);
  else{

    app.get('/oneitem', function(req, res){
      var db = client.db('Vegan') 
      
      var name = req.query.name;

      db.collection('users').find({'name': name}).toArray(function(err, users){
        if(err) return res.status(500).send({error: 'database failure'});
        res.send(users)
        
      })
    });

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
        }
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
        content: req.body.content
      }
      db.collection('Recipes').save(recipe)
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
