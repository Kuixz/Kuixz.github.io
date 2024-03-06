const setAttributes = (node, attrs) => { 
    for (const [attr, value] of Object.entries(attrs)) { 
        switch (attr) {
            case "parent": value.appendChild(node);  break;
            default: node.setAttribute(attr, value); break;
        }
    }; 
    return node 
}
const mod = (n,m) => ((n % m) + m) % m
// class Flag {
//     state = false
//     get up() { return this.state }
//     get down() { return !this.state }

//     constructor(state = false) {
//         this.state = state
//     }
//     raise() { this.state = true }
//     lower() { this.state = false }
// }

const root = document.querySelector(":root");
var bucketWidth = 144
var bucketHeight = 120
root.style.setProperty("--bucket-width", bucketWidth)
root.style.setProperty("--bucket-height", bucketHeight)

const links = {
    "mikoban" : "https://kuixz.itch.io/mikoban",
    "snowsweeper" : "https://github.com/Kuixz/snowsweeper",
    "cellulart" : "https://chromewebstore.google.com/u/1/detail/pjeenahidnpjaajbiidagnackjdhnlam",
    "1938" : "https://scratch.mit.edu/projects/976714957/",
    "ppuc" : "https://docs.google.com/spreadsheets/d/1GE0s8OBatUyo3ICzEWXUQysuhQN0hQPImIxt-zzS9ys/edit?usp=sharing",
    "cantor" : "https://www.desmos.com/calculator/singorvcyg",
    "DH5a" : ""
}
// let data = [
//     [],[],[],[],[]
// ]

function createHoverElement(obj) {
    var img = new Image()
    img.src = "icons/" + obj + ".png"
    img.classList.add("hoverable")
    img.classList.add("tray")
    img.onclick = function() {
        // t.textContent = obj
        window.open(links[obj])
    }
    img.onmouseenter = function() {
        // t.textContent = "hover"
        img.classList.add("hover")
    }
    img.onmouseleave = function() {
        // t.textContent = "unhover"
        img.classList.remove("hover")
    }
    frame.appendChild(img)

    // t.textContent = "c"
    return img
}

class HoverIcon {
    element

    constructor(id, transformxpercent=0, transformypercent=0, size=1, rotdeg=0) {
        var element = setAttributes(document.createElement("img"), { src:`icons/${id}.png`, class:"hoverable tray", 
            style:`transform: scale(${size}) translate(${transformxpercent}%,${transformypercent}%) rotate(${rotdeg}deg);` })
        element.onclick = function() {
            // t.textContent = obj
            window.open(links[id])
        }
        element.onmouseenter = function() {
            // t.textContent = "hover"
            element.classList.add("hover")
        }
        element.onmouseleave = function() {
            // t.textContent = "unhover"
            element.classList.remove("hover")
        }

        this.element = element
    }
}

class Bucket { 
    element
    
    constructor(items=[]) {
        this.element = setAttributes(document.createElement("div"), { class:"bucket" })
        var wallBack = new Image(); wallBack.src = "assets/back.png"; wallBack.classList.add("wall-back"); this.element.appendChild(wallBack)
        for (const item of items) {
            // var pushable; switch (item.constructor) {
            //     case Array: pushable =
            // }
                // (item instanceof Array) ? new HoverIcon(...item) :
                // (item instanceof HoverIcon) ? item : 
            // if (item === undefined) {
            var pushable = (item instanceof Array) ? new HoverIcon(...item) : item
            // } else
            // if (item instanceof Array) {
            //     var newIcon = new HoverIcon(...item)
            //     this.element.appendChild(newIcon.element)
            // }
            // else if (item instanceof HoverIcon) {
            //     this.element.appendChild(item.element)
            // }
            this.element.appendChild(pushable.element)
        }
        var wallFront = new Image(); wallFront.src = "assets/front.png"; wallFront.classList.add("wall-front"); this.element.appendChild(wallFront)
    }
}

class Shelf {  // TODO switch to using flex and justify center; support 1-bucket shelves
    element = undefined
    // index = 0
    // axis
    child_count
    children = []
    // sprites = []
    // spacer

    constructor(width, buckets) {
        var coreWidth = width - bucketWidth
        this.element = setAttributes(document.createElement("div"), { class:"hover-shelf" })
        this.child_count = buckets.length
        this.axis = coreWidth / 2
        // this.spacer = coreWidth / (this.child_count - 1)

        if (this.child_count == 1) { this.element.style.justifyContent = "center" }
        for (const bucket of buckets) {
            const pushable = (bucket === undefined || bucket instanceof Array) ? new Bucket(bucket) : bucket
            // var bucket = buckets[i]
            // if (bucket === undefined) {
            //     var newBucket = new Bucket([])
            //     this.children.push(newBucket)
            //     this.element.appendChild(newBucket.element)
            // }
            // else if (bucket instanceof Array) {
            //     var newBucket = new Bucket(bucket)
            //     this.children.push(newBucket)
            //     this.element.appendChild(newBucket.element)
            // }
            // else if (bucket instanceof Bucket) {
            //     this.children.push(bucket)
            //     this.element.appendChild(bucket.element)
            // }
            this.children.push(pushable)
            this.element.appendChild(pushable.element)
        }
    }
    rotate(theta) {
        // for (var i = 0; i < this.children.length; i ++) {
        //     var bucket = this.children[i]
        //     var x = i * this.spacer
        //     // bucket.offset(theta)
        //     const left = 10 //x + (0.1 * (x - this.axis) * (Math.cos(theta) - 1)) + "px"
        //     bucket.element.style.transform = `translateX(${left}px)`
        //     // (i * this.spacer) + (0.1 * (i * this.spacer - this.axis) * (Math.cos(theta) - 1)) + "px"
        //     // + (0.1 * (i * this.spacer - axis) * (Math.cos(theta) - 1)) + "px"
        // }
        var offset = (4 * (Math.cos(theta) - 1))
        this.element.style.width = 100 + (2 * offset) + "%"
        // this.element.style.left = - offset + "%"
        // t.textContent = offset
        this.element.style.transform = this.element.style.transform + ` translateX(${-offset}%)`
    }
}

class Barrel {
    element
    childCount
    children = []

    axis
    segment
    diameter

    constructor(width, height, shelves) {
        // var coreWidth = width - bucketWidth
        var coreHeight = height - bucketHeight
        this.element = setAttributes(document.createElement("div"), { "style":`width:${width}; height:${height}`, "class":"barrel" })
        this.childCount = shelves.length
        this.axis = height / 2 - bucketHeight / 2
        // this.children = shelves
        this.diameter = coreHeight / 2
        this.segment = (2 * Math.PI) / (2 * this.childCount)

        setAttributes(document.createElement("div"), { style:`z-index:${this.childCount}`, class:"fade", parent: this.element })
        setAttributes(document.createElement("div"), { style:`z-index:${Math.ceil(this.childCount/2)}`, class:"inner-fade", parent: this.element })

        for (const shelf of shelves) {
            const pushable = (shelf === undefined || shelf instanceof Array) ? new Shelf(width, shelf) : shelf
            // if (shelf === undefined || shelf.constructor instanceof Array)
            // if (shelf === undefined || shelf instanceof Array) {
            //     shelf
            // }
            // if (shelf === undefined) {
            //     var newShelf = new Shelf(0, [])
            //     this.children.push(newShelf)
            //     this.element.appendChild(newShelf.element)
            // } else if (shelf instanceof Array) {
            //     var newShelf = new Shelf(width, shelf)
            //     this.children.push(newShelf)
            //     this.element.appendChild(newShelf.element)
            // }
            // else if (shelf instanceof Shelf) {
            //     this.children.push(shelf)
            //     this.element.appendChild(shelf.element)
            // }
            this.children.push(pushable)
            this.element.appendChild(pushable.element)
        }
    }
    rotate(theta) {
        for (var i = 0; i < this.childCount; i ++) {
            const shelf = this.children[i]
            const localTheta = theta + 2 * i * this.segment

            const top = this.axis + this.diameter * Math.sin(localTheta) + "px"
            shelf.element.style.transform = `translateY(${top})`// "translateY(20px)"

            const layer = Math.round(mod(localTheta / this.segment, 2 * this.childCount))
            const zindex = this.childCount - Math.min(layer, 2 * this.childCount - layer)
            shelf.element.style.zIndex = zindex
            // t.textContent = "3"

            shelf.rotate(localTheta)
        }
    }
}

class WheelBarrel extends Barrel {
    zero = 0
    theta = 0
    baseTheta = 0
    targetTheta = 0
    // diff = 0
    duration = 400
    processing = false
    needsRecalculation = false

    constructor(...args) {
        // this.firstFrame = this.firstFrame.bind(this)
        // this.shift = this.shift.bind(this)
        super(...args)
    }
    scroll(direction) {
        if (direction == "down") { 
            this.targetTheta = this.targetTheta + 2 * this.segment
        } else if (direction == "up") { 
            this.targetTheta = this.targetTheta - 2 * this.segment
        }
        // this.diff = this.targetTheta - this.theta
        // if (this.processing) { return }
        // window.requestAnimationFrame(this.firstFrame)
        this.needsRecalculation = true
        if (!this.processing) { this.processing = true; window.requestAnimationFrame(this.shift) }
        // window.requestAnimationFrame()
    }
    // firstFrame = function (timeStamp) {
    //     // t.textContent = timeStamp
    //     // t.textContent = this
    //     this.baseTheta = this.theta
    //     this.zero = timeStamp;
    //     // if (!this.processing) { 
    //     // window.cancelAnimationFrame(this.animation)
    //     // this.shift(timeStamp) 
    //     // }
    //     // if (this.processing) { return }
    //     // this.processing = true
    //     // this.animation = this.shift(timeStamp);
    //     this.shift(timeStamp);
    // }.bind(this)
    shift = function(timeStamp) {
        if (this.needsRecalculation) {
            this.baseTheta = this.theta
            this.zero = timeStamp;
            this.needsRecalculation = false;
        }
        const value = (timeStamp - this.zero) / this.duration
        this.theta = this.baseTheta + value * (this.targetTheta - this.baseTheta)
        if (value < 1) {
            this.rotate(this.theta)
            // this.animation = requestAnimationFrame(this.shift);
            requestAnimationFrame(this.shift);
        } else {
            this.theta = this.targetTheta
            this.rotate(this.targetTheta)
            this.processing = false
        }
    }.bind(this)
}