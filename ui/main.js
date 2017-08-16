console.log('Loaded!');
var img=document.getElementById("madi");
var marginleft=0;
function moveRight(){
    while(marginleft<=50){
    marginleft+=5;
    
    img.style.marginLeft=marginleft+"px";}
    
}
img.onclick=function(){
    var interval=setInterval(moveRight,50);
    
};