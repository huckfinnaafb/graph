/*
    Graph
*/

define(function (Node, Vec2) {

    function Graph(width, length) {

        // Dimensions
        this.width = width;
        this.length = length;

        // Nodes
        this.nodes = new Array(width * length);

        // Fill graph with empty nodes
        var i;
        for (i = 0; i < this.nodes.length; i += 1) {
            this.nodes[i] = new Node(this, i);
        }
    }

    Graph.prototype.toIndex = function (vec2) {
        return ((vec2.y * this.width) + vec2.x);
    };

    Graph.prototype.toVec2 = function (index) {
        return new Vec2(index % this.width, Math.floor(index / this.width));
    };

    Graph.prototype.neighbors = function (index) {
        var neighbors = [],
            indices = [
                index + 1,
                index - 1,
                index + this.width,
                index - this.width
            ];

        var i;
        for (i = 0; i < indices.length; i += 1) {
            if (this.inBounds(indices[i])) {
                neighbors.push(this.nodes[indices[i]]);
            }
        }

        return neighbors;
    };

    Graph.prototype.inBounds = function (index) {
        return (index >= 0 && index < this.nodes.length);
    };

    return Graph;

});