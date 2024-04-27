// Name: Anson Mah
// Date: 26 April, 2024

const canvas = document.getElementById('canvas');
const ctx = document.getElementById('canvas').getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSizeInput');
const eraserSize = document.getElementById('eraserSizeInput');

let nowPainting = false;

canvas.addEventListener('mousedown', ()=>{
  nowPainting = true;
	ctx.beginPath();
	ctx.lineWidth = brushSize.value;
	ctx.strokeStyle = colorPicker.value;
	ctx.lineCap = 'round';
})

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

canvas.addEventListener('mouseup', ()=>{
  nowPainting = false;
})

function clear_canvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}