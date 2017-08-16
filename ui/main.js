console.log('Loaded!');

var button=document.getElementById("counter");
var span=document.getElementById("count");
var counter=0;
button.onclick=function(){
    
    var request= new XMLHttpRequest();
     request.onreadystatechange=function(){
         if(request.readystate===XMLHttpRequest.DONE)
         if(request.status===200){
         var counter=request.responseText;
          span.innerHtml=counter.toString();   
         }
     };
    
    request.open("GET","http://rtwk1001.imad.hasura-app.io/counter",true);
    request.send(null);
};