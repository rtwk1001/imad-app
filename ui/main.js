console.log('Loaded!');
var img=document.getElementById("madi");
var marginleft=0;
function moveRight(){
    while(marginleft<=500){
    marginleft+=1;
    
    img.style.marginLeft=marginleft+"px";}
    
}
img.onclick=function(){
    var interval=setInterval(moveRight,500);
    
};