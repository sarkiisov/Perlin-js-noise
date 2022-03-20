class PerlinNoise {
    constructor(outputRange = [-1, 1], seed = '') {
        this.outputRange = outputRange;
        this.seed = seed;
        this.gradients = {};
    }

    mapRange(x) {
        return this.outputRange[0] + ((x + Math.sqrt(0.5)) * (this.outputRange[1] - this.outputRange[0])) / (2 * Math.sqrt(0.5));
    }

    dotProduct(x, y, vx, vy) {
        let vector1;
        let vector2 = {
            x: x - vx,
            y: y - vy
        };
        if(this.gradients[[vx, vy]]) {
            vector1 = this.gradients[[vx, vy]];
        } else {
            vector1 = this.createUnitVector(vx, vy);
            this.gradients[[vx, vy]] = vector1;
        }
        return vector1.x * vector2.x + vector1.y * vector2.y;
    }

    smoothLerp(x) {
        return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
    }

    lerp(x, y, a) {
        return y + (a - y) * this.smoothLerp(x);
    }

    createUnitVector(x, y) {
        let coordsSeed = new Math.seedrandom('' + x + y + this.seed);
        let theta = coordsSeed() * 2 * Math.PI;
        return {
            x: Math.cos(theta),
            y: Math.sin(theta)
        };
    }

    get(x, y) {
        let targetX = Math.floor(x);
        let targetY = Math.floor(y);

        let tl = this.dotProduct(x, y, targetX,  targetY);
        let tr = this.dotProduct(x, y, targetX + 1, targetY);
        let bl = this.dotProduct(x, y, targetX,  targetY + 1);
        let br = this.dotProduct(x, y, targetX + 1, targetY + 1);
        let xt = this.lerp(x - targetX, tl, tr);
        let xb = this.lerp(x - targetX, bl, br);
        let v = this.lerp(y - targetY, xt, xb);
        this.gradients = [];
        return this.mapRange(v);
    }
}