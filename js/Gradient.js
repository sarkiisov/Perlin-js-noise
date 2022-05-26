var Gradient = (function () {
    function Gradient(color1, color2) {
        this.color1 = color1;
        this.color2 = color2;
    }
    Gradient.prototype.getHexCode = function (x) {
        return x.toString(16).padStart(2, '0');
    };
    Gradient.prototype.getInterimColor = function (position) {
        if (position < 0)
            position = 0;
        if (position > 1)
            position = 1;
        var r = Math.ceil(parseInt(this.color2.substring(0, 2), 16) * position + parseInt(this.color1.substring(0, 2), 16) * (1 - position));
        var g = Math.ceil(parseInt(this.color2.substring(2, 4), 16) * position + parseInt(this.color1.substring(2, 4), 16) * (1 - position));
        var b = Math.ceil(parseInt(this.color2.substring(4, 6), 16) * position + parseInt(this.color1.substring(4, 6), 16) * (1 - position));
        var middle = this.getHexCode(r) + this.getHexCode(g) + this.getHexCode(b);
        return middle;
    };
    return Gradient;
}());
export default Gradient;
//# sourceMappingURL=Gradient.js.map