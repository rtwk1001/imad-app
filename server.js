var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
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
app.get('/:personName', function (req, res) {
   var personName=req.params.personName;
  res.send(createTemplet(persons[personName]));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
var persons={
    'person-one':{
    title:"person1",
    heading:"hello! Thats your personal details portal",
    name:"Ritwik Jain",
    age:"22",
    gender:"male",
    city:"Bangalore"
    
    
},
    'person-two':{
    title:"person2",
    heading:"hello! Thats your personal details portal",
    name:"shivani brajwasi",
    age:"21",
    gender:"female",
    city:"Bangalore"
    
    
},
'person-three':{
    title:"person3",
    heading:"hello! Thats your personal details portal",
    name:"Devesh upadhyay",
    age:"22",
    gender:"male",
    city:"Bangalore"
    
    
}
};
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
        <link href="ui/style.css" rel="stylesheet" />
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