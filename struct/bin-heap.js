/*
    Binary Min-Heap
    http://eloquentjavascript.net/appendix2.html
*/

define(function () {

    function BinaryHeap(scoreFunc) {
        this.heap = [];
        this.scoreFunc = scoreFunc;
    }

    BinaryHeap.prototype.push = function (e) {
        this.heap.push(e);
        this.bubbleUp(this.heap.length - 1);
    };

    BinaryHeap.prototype.pop = function () {
        var ret = this.heap[0];
        var end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        return ret;
    };

    BinaryHeap.prototype.remove = function (node) {
        var len = this.heap.length;

        for (var i = 0; i < len; i += 1) {
            if (this.scoreFunc(this.heap[i]) == this.scoreFunc(node)) {
                var end = this.heap.pop();
                if (i != len - 1) {
                    if (this.scoreFunc(end) < this.scoreFunc(node)) {
                        this.bubbleUp(i);
                    } else {
                        this.sinkDown(i);
                    }
                }
                return;
            }
        }
    };

    BinaryHeap.prototype.size = function () {
        return this.heap.length;
    };

    BinaryHeap.prototype.bubbleUp = function (i) {
        var e = this.heap[i],
            es = this.scoreFunc(e);

        while (i > 0) {
            var pi = Math.floor((i + 1) / 2) - 1;
            var p = this.heap[pi];
            if (es < this.scoreFunc(p)) {
                this.heap[pi] = e;
                this.heap[i] = p;
                i = pi;
            } else {
                break;
            }
        }
    };

    BinaryHeap.prototype.sinkDown = function (i) {
        var len = this.heap.length;
        var e = this.heap[i];
        var es = this.scoreFunc(e);

        while (true) {
            var c1i = (i + 1) * 2,
                c2i = c1i - 1,
                s = null;

            if (c1i < len) {
                var c1 = this.heap[c1i],
                    c1s = this.scoreFunc(c1);
                if (c1s < es) {
                    s = c1i;
                }
            }

            if (c2i < len) {
                var c2 = this.heap[c2i],
                    c2s = this.scoreFunc(c2);
                if (c2s < (s === null ? es : c1s)) {
                    s = c2i;
                }
            }

            if (s !== null) {
                this.heap[i] = this.heap[s];
                this.heap[s] = e;
                i = s;
            } else {
                break;
            }
        }
    };

    BinaryHeap.prototype.rescoreElement = function (n) {
        this.sinkDown(this.heap.indexOf(n));
    };

    return BinaryHeap;
});