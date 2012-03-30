/*
    Vector Linear Interpolation Tween
*/

define(function (Vec2) {

    return {
        queue: [],
        lerp: function (p, a, b, duration, callback, target) {

            if (Vec2.isEqual(a, b)) {
                if (typeof callback === 'function' &&
                        typeof target !== 'undefined') {
                    callback.apply(target);
                }
                return;
            }

            this.queue.push({
                p: p,
                a: a.clone(),
                b: b.clone(),
                duration: duration,
                distance: Vec2.distance(a, b),
                fn: callback,
                trgt: target,
                t: 0
            });
        },
        update: function (dt) {
            if (this.queue.length) {
                var i, q, t = 0;
                for (i = 0; i < this.queue.length; i += 1) {

                    // Shorthand Identifier
                    q = this.queue[i];

                    // Calculate step
                    t = 1 / (q.distance / (q.distance / (q.duration * dt)));

                    // Offset queued step
                    q.t += t;
                    if ((q.t) >= 1) {

                        // We're home
                        q.p.place(q.b);
                        this.queue.remove(i);
                        if (typeof q.fn === 'function') {
                            return q.fn.apply(q.trgt);
                        }
                    } else {

                        // Not there yet
                        q.p.place(Vec2.interpolate(q.a, q.b, q.t));
                    }
                }
            }
        }
    };

});