// Name: Anson Mah
// Date: 26 April, 2024

const canvas = document.getElementById('canvas');
const ctx = document.getElementById('canvas').getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSizeInput');
const eraserSize = document.getElementById('eraserSizeInput');

// Helps with drawing
let nowPainting = false;

// Will be used for drawing shapes
let firstPointX = undefined;
let firstPointY = undefined;

// Canvas History
// Used for Undo & Redo functionality
let thingsThatCanBeUndone = []; 
let thingsThatCanBeRedone = []; 

// Makes the background white.
// Prevents background from being transparent on user download.
clear_canvas()

// Makes user able to draw on the canvas. 
canvas.addEventListener('mousedown', (e)=>{
  nowPainting = true;
	ctx.beginPath();
	ctx.lineWidth = brushSize.value;
	ctx.strokeStyle = colorPicker.value;
	ctx.lineCap = 'round';
	firstPointX = e.offsetX;
	firstPointY = e.offsetY;
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

			case "paintBucket":

			break;

			case "rectangle":
				ctx.strokeRect(e.offsetX, e.offsetY, firstPointX-e.offsetX, firstPointY-e.offsetY);
			break;

			case "circle":
				ctx.beginPath();
				ctx.arc(firstPointX, firstPointY, e.offsetX-firstPointX, 0, 2*Math.PI);
				ctx.stroke();
			break;

			case "line":
				ctx.moveTo(firstPointX, firstPointY);
				ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
			break;
		}
	}
})

// Stops drawing on the canvas when user releases their mouse. 
canvas.addEventListener('mouseup', ()=>{
  nowPainting = false;
	firstPointX = undefined;
	firstPointY = undefined;
})

// Clears the canvas. 
function clear_canvas() {
  ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Saves whatever the user drew on the canvas as a png image.
function save_image() {
	let a = document.createElement('a');
	a.download = "canvas_drawing.png";
	a.href = canvas.toDataURL('png');
	a.click();
}

function undo() {

}

function redo() {

}

// Adds keyboard functionality to the drawing app.
document.body.addEventListener('keydown', (e)=> {
	switch (e.key) {

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

		case "f":
		case "F":
			document.getElementById('paintBucket').click();
		break;

		case "r":
		case "R":
			document.getElementById('rectangle').click();
		break;

		case "c":
		case "C":
			document.getElementById('circle').click();
		break;

		case "l":
		case "L":
			document.getElementById('line').click();
		break;

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

		case "c":
		case "C":
			colorPicker.click();
		break;

		case "Delete":
			clear_canvas()
		break;

		case "s":
		case "S":
			save_image();
		break;
	}
})