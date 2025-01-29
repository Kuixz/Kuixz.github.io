
Element.prototype.preset = function(attrs, parent = null) {
    for (const [attr, value] of Object.entries(attrs)) { 
        this.setAttribute(attr, value)
    }; 
    if (parent) { parent.appendChild(this) }
    return this 
}

async function loadInto(target, kw) {
    const url = `/subpages/${kw}/page.html`
    const response = await fetch(url, {
        cache: "default"
    })
    if(!response.ok) { 
        target.innerHTML = "<p>Under construction... check back soon!</p>"
        return
    }
    const html = await response.text()
    // console.log(await response.text())
    convertedHTML = html.replaceAll('replace href="', `href="subpages/${kw}/`).replaceAll(`replace src="`, `src="subpages/${kw}/`)
    target.innerHTML = convertedHTML
}

// todo: might be faster to adjust html text rather than dom
// function adjustRelativeHTML(target, kw) {
//     const adjustmentTargets = target.querySelectorAll("[relative]")
//     console.log(adjustmentTargets)
//     adjustmentTargets.forEach((elem) => {
//         // if (elem.getAttribute("href")) {
//         //     elem.href = `/subpages/${kw}/${elem.href.slice(2)}`
//         //     console.log(`Adjusted href to /subpages/${kw}/${elem.href.slice(2)}`)
//         // }
//         // if (elem.getAttribute("src")) {
//         //     elem.src = `/subpages/${kw}/${elem.src.slice(2)}`
//         //     console.log(`Adjusted src to /subpages/${kw}/${elem.src.slice(2)}`)
//         // }
//     })
// }

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

var bucketWidth = 165  // 216 144
var bucketAspectRatio = 1.2
// var bucketHeight = 137  // 180 120
root.style.setProperty("--bucket-width", bucketWidth)
root.style.setProperty("--bucket-aspect-ratio", bucketAspectRatio)
// root.style.setProperty("--bucket-height", bucketHeight)

// class Project {
//     link
//     tools
//     constructor(link, tools) {
//         this.link = link
//         this.tools = tools
//     }
// }
const tools = {
    "mikoban" : ["puzzlescript"], // "https://kuixz.itch.io/mikoban"
    "snowsweeper" : ["godot"],  // "https://github.com/Kuixz/snowsweeper",
    "cellulart" : ["html","css","js"], // "https://chromewebstore.google.com/u/1/detail/pjeenahidnpjaajbiidagnackjdhnlam",
    "1938" : ["scratch"], // "https://scratch.mit.edu/projects/976714957/",
    "ppuc" : ["sheets"], // "https://docs.google.com/spreadsheets/d/1GE0s8OBatUyo3ICzEWXUQysuhQN0hQPImIxt-zzS9ys/edit?usp=sharing",
    "cantor" : ["desmos"],  // "https://www.desmos.com/calculator/singorvcyg",
    "dh5a" : "",
    "aaz": ["sheets"]
}

const Viewportal = {
    barrel: undefined,
    flattened: null,

    init(barrel) {
        Viewportal.barrel = barrel
        window.addEventListener("resize", function() {
            // console.log(window.innerWidth)
            // console.log(window.innerHeight)
            // if (window.innerWidth <= 600 && flattened === false) {
            //     barrel.flatten()
            // } else if (window.innerWidth > 600 && flattened === true) {
            //     barrel.unflatten()
            // }
            Viewportal.check_flatness(window.innerWidth)
        })
        Viewportal.check_flatness(window.innerWidth)
    },
    check_flatness(innerWidth) {
        if (innerWidth <= 600 && this.flattened !== true) {
            this.barrel.flatten()
        } else if (innerWidth > 600 && this.flattened !== false) {
            this.barrel.unflatten()
        }
    }
}

const Selector = {
    spacer : document.createElement("div").preset({ style:"visibility: hidden" }),
    unravel: document.getElementById("unravel"),
    // spacer : setAttributes(document.createElement("div"),{ style:"visibility: hidden" }),
    selected : undefined,

    onclick(icon) {
        if (!this.selected) {
            this.select(icon)
            this.extend()
            return
        }
        if (icon != this.selected) {
            this.deselect()
            this.select(icon)
            return
        }
        this.deselect()
        this.retract()
    },
    select(icon) {
        // root.style.setProperty("--selected-icon-resize", icon.size * 1.5)  // Goofy workaround, why!?
        var scaleOverride = Number(icon.element.style.width.slice(0,-1)) * 1.7
        // console.log(Number(icon.element.style.width.slice(0,-1)) * 1.5)
        root.style.setProperty("--selected-icon-resize", scaleOverride + "%")  // Goofy workaround, why!?
        icon.element.classList.add("float")
        this.flash(icon.element)

        icon.element.insertAdjacentElement("beforebegin", this.spacer)
        hoverCenter.appendChild(icon.element)

        this.selected = icon
        // this.extend()
        this.loadContent(icon.id)
    },
    deselect() {
        const icon = this.selected
        icon.element.classList.remove("float")
        this.flash(icon.element)

        // icon.return()
        this.spacer.insertAdjacentElement("beforebegin", icon.element)
        this.selected = undefined
    },
    async loadContent(id) {
        await loadInto(this.unravel, id)
        // adjustRelativeHTML(this.unravel, id)

        const h1 = this.unravel.querySelector("h1")
        for (const image of this.unravel.querySelectorAll("img")) {
            this.flash(image, 1.5)
        }
        for (const tool of tools[id]) {
            const icon = document.createElement('img').preset({ class:"tool", src:`icons/tools/${tool}.png` })
            h1.appendChild(icon)
        }
    },
    extend() {
        // console.log("extend")
        // this.unravel.classList.add("rolldown")
        // this.unravel.classList.remove("rollup")
        // this.unravel.style.transform = "translateY(100%)"
        // this.flash(this.unravel)
        this.unravel.animate(
            [{
                transform: "translateY(0%)"
            }],{
                duration: 1000,
                easing: "ease-out",
                fill: "forwards"
            }
        )
    },
    retract() {
        // console.log("retract")
        // this.unravel.classList.add("rollup")
        // this.unravel.classList.remove("rolldown")
        // this.unravel.style.transform = "translateY(0%)"
        this.unravel.animate(
            [{
                transform: "translateY(-110%)"
            }],{
                duration: 300,
                easing: "ease-out",
                fill: "forwards"
            }
        )
    },
    flash(element, brightness=2) {
        element.animate(
            [{
                filter: `contrast(0) brightness(${brightness})`
            },{
                filter: "contrast(1) brightness(1)"
            }],{
                duration: 300
            }
        )
    }
}

const d = 0 

class HoverIcon {
    element

    // parent
    id
    size

    constructor(parent, id, transformxpercent=0, transformypercent=0, size=1, rotdeg=0) {
        var element = document.createElement("img").preset({ src:`icons/projects/${id}.png`, class:"hoverable icon",  
            style:`width: ${100*size}%; transform: translate(${transformxpercent}%,${-transformypercent}%) rotate(${rotdeg}deg);` })/* scale(${size}) */
        // element.setAttribute
        element.onclick = (e) => {
            // window.open(links[id])
            // t.textContent = size
            // root.style.setProperty("--selected-icon-resize", this.size)
            Selector.onclick(this)
        }
        element.onmouseenter = function() {
            element.classList.add("hover")
        }
        element.onmouseleave = function() {
            element.classList.remove("hover")
        }

        this.element = element
        // this.parent = parent
        this.id = id
        this.size = size
    }
    // return() {
    //     this.parent.enbucket(this)
    // }
}

class Bucket { 
    element
    
    constructor(items=[]) {
        this.element = document.createElement("div").preset({ class:"bucket" })
        var wallBack = new Image(); wallBack.src = "assets/back.png"; wallBack.classList.add("wall-back"); this.element.appendChild(wallBack)
        for (const item of items) {
            // var pushable; switch (item.constructor) {
            //     case Array: pushable =
            // }
                // (item instanceof Array) ? new HoverIcon(...item) :
                // (item instanceof HoverIcon) ? item : 
            // if (item === undefined) {
            var icon = /* (item instanceof Array) ? */ new HoverIcon(this, ...item) //: item
            // } else
            // if (item instanceof Array) {
            //     var newIcon = new HoverIcon(...item)
            //     this.element.appendChild(newIcon.element)
            // }
            // else if (item instanceof HoverIcon) {
            //     this.element.appendChild(item.element)
            // }
            // this.enbucket(icon)
            this.element.appendChild(icon.element)
        }
        var wallFront = new Image(); wallFront.src = "assets/front.png"; wallFront.classList.add("wall-front"); this.element.appendChild(wallFront)
    }
    // enbucket(icon) {
    //     // this.element.appendChild(icon.element)
    //     // this.element.insertBefore(icon.element, this.element.firstChild)
    // }
}

class Shelf {  // TODO switch to using flex and justify center; support 1-bucket shelves
    element = undefined
    length
    children = []

    constructor(width, buckets) {
        const coreWidth = width * (1 - bucketWidth)
        this.element = document.createElement("div").preset({ class:"hover-shelf" })
        this.length = buckets.length
        this.axis = coreWidth / 2
        // this.spacer = coreWidth / (this.length - 1)

        // if (this.length == 1) { 
        // if (this.length < 3) { 
        //     this.element.style.justifyContent = "space-evenly" 
        // }
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
        // this.element.style.width = 100 + (2 * offset) + "%"
        // this.element.style.left = - offset + "%"
        // t.textContent = offset
        // this.element.style.transform = this.element.style.transform + ` translateX(${-offset}%)`
        this.element.style.transform = this.element.style.transform + `scale(${100 + (2*offset)}%)`
    }
    flatten(element) {
        for (const child of this.children) {
            element.appendChild(child.element)
        }
    }
    unflatten() {
        for (const child of this.children) {
            this.element.appendChild(child.element)
        }
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
        root.style.setProperty("--bucket-width", bucketWidth)
        // root.style.setProperty("--bucket-height", height * bucketHeight)
        // var coreWidth = width - bucketWidth
        const bucketHeight = bucketWidth / bucketAspectRatio
        const coreHeight = height - bucketHeight
        // const maxBuckets = Math.max(...shelves.filter((x) => x).map((arr) => arr.length))
        // t.textContent = maxBuckets
        this.element = document.createElement("div").preset({ "style":`width:${width}; height:${height}`, "class":"barrel" })
        this.childCount = shelves.length
        this.axis = coreHeight / 2
        // this.children = shelves
        this.diameter = coreHeight / 2
        this.segment = (2 * Math.PI) / (2 * this.childCount)

        document.createElement("div").preset({ style:`z-index:${this.childCount}`, class:"fade" }, this.element)
        document.createElement("div").preset({ style:`z-index:${Math.ceil(this.childCount/2)}`, class:"inner-fade" }, this.element)

        for (const shelf of shelves) {
            const pushable = (shelf === undefined || shelf instanceof Array) ? new Shelf(width, shelf) : shelf
            // if (shelf && shelf.length < maxBuckets) {
            //     pushable.element.style.justifyContent = "space-evenly"
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
    flatten() {
        for (const shelf of this.children) {
            shelf.flatten(this.element)
        }
    }
    unflatten() {
        for (const shelf of this.children) {
            shelf.unflatten()
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

