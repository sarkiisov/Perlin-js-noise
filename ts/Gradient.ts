export default class Gradient {
    private color1: string;
    private color2: string;

    constructor(color1: string, color2: string) {
        this.color1 = color1;
        this.color2 = color2;
    }

    private getHexCode(x) {
        return x.toString(16).padStart(2, '0');
    }

    public getInterimColor(position: number) {
        if(position < 0) position = 0;
        if(position > 1) position = 1;

        const r = Math.ceil(parseInt(this.color2.substring(0, 2), 16) * position + parseInt(this.color1.substring(0, 2), 16) * (1 - position));
        const g = Math.ceil(parseInt(this.color2.substring(2, 4), 16) * position + parseInt(this.color1.substring(2, 4), 16) * (1 - position));
        const b = Math.ceil(parseInt(this.color2.substring(4, 6), 16) * position + parseInt(this.color1.substring(4, 6), 16) * (1 - position));
        const middle = this.getHexCode(r) + this.getHexCode(g) + this.getHexCode(b);
        return middle;
    }
}