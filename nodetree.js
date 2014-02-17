(function(exports) {

    exports.NodePrototype = {
        x: 0, y: 0,
        skewX: 0, skewY: 0,
        scaleX: 1, scaleY: 1,
        rotation: 0,
        hidden: 0,
        children: [],
        _update: function(delta) {
            this.update(delta)
            for (c in this.children)
                this.children[c]._update(delta)
        },
        _draw: function(context) {
            if(this.hidden) return
            context.transform(this.scaleX, this.skewX, this.skewY, this.scaleY, this.x, this.y)
            if(this.rotation != 0)
                context.rotate(this.rotation)
            this.draw(context)
            for (c in this.children)
                this.children[c]._draw(context)
            context.transform(1/this.scaleX, -this.skewX, -this.skewY, 1/this.scaleY, -this.x, -this.y)
            if(this.rotation != 0)
                context.rotate(-this.rotation)
        },
        update: function(delta) {},
        draw: function(context) {}
    }

    var makeGame = function(id, callback) {
        var vendors = ['ms', 'moz', 'webkit', 'o']
        for(var x=0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
            window.cancelRequestAnimationFrame = window[vendors[x] + 'CancelRequestAnimationFrame']
        }
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var currentTime = new Date().getTime()
                var timeToCall = Math.max(0, 16 - (currentTime - lastTime))
                var id = window.setTimeout(function() { callback(currentTime + timeToCall) }, timeToCall)
                lastTime = currentTime + timeToCall
                return id
            }
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id)
            }
        }

        var canvas = document.getElementById(id)
        var context, lastTimeStamp = 0
        var animationFrame = function(timeStamp) {
            window.requestAnimationFrame(animationFrame)
            delta = timeStamp - lastTimeStamp
            lastTimeStamp = timeStamp

            context.setTransform(1, 0, 0, 1, 0, 0)
            context.clearRect(0, 0, canvas.width, canvas.height)

            callback(context, delta*0.001)
        }

        if (typeof (canvas.getContext) !== undefined) {
            context = canvas.getContext('2d')
            animationFrame(0)
        }
    }

    exports.start = function(id, rootNode) {
        makeGame(id, function(context, delta) {
            rootNode._update(delta)
            rootNode._draw(context)
        })
    }

})(typeof exports === 'undefined'? this['nodetree']={}: exports)