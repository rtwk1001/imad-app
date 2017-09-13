var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var config={
    user:'rtwk1001',
    database:'rtwk1001',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool= new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('select * from users',function(err,result){
        if(err)
        res.status(500).send(err.toString());
        else
        res.send(JSON.stringify(result));
        
    });
    
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
var count=0;
app.get('/counter',function(req,res){
    count=count+1;
    res.send(count.toString());
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
var names=[];
app.get('/submit-name', function (req, res) {
   var name=req.query.name;
   names.push(name);
  res.send(JSON.stringify(names));
});
app.get('/persons/:personName', function (req, res) {
   var personName=req.params.personName;
   pool.query("Select * from persons where title=$1",[req.params.personName],function(err,result){
       if(err)
       res.status(500).send(err.toString());
       else{
           if(result.rows.length===0)
           res.status(404).send("NOT FOUND");
           else
           { var personData=result.rows[0];
            res.send(createTemplet(personData));}
       }
   });

});
function hash(input, salt){
    var hashed =crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return hashed.toString('hex');
}
app.get('/hash/:input',function(req,res){
    var hashstring=hash(req.params.input,'some-random-string');
    res.send(hashstring);
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

function createTemplet(data){
    var title=data.title;
    var heading=data.heading;
    var name=data.name;
    var age=data.age;
    var gender=data.gender;
    var city= data.city;
    var templet=`
    <html>
    <head>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <div class="heading">
            <h2>${heading}</h2>;
            <p>welcome to your detail page</p>
            </div>
            <div class= "details">
                <table border="0">
                    <tr><td>Name:</td><td>${name}</td></tr>
                     <tr><td>age:</td><td>${age}</td></tr>
                      <tr><td>gender:</td><td>${gender}</td></tr>
                       <tr><td>city:</td><td>${city}</td></tr>
                </table>
                
                
                
                </div>
                
        
        
    </div>
</html>`;
return templet;
}