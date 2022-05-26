var PerlinNoise = (function () {
    function PerlinNoise(outputRange, seed) {
        if (seed === void 0) { seed = ''; }
        this.outputRange = outputRange;
        this.seed = seed;
        this.gradients = {};
    }
    PerlinNoise.prototype.mapRange = function (num) {
        return this.outputRange[0] + ((num + 0.707) * (this.outputRange[1] - this.outputRange[0])) / (1.414);
    };
    PerlinNoise.prototype.generateSeed = function (seed) {
        function Mash() {
            var f, n = 4022871197;
            return function (r) {
                for (var t = void 0, s = void 0, u = 0, e = 0.02519603282416938; u < r.length; u++)
                    s = r.charCodeAt(u), f = (e * (n += s) - (n * e | 0)),
                        n = 4294967296 * ((t = f * (e * n | 0)) - (t | 0)) + (t | 0);
                return (n | 0) * 2.3283064365386963e-10;
            };
        }
        return function () {
            var m = Mash();
            var a = m(' '), b = m(' '), c = m(' '), x = 1, y;
            seed = seed.toString(), a -= m(seed), b -= m(seed), c -= m(seed);
            a < 0 && a++, b < 0 && b++, c < 0 && c++;
            return function () {
                var y = x * 2.3283064365386963e-10 + a * 2091639;
                a = b, b = c;
                return c = y - (x = y | 0);
            };
        }();
    };
    PerlinNoise.prototype.dotProduct = function (x, y, vx, vy) {
        var vector1;
        var coordsCode = [vx, vy].join('.');
        var vector2 = {
            x: x - vx,
            y: y - vy
        };
        if (this.gradients[coordsCode]) {
            vector1 = this.gradients[coordsCode];
        }
        else {
            vector1 = this.createUnitVector(vx, vy);
            this.gradients[coordsCode] = vector1;
        }
        return vector1.x * vector2.x + vector1.y * vector2.y;
    };
    PerlinNoise.prototype.smootherstepLerp = function (x) {
        return 6 * Math.pow(x, 5) - 15 * Math.pow(x, 4) + 10 * Math.pow(x, 3);
    };
    PerlinNoise.prototype.lerp = function (x, bindPoint1, bindPoint2) {
        return bindPoint1 + (bindPoint2 - bindPoint1) * this.smootherstepLerp(x);
    };
    PerlinNoise.prototype.createUnitVector = function (x, y) {
        var theta = this.generateSeed([x, this.seed, y].join(''))() * 2 * Math.PI;
        return {
            x: Math.cos(theta),
            y: Math.sin(theta)
        };
    };
    PerlinNoise.prototype.get = function (x, y) {
        var targetX = Math.floor(x);
        var targetY = Math.floor(y);
        var tl = this.dotProduct(x, y, targetX, targetY);
        var tr = this.dotProduct(x, y, targetX + 1, targetY);
        var bl = this.dotProduct(x, y, targetX, targetY + 1);
        var br = this.dotProduct(x, y, targetX + 1, targetY + 1);
        var xt = this.lerp(x - targetX, tl, tr);
        var xb = this.lerp(x - targetX, bl, br);
        var v = this.lerp(y - targetY, xt, xb);
        this.gradients = {};
        return this.mapRange(v);
    };
    return PerlinNoise;
}());
export default PerlinNoise;
//# sourceMappingURL=Perlin.js.map