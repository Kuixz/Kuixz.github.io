
var frame = document.getElementById("frame")


var item1 = new HoverIcon("snowsweeper", 10, 10, 0.7, -3)
var item2 = new HoverIcon("mikoban", 60, 0, 0.7, 10)
var layer0 = new Shelf(740, [[item1],,[item2],,])
// layer0 = [[item1],[item2]]
// var layer1 = new Shelf(740, [1,2,3])
// var layer2 = new Shelf(740, [1,2,3,4])
// var layer3 = new Shelf(740, [1,2,3])
// var layer4 = new Shelf(740, [1,2])
// var layer0 = new HoverShelf([["flag", -320], ["flag", 0], ["flag", 320]], 0)
// var layer1 = new HoverShelf([["mikoban", -320], ["mikoban", 0], ["mikoban", 320]], 1)
// var layer2 = new HoverShelf([["flag", -320], ["flag", 0], ["flag", 320]], 2)
// var layer3 = new HoverShelf([["mikoban", -320], ["mikoban", 0], ["mikoban", 320]], 3)
// var layer4 = new HoverShelf([["flag", -320], ["flag", 0], ["flag", 320]], 4)

var layers = [layer0,[,,,],[,,,,],[,,,],[,,,,]]
// layers = [layer0,[,]]
// var layers = [layer0,[[["snowsweeper", 10, 10, 0.7, -3]],,[["snowsweeper", 10, 10, 0.7, -3]],,],]
// var layers = [layer0, layer1, layer2]
// var layers = [layer0, layer1, layer2, layer3, layer4]

// t.textContent = "2"
var barrel = new WheelBarrel(740, 420, layers)
// document.body.appendChild(barrel.element)
frame.appendChild(barrel.element)
barrel.rotate(0)
// t.textContent = "4"

document.addEventListener("keydown", (e) => {
    // t.textContent += ` ${e.code}`;
    if (['KeyS', 'ArrowDown'].includes(e.code)) { 
        barrel.scroll("down")
    }
    if (['KeyW', 'ArrowUp'].includes(e.code)) { 
        barrel.scroll("up")
    }
});
