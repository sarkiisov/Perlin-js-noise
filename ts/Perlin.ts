type outputRange = [number, number];
type vector = {x: number, y: number};
type gradients = {
    [key : string]: vector;
};

export default class PerlinNoise {
    private outputRange: outputRange;
    private seed: string;
    private gradients: gradients;
    private mapRangeMode: string;

    constructor(outputRange : outputRange, seed : string = '') {
        this.outputRange = outputRange;
        this.seed = seed;
        this.gradients = {};
    }

    private mapRange(num: number) : number {
        //mapping default Perlin noise outputs to custom provided
        return this.outputRange[0] + ((num + 0.707) * (this.outputRange[1] - this.outputRange[0])) / (1.414);
    }

    private generateSeed(seed: string) {
        //Alea PRNG implementation (https://www.npmjs.com/package/alea)
        function Mash() {
            let f, n = 4022871197;
            return function(r) {
                for(let t, s, u = 0, e = 0.02519603282416938; u < r.length; u++)
                    s = r.charCodeAt(u), f = (e * (n += s) - (n * e | 0)),
                    n = 4294967296 * ((t = f * (e * n | 0)) - (t | 0)) + (t | 0);
                return (n | 0) * 2.3283064365386963e-10;
            };
        }
        return function() {
            const m = Mash();
            let a = m(' '), b = m(' '), c = m(' '), x = 1, y;
            seed = seed.toString(), a -= m(seed), b -= m(seed), c -= m(seed);
            a < 0 && a++, b < 0 && b++, c < 0 && c++;
            return function() {
                const y = x * 2.3283064365386963e-10 + a * 2091639; a = b, b = c;
                return c = y - (x = y | 0);
            };
        }();
    }

    private dotProduct(x : number, y : number, vx : number, vy : number) {
        let vector1 : vector;
        const coordsCode = [vx, vy].join('.');
        const vector2 = {
            x: x - vx,
            y: y - vy
        };
        if(this.gradients[coordsCode]) {
            vector1 = this.gradients[coordsCode];
        } else {
            vector1 = this.createUnitVector(vx, vy);
            this.gradients[coordsCode] = vector1;
        }
        return vector1.x * vector2.x + vector1.y * vector2.y;
    }

    private smootherstepLerp(x : number) : number {
        return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
    }

    private lerp(x : number, bindPoint1 : number, bindPoint2 : number) : number {
        //Interpolate line equation beetween target point to achieve smooth transition
        return bindPoint1 + (bindPoint2 - bindPoint1) * this.smootherstepLerp(x);
    }

    private createUnitVector(x : number, y : number) {
        const theta = this.generateSeed([x, this.seed, y].join(''))() * 2 * Math.PI;
        return {
            x: Math.cos(theta),
            y: Math.sin(theta)
        };
    }

    public get(x : number, y : number) : number {
        const targetX : number = Math.floor(x);
        const targetY : number = Math.floor(y);

        const tl : number = this.dotProduct(x, y, targetX,  targetY);
        const tr : number = this.dotProduct(x, y, targetX + 1, targetY);
        const bl : number = this.dotProduct(x, y, targetX,  targetY + 1);
        const br : number = this.dotProduct(x, y, targetX + 1, targetY + 1);
        const xt : number = this.lerp(x - targetX, tl, tr);
        const xb : number = this.lerp(x - targetX, bl, br);
        const v : number = this.lerp(y - targetY, xt, xb);
        this.gradients = {};
        return this.mapRange(v);
    }
}