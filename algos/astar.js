/*
    A* Pathfinding

    Uses a binary min-heap for insertion, best node, and node removal.
    Uses an indexed array (indice based on vec2) for membership test.
*/

define(["data/bin-heap"], function (BinaryHeap) {

    function Path(graph, start, end, heuristic) {

        var openSet, begin;

        // Out of graph bounds
        if (!graph.inBounds(start) || !graph.inBounds(end)) {
            return false;
        }

        // Heuristic function
        heuristic = heuristic || Path.manhattan;

        // Open set
        openSet = new BinaryHeap(function (element) {
            return element.fscore;
        });

        // First node
        begin = graph.nodes[start];
        begin.gscore = 0;
        begin.hscore = heuristic(begin.index, end);
        begin.fscore = begin.gscore + begin.hscore;

        openSet.push(begin);

        while (openSet.heap.length) {

            var current = openSet.pop();

            if (current.index == end) {
                return Path.reconstruct(current);
            } else {
                current.closed = true;

                var neighbors = graph.neighbors(current);
                var i;
                for (i = 0; i < neighbors.length; i += 1) {
                    var neighbor = neighbors[i];

                    if (neighbor.closed === true) {
                        continue;
                    }

                    var cost = current.gscore + 1;
                    var visited = neighbor.visited;

                    if (!visited || cost < neighbor.gscore) {
                        neighbor.visited = true;
                        neighbor.parent = current;
                        neighbor.hscore = heuristic(neighbor.index, end);
                        neighbor.gscore = cost;
                        neighbor.fscore = neighbor.hscore + neighbor.gscore;

                        if (!visited) {
                            openSet.push(neighbor);
                        } else {
                            openSet.rescoreElement(neighbor);
                        }
                    }
                }
            }
        }

        return false;
    }

    Path.manhattan = function (a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    };

    Path.reconstruct = function (node) {
        var path = [];
        while (typeof node.parent !== 'undefined') {
            path.push(node.index);
            node = node.parent;
        }
        return path;
    };

    return Path;
});