var canvas = document.getElementById("canvas");
var body = document.getElementById("body");

var ctx = canvas.getContext("2d");


canvas.addEventListener('mousedown', (event) => {
    console.log(event);
    ctx.beginPath();
    // arc(x, y, radius, startAngle(radians), endAngle(radians)
    ctx.arc(event.offsetX, event.offsetY, 20, 0, 2 * Math.PI)
    ctx.stroke();
})

canvas.addEventListener('mouseup', () => {
    
})











// code that will draw a line
// ctx.moveTo(0,0);
// ctx.lineTo(500,500);
// ctx.stroke();

//code that will draw a circle
// ctx.beginPath();
// // arc(x, y, radius, startAngle(radians), endAngle(radians)
// ctx.arc(250, 250, 150, 0, 2 * Math.PI)
// ctx.stroke();

// drawing a rectangle
// ctx.moveTo(70, 30);
// ctx.lineTo(210, 30);
// ctx.lineTo(210, 490);
// ctx.lineTo(70, 490);
// ctx.lineTo(70,30);
// ctx.stroke();

// drawing a rectangle, but cool B)
// rect (x, y, width, height)
// ctx.rect(220, 30, 100, 100);
// ctx.stroke();


