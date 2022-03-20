const canvasSize = 64;
const pointSize = 2;
const canvasResolution = canvasSize / pointSize;

const gridSize = 16;
const gridTargetOffset = 1 / (gridSize * 2);

const canvas = document.querySelector('#perlin');
const ctx = canvas.getContext('2d');
canvas.width = canvas.height = canvasSize;

const perlin = new PerlinNoise([0, 255], 'superseed', gridSize);

function renderCanvas(offset = 0) {
    for(let x = 0; x < canvasResolution / gridSize; x += 1 / gridSize) {
        for(let y = 0; y < canvasResolution / gridSize; y += 1 / gridSize) {
            const v = perlin.get(x + gridTargetOffset + offset / gridSize, y + gridTargetOffset);
            ctx.fillStyle = `hsl(${v}, 80%, 50%)`;
            ctx.fillRect(x * gridSize * pointSize, y * gridSize * pointSize, pointSize, pointSize);
        }
    }
}

renderCanvas();
let offset = 0;
setInterval(() => {
    renderCanvas(offset);
    offset += 1;
}, 50);