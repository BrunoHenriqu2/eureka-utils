// export const leftPosition = 0 // The position is relative, so I can't do that, despite being more easier.

export const version = "1.0.0"

export function writeIn(canvas, textObj) {
    if (!(canvas instanceof Node) || canvas.nodeName !== "CANVAS") { return console.log("no canvas detected!") }

    const positions = {
        "center": {x: canvas.width / 2, y: canvas.height / 2}
    }
    const _textObj = {
        text: textObj.text || "Hello World",
        position: typeof textObj.position == "string" && positions[textObj.position] ? positions[textObj.position] : {x: 0, y: 0},
        font: textObj.font || "16px arial",
        maxWidth: textObj.maxWidth
    }

    const ctx = canvas.getContext("2d")
    
    ctx?.fillText(_textObj.text, _textObj.position.x, _textObj.position.y, _textObj.maxWidth)
}

export function erase(canvas, position) {
    if (!(canvas instanceof Node) || canvas.nodeName !== "CANVAS") { return console.log("no canvas detected!") }

    canvas.getContext("2d")?.clearRect(0, 0, position?.x || canvas.width, position?.y || canvas.height)
}