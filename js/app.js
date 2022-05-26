import Gradient from './Gradient.js';
import PerlinNoise from './Perlin.js';
var canvasSize = 128;
var pointSize = 2;
var canvasResolution = canvasSize / pointSize;
var gridSize = 16;
var gridTargetOffset = 1 / (gridSize * 2);
var canvas = document.querySelector('#perlin');
var ctx = canvas.getContext('2d');
canvas.width = canvas.height = canvasSize;
var perlin = new PerlinNoise([0, 1], '');
var colorScheme = new Gradient('FFB976', 'FFF7E6');
function renderCanvas(offset) {
    if (offset === void 0) { offset = 0; }
    for (var x = 0; x < canvasResolution / gridSize; x += 1 / gridSize) {
        for (var y = 0; y < canvasResolution / gridSize; y += 1 / gridSize) {
            var v = perlin.get(x + gridTargetOffset + offset / gridSize, y + gridTargetOffset);
            ctx.fillStyle = "#".concat(colorScheme.getInterimColor(v));
            ctx.fillRect(x * gridSize * pointSize, y * gridSize * pointSize, pointSize, pointSize);
        }
    }
}
renderCanvas();
var offset = 0;
setInterval(function () {
    renderCanvas(offset);
    offset += 1;
}, 50);
//# sourceMappingURL=app.js.map