// Name: Anson Mah
// Date: 26 April, 2024

const canvas = document.getElementById('canvas')
const ctx = document.getElementById('canvas').getContext('2d');
let now_painting = false;

// LINE
// ctx.moveTo(0,0);
// ctx.lineTo(x,y);
// ctx.stroke();

// TEXT
// ctx.font = "12px Helvetica"
// ctx.fillText("Let's say, hypothetically, your mom was wearing a yellow raincoat.", x, y)

// RECTANGLE
// ctx.rect(x, y, width, height);
// ctx.stroke();

// CIRCLE
// Angles are measured in Radians
// True = counterclockwise
// False = clockwise
// ctx.beginPath();
// ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
// ctx.stroke();

canvas.addEventListener('mousedown', (e)=>{
  console.log(e)
  now_painting = true;
  ctx.beginPath();
  ctx.strokeStyle = color_picker.value;
  // ctx.arc(e.offsetX, e.offsetY, 2, 0, 2*Math.PI);
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.moveTo(e.offsetX, e.offsetY)
  ctx.stroke();
})

canvas.addEventListener('mousemove', (e)=>{
  if (now_painting===true) {
    ctx.beginPath();
    // ctx.arc(e.offsetX, e.offsetY, 2, 0, 2*Math.PI);
    ctx.strokeStyle = color_picker.value;
    ctx.lineWidth = thickness.value;
    ctx.lineCap = 'round';
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke();
  }
})

canvas.addEventListener('mouseup', ()=>{
  now_painting = false;
})

function clear_canvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}