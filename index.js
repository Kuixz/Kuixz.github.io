// document.body.style.color = "blue"
let axis = 100

var t = document.getElementById("caption")
var frame = document.getElementById("frame")
var barrel = document.getElementById("barrel")
var fade = (function(){
    var f = document.createElement("div")
    f.id = "fade"
    return f
    // return 1
})()
var innerFade = (function(){
    var f = document.createElement("div")
    f.id = "inner-fade"
    return f
    // return 1
})()

let shelves = 5
let segment = (2 * Math.PI) / (2 * shelves)

barrel.appendChild(fade)
fade.style.zIndex = shelves

barrel.appendChild(innerFade)
innerFade.style.zIndex = Math.ceil(shelves / 2)
// var innerFade = 
// t.textContent = fade
// document.onerror = function(e) {
//     t.textContent = e
// }

var layer0 = new HoverShelf([["flag", -100], ["mikoban", 100]], 0)
// var layer0 = new HoverShelf([["flag", -320], ["flag", 0], ["flag", 320]], 0)
// var layer1 = new HoverShelf([["mikoban", -320], ["mikoban", 0], ["mikoban", 320]], 1)
// var layer2 = new HoverShelf([["flag", -320], ["flag", 0], ["flag", 320]], 2)
// var layer3 = new HoverShelf([["mikoban", -320], ["mikoban", 0], ["mikoban", 320]], 3)
// var layer4 = new HoverShelf([["flag", -320], ["flag", 0], ["flag", 320]], 4)

var layers = [layer0]
// var layers = [layer0, layer1, layer2]
// var layers = [layer0, layer1, layer2, layer3, layer4]


var duration = 400;
var zero = 0
var theta = 0
var baseTheta = 0
var targetTheta = 0
var diff = 0

document.addEventListener("keydown", (e) => {
    // t.textContent += ` ${e.code}`;
    if (!['KeyS', 'ArrowDown'].includes(e.code)) { return }
    // start = timeStamp;
    targetTheta = targetTheta + 2 * segment
    // zero = timeStamp
    baseTheta = theta
    diff = targetTheta - theta
    // if (animating) { return }
    // animating = true
    // shift(timeStamp)
    window.requestAnimationFrame(firstFrame);
});



// var animating = false
// // requestAnimationFrame(firstFrame);
function firstFrame(timeStamp) {
    zero = timeStamp;
    shift(timeStamp);
}
function shift(timeStamp) {
    const value = (timeStamp - zero) / duration
    theta = baseTheta + value * (targetTheta - baseTheta)
    if (value < 1) {
        // t.textContent = theta
        for (const layer of layers) {
            layer.rotate(theta)
        }
        requestAnimationFrame((t) => shift(t));
    } // else element.style.opacity = 1; 
    else {
        for (const layer of layers) {
            layer.rotate(targetTheta)
        }
    }
}
  
// t.textContent = "ccc"
// document.addEventListener("scroll", (event) => {
//     t.textContent = window.scrollY
// });

// onscroll = (event) => {};

// document.body.appendChild(g)
// document.body.style.color = white

// Lets make it WALL E!