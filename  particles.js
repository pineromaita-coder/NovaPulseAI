const canvas=document.createElement("canvas");
canvas.id="particlesCanvas";
document.body.appendChild(canvas);

const ctx=canvas.getContext("2d");

function resize(){
canvas.width=innerWidth;
canvas.height=innerHeight;
}
resize();
addEventListener("resize",resize);

const dots=[];

for(let i=0;i<80;i++){
dots.push({
x:Math.random()*innerWidth,
y:Math.random()*innerHeight,
v:Math.random()+.3
});
}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="rgba(0,220,255,.6)";

dots.forEach(d=>{

ctx.beginPath();
ctx.arc(d.x,d.y,2,0,7);
ctx.fill();

d.y-=d.v;

if(d.y<0){
d.y=canvas.height;
d.x=Math.random()*canvas.width;
}

});

requestAnimationFrame(draw);

}

draw();