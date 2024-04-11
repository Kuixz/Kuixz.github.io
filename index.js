
var frame = document.getElementById("frame")

var t = document.createElement("p").preset({ parent:frame })

// var layers = [
//     [[["snowsweeper", 10, 10, 0.7, -3]],[["mikoban", 60, 0, 0.7, 10]],,],
//     [[["cantor",44,,0.8],["1938",18,,0.9,-31]],,],
//     [,,[["ppuc",3,6,1.1,-10]],],
//     [,,],
//     [,,[["cellulart",-2,8,0.9,-30]]]]
const layers = [
    [[["snowsweeper", 20, 20, 0.52, -3]],[["mikoban", 65, 10, 0.52, 10]],,],
    [[["cantor",44,8,0.6],["1938",18,8,0.6,-31]],,],
    [,[["aaz",45,15,0.6,2]],[["ppuc",20,17,0.55,-10]],],
    [,,],
    [,,[["cellulart",20,11,0.5,-30]]]]

// t.textContent = "2"
// Unstated invariant: Width to height ratio MUST be 9:7 for correct display of icons (EDIT: Fixed (?))
// var barrel = new WheelBarrel(540, 420, layers)
var barrel = new WheelBarrel(540, 420, layers)
// var barrel = new WheelBarrel("45%", "70%", layers)
// var barrel = new WheelBarrel(750, 600, layers)
// document.body.appendChild(barrel.element)
frame.appendChild(barrel.element)
barrel.rotate(0)
// t.textContent = "4"
Viewportal.init(barrel)  // TODO: Goofy ahh workaround

document.addEventListener("keydown", (e) => {
    // t.textContent += ` ${e.code}`;
    if (['KeyS', 'ArrowDown'].includes(e.code)) { 
        barrel.scroll("down")
    }
    if (['KeyW', 'ArrowUp'].includes(e.code)) { 
        barrel.scroll("up")
    }
});

// t.textContent = "f"
// var f = new Flag()
// t.textContent = f.up
// f.raise()
// t.textContent = f.up
 


// const plat = document.createElement("div").preset({ class:"platform" }, frame)
// document.createElement("img").preset({ src:"assets/platform_top.png", class:"platsprite" }, plat)
const hoverCenter = document.getElementById("hover-center")
// document.createElement("img").preset({ src:"assets/platform_bottom.png", class:"platsprite" }, plat)