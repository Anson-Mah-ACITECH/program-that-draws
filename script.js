// Name: Anson Mah
// Date: 26 April, 2024

const canvas = document.getElementById('canvas');
const ctx = document.getElementById('canvas').getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSizeInput');
const eraserSize = document.getElementById('eraserSizeInput');

let nowPainting = false;

// Makes the background white.
// Prevents background from being transparent on user download.
clear_canvas()

// Makes user able to draw on the canvas. 
canvas.addEventListener('mousedown', ()=>{
  nowPainting = true;
	ctx.beginPath();
	ctx.lineWidth = brushSize.value;
	ctx.strokeStyle = colorPicker.value;
	ctx.lineCap = 'round';
})

// Makes the user actually draw stuff on the canvas. 
canvas.addEventListener('mousemove', (e)=>{
  if (nowPainting === true) {
		switch (document.querySelector('input:checked').id) {

			case "brush":
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
			break;

			case "pencil":
				ctx.lineWidth = 1;
				ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
			break;
		
			case "eraser":
				ctx.lineWidth = eraserSize.value;
				ctx.strokeStyle = 'white';
				ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
			break;
		}
	}
})

// Makes user unable to paint if the mouse strays away from the canvas. 
canvas.addEventListener('mouseout', ()=> {
	nowPainting = false;
})

// Stops drawing on the canvas when user releases their mouse. 
canvas.addEventListener('mouseup', ()=>{
  nowPainting = false;
})

// Clears the canvas. 
function clear_canvas() {
  ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Saves whatever the user drew on the canvas as a png image.
function save_image() {
	const a = document.createElement('a');
	a.download = "canvas_drawing.png";
	a.href = canvas.toDataURL('png');
	a.click();
}

// Adds keyboard functionality to the drawing app.
document.body.addEventListener('keydown', (e)=> {
	console.log(e)
	switch (e.key) {

		case "[":
		case "-":
			if (brushSize.value>1) {
				brushSize.value--;
			}
			if (eraserSize.value>1) {
				eraserSize.value--;
			}
		break;

		case "]":
		case "+":
			brushSize.value++;
			eraserSize.value++;
		break;

		case "b":
		case "B":
			document.getElementById('brush').click();
		break;

		case "p":
		case "P":
			document.getElementById('pencil').click();
		break;

		case "e":
		case "E":
			document.getElementById('eraser').click();
		break;

		case "Delete":
			clear_canvas()
		break;

		case "c":
		case "C":
			colorPicker.click();
		break;

		case "s":
		case "S":
			save_image();
		break;
	}
})