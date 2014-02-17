#canvas-node-tree

This project is intended to be the simplest possible 2D game engine for modern browsers using the <canvas> element.

###NodePrototype
The key object is the `NodePrototype`. You create a tree of nodes that are rendered on every frame. The nodes have their own nested transformations, allowing for convienent organization of the scene.

    var sprite = {
        skewX: 0.1,
        scaleX: 0.3, scaleY: 0.3,
        update: function(delta) {
            this.x += 6*delta
        },
        draw: function(context) {
            context.drawImage(img, 0, 0)
        }
    }
    sprite.__proto__ = NodePrototype

On each frame, `update` then `draw` are called. `update` recieves a delta in seconds since the last frame. `draw` recieves a [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) object *after* transformations have been applied. Above is an example of a basic sprite object.
