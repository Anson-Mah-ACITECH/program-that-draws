// Name: Anson Mah
// Date: 26 April, 2024

const canvas = document.getElementById('canvas');
const ctx = document.getElementById('canvas').getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSizeInput');
const eraserSize = document.getElementById('eraserSizeInput');

// Dictates whether the mouse moving causes the canvas to change or not.
let nowPainting = false;

// Will be used for drawing shapes
let firstPointX = undefined;
let firstPointY = undefined;
let imageData = undefined;

// Canvas History; Used for Undo & Redo Functionality
let undoQueue = []; 
let redoQueue = []; 

// Makes the background white; Prevents background from being transparent on user download.
clear_canvas()

canvas.addEventListener('mousedown', (e)=>{
  nowPainting = true; // Enables the user to draw on the canvas. 
	ctx.beginPath();
	ctx.lineWidth = brushSize.value; // Sets the line width to current brush size.
	ctx.strokeStyle = colorPicker.value; // Sets the tool color to the one currently selected.
	ctx.lineCap = 'round'; // Makes the brush tips round instead of blocky.
	firstPointX = e.offsetX; // Used as a starting point for drawing shapes.
	firstPointY = e.offsetY; // Used as a starting point for drawing shapes.
	imageData=ctx.getImageData(0, 0, canvas.width, canvas.height); 
	
	// If the paint bucket is selcted, then it will fill the clicked area with the selected color.
	if (document.querySelector('input:checked').id == 'paintBucket') {
			let coordinateData = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
			let originalColor = `rgb(${coordinateData[0]}, ${coordinateData[1]}, ${coordinateData[2]})`
			let newColor = colorPicker.value;
	}
})

// Makes the user actually draw stuff on the canvas. 
canvas.addEventListener('mousemove', (e)=>{
	if (nowPainting === true) { 
		switch (document.querySelector('input:checked').id) {

			case "brush":
				ctx.moveTo(e.offsetX, e.offsetY);
				ctx.lineTo(firstPointX, firstPointY);
        ctx.stroke();
				firstPointX = e.offsetX; 
				firstPointY = e.offsetY;
			break;

			case "pencil":
				ctx.lineWidth = 1;
				ctx.moveTo(e.offsetX, e.offsetY);
				ctx.lineTo(firstPointX, firstPointY);
        ctx.stroke();
				firstPointX = e.offsetX; 
				firstPointY = e.offsetY;
			break;
		
			case "eraser":
				ctx.lineWidth = eraserSize.value;
				ctx.strokeStyle = 'white';
				ctx.moveTo(e.offsetX, e.offsetY);
				ctx.lineTo(firstPointX, firstPointY);
        ctx.stroke();
				firstPointX = e.offsetX; 
				firstPointY = e.offsetY;
			break;

			case "rectangle":
				ctx.putImageData(imageData, 0, 0);
				ctx.strokeRect(e.offsetX, e.offsetY, firstPointX-e.offsetX, firstPointY-e.offsetY);
			break;

			case "circle":
				ctx.putImageData(imageData, 0, 0);
				ctx.beginPath();
				let DISTANCE_FORMULA = Math.sqrt(((e.offsetY-firstPointY)**2+(e.offsetX-firstPointX)**2));
				ctx.arc(firstPointX, firstPointY, DISTANCE_FORMULA, 0, 2*Math.PI);
				ctx.stroke();
			break;

			case "line":
				ctx.putImageData(imageData, 0, 0);
				ctx.beginPath();
				ctx.moveTo(firstPointX, firstPointY);
				ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
			break;
		}
	}
})

canvas.addEventListener('mouseup', ()=>{
  nowPainting = false; // Makes the user now unable to paint until they hold their mouse down again.
	undoQueue.push(ctx.getImageData(0, 0, canvas.width, canvas.height)); // Stores their most recent stroke. This enables the user to undo their strokes.
})

function clear_canvas() {
	undoQueue.push(ctx.getImageData(0, 0, canvas.width, canvas.height)); // Enables the user to undo their clear.
  ctx.fillStyle = "white"; // The default background color is white. 
	ctx.fillRect(0, 0, canvas.width, canvas.height); // Fills the entire canvas with the default background color, essentially cleaning it. 
}

function save_image() {
	let a = document.createElement('a'); 
	a.download = "MyCanvas"; // Sets the default name of the file when it is downloaded.
	a.href = canvas.toDataURL(); // Gets the current state of the canvas so that it can be downloaded.
	a.click();
}

function undo() {
	redoQueue.push(ctx.getImageData(0, 0, canvas.width, canvas.height)); // Takes the current state of the canvas and adds it to the redo queue.
	undoQueue.pop(); 
	if (undoQueue.length>0) {
		ctx.putImageData(undoQueue[undoQueue.length-1], 0, 0); 
	} else {
		clear_canvas();
	}
}

function redo() {
	undoQueue.push(ctx.getImageData(0, 0, canvas.width, canvas.height)); // Takes the current state of the canvas and adds it to the undo queue.
	if (redoQueue.length>0) {
		ctx.putImageData(redoQueue[redoQueue.length-1], 0, 0);
	}
	redoQueue.pop();
}

// Adds keyboard shortcuts to the drawing app.
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
			if (e.ctrlKey || e.metaKey) {
				e.preventDefault(); // CTRL+S on a normal HTML page would prompt the user to save the entire HTML page. We only want the user to be prompted with saving the canvas, so we must stop CTRL+S from doing its normal function. In other words, we must prevent the default action of CTRL+S. 
				save_image();
			}
		break;

		case "z":
		case "Z":
			if (e.ctrlKey || e.metaKey) {
				undo();
			}
		break;

		case "y":
		case "Y":
			if (e.ctrlKey || e.metaKey) {
				redo();
			}
		break;
	}
})