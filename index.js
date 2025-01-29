
var frame = document.getElementById("frame")

var t = document.createElement("p").preset({ parent:frame })

Data.tools = {
    "mikoban" : ["puzzlescript"], // "https://kuixz.itch.io/mikoban"
    "snowsweeper" : ["godot"],  // "https://github.com/Kuixz/snowsweeper",
    "cellulart" : ["html","css","js"], // "https://chromewebstore.google.com/u/1/detail/pjeenahidnpjaajbiidagnackjdhnlam",
    "1938" : ["scratch"], // "https://scratch.mit.edu/projects/976714957/",
    "ppuc" : ["sheets"], // "https://docs.google.com/spreadsheets/d/1GE0s8OBatUyo3ICzEWXUQysuhQN0hQPImIxt-zzS9ys/edit?usp=sharing",
    "cantor" : ["desmos"],  // "https://www.desmos.com/calculator/singorvcyg",
    "dh5a" : "",
    "aaz": ["sheets"]
}

const layers = [
    [[["snowsweeper", 20, 30, 0.52, -3]],[["mikoban", 65, 40, 0.52, 10]],,],
    [[["cantor",44,24,0.6],["1938",18,8,0.6,-31]],,],
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