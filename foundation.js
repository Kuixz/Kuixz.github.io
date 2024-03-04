
// let hpi = Math.PI / 2



function createHoverElement(obj) {
    var img = new Image()
    img.src = "icons/" + obj + ".png"
    img.classList.add("hoverable")
    img.classList.add("tray")
    // img.onload = function() {

    // }
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
class HoverBucket {
    // theta = 0
    sprite = undefined
    x = 0

    constructor(obj, x = 0) {
        this.sprite = createHoverElement(obj)
        this.x = x
        // t.textContent = parent
        // parent.appendChild(this.sprite)
        // this.shelf = shelf
    }
    offset(theta) {
        this.sprite.style.left = (320 + this.x) + (0.1 * this.x * (Math.cos(theta) - 1)) + "px"
    }
}
class HoverShelf {
    container = undefined
    index
    sprites = []

    constructor(arr, index) {
        var container = document.createElement("div")
        barrel.appendChild(container)
        container.classList = "hover-container"
        arr.map((obj) => { 
            var next = new HoverBucket(...obj) 
            // t.textContent = next.sprite
            container.appendChild(next.sprite)
            next.sprite.onclick = (e) => {
                t.textContent = this.container.style.zIndex
            }
            this.sprites.push(next)
        })
        this.container = container
        this.index = index
    }
    rotate(theta) {
        this.local_rotate(theta + this.index * 2 * segment)
    }
    local_rotate(theta) {
        this.container.style.top = axis + 100 * Math.sin(theta) + "px"
        var layer = Math.round((theta / segment) % (2 * shelves))
        var zindex = shelves - Math.min(layer, 2 * shelves - layer)
        this.container.style.zIndex = zindex

        for (const sprite of this.sprites) {
            sprite.offset(theta)
        }
        // this.container.textContent = zindex
    }
}
