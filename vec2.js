/*
    2D Vector
*/

define(function () {

    function Vec2(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    Vec2.prototype.place = function (b) {
        this.x = b.x;
        this.y = b.y;
    };

    Vec2.prototype.offset = function (b) {
        this.place(Vec2.add(this, b));
    };

    Vec2.prototype.negate = function () {
        this.place(Vec2.negative(this));
    };

    Vec2.prototype.normalize = function () {
        this.place(Vec2.normalize(this));
    };

    Vec2.prototype.clone = function () {
        return new Vec2(this.x, this.y);
    };

    Vec2.prototype.report = function () {
        return console.log("(" + this.x + ", " + this.y + ")");
    };

    // Vector -> Vector Functions
    Vec2.add = function (a, b) {
        return new Vec2(a.x + b.x, a.y + b.y);
    };

    Vec2.negative = function (a) {
        return Vec2.multiply(a, -1);
    };

    Vec2.subtract = function (a, b) {
        return new Vec2(a.x - b.x, a.y - b.y);
    };

    // Vector -> Scalar Functions
    Vec2.interpolate = function (a, b, t) {
        return new Vec2(t * (b.x - a.x) + a.x, t * (b.y - a.y) + a.y);
    };

    Vec2.multiply = function (a, t) {
        return new Vec2(t * a.x, t * a.y);
    };

    Vec2.normalize = function (a) {
        return Vec2.multiply(a, 1 / (Vec2.magnitude(a)));
    };

    // Returns Boolean
    Vec2.isCoincident = function (a, b) {
        return ((Vec2.direction(a) - Vec2.direction(b)) < 0.09); // Approx
    };

    Vec2.isEqual = function (a, b) {
        return ((a.x === b.x) && (a.y === b.y));
    };

    // Returns Real Numbers
    Vec2.direction = function (a) {
        return Math.atan(a.y / a.x);
    };

    Vec2.distance = function (a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    };

    Vec2.magnitude = function (a) {
        return Vec2.distance(a, {x: 0, y: 0});
    };

    /*
    Assume the following graph for these offsets
              |
      III     |    IV
     (-, -)   |   (+, -)
              |
    ----------+---------
              |
      II      |    I
     (-, +)   |   (+, +)
              |
    */

    Vec2.N    = new Vec2( 0, -1);
    Vec2.W    = new Vec2(-1,  0);
    Vec2.S    = new Vec2( 0,  1);
    Vec2.E    = new Vec2( 1,  0);
    Vec2.NW   = new Vec2(-1, -1);
    Vec2.NE   = new Vec2( 1, -1);
    Vec2.SW   = new Vec2(-1,  1);
    Vec2.SE   = new Vec2( 1,  1);

    Vec2.i    = new Vec2( 0,  1);
    Vec2.one  = new Vec2( 1,  0);
    Vec2.zero = new Vec2( 0,  0);

    return Vec2;
});