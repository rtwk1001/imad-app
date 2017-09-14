
var submit=document.getElementById("submit_btn");

submit.onclick=function(){
    
   
    
    var request= new XMLHttpRequest();
     request.onreadystatechange=function(){
         if(request.readyState===XMLHttpRequest.DONE){
         if(request.status===200){
          console.log("logged In");
          alert("Logged In sucessfully");
          
         }
         else if(request.status===403)
         alert("username or password Incorrect");
         else if(request.status===500)
         alert("Unknownk Error");
             
         }
     };
     var username=document.getElementById("username").value;
         var password=document.getElementById("password").value;
        
         
    request.open('POST',"http://rtwk1001.imad.hasura-app.io/login",true);
    request.setRequestHeader('content-type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
  
};