import Gradient from './Gradient';
import PerlinNoise from './Perlin';

const canvasSize : number = 128;
const pointSize : number = 2;
const canvasResolution : number = canvasSize / pointSize;

const gridSize : number = 16;
const gridTargetOffset : number = 1 / (gridSize * 2);

const canvas = document.querySelector('#perlin') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

canvas.width = canvas.height = canvasSize;

const perlin : PerlinNoise = new PerlinNoise([0, 1], '');
const colorScheme : Gradient = new Gradient('FFB976', 'FFF7E6');

function renderCanvas(offset : number = 0) {
    for(let x = 0; x < canvasResolution / gridSize; x += 1 / gridSize) {
        for(let y = 0; y < canvasResolution / gridSize; y += 1 / gridSize) {
            const v = perlin.get(x + gridTargetOffset + offset / gridSize, y + gridTargetOffset);
            ctx.fillStyle = `#${colorScheme.getInterimColor(v)}`;
            ctx.fillRect(x * gridSize * pointSize, y * gridSize * pointSize, pointSize, pointSize);
        }
    }
}

renderCanvas();
let offset : number = 0;
setInterval(() => {
    renderCanvas(offset);
    offset += 1;
}, 50);