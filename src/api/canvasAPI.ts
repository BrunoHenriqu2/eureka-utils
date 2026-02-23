// export const leftPosition = 0 // The position is relative, so I can't do that, despite being more easier.

export interface canvasObj {
    text?: string,
    position?: "center" | {x: string, y: string}
    font?: string,
    maxWidth? : number,
}

export const version = "1.0.0"

export const positions = {
    "center": (canvas: HTMLCanvasElement) => ({x: canvas.width / 2, y: canvas.height / 2})
}

/**
 * Write any text in the designed canvas
 */
export function writeIn(canvas: HTMLCanvasElement, textObj: canvasObj) {
    if (!(canvas instanceof Node) || canvas.nodeName !== "CANVAS") { return console.log("No canvas detected!") }
    
    const _textObj = {
        text: textObj.text || "Hello, World!",
        position: typeof textObj.position == "string" && positions[textObj.position] ? positions[textObj.position](canvas) : {x: 0, y: 0},
        font: textObj.font || "16px arial",
        maxWidth: textObj.maxWidth
    }

    const ctx = canvas.getContext("2d")
    
    ctx?.fillText(_textObj.text, _textObj.position.x, _textObj.position.y, _textObj.maxWidth)
}

/**
 * Erase all rects of the designed canvas
 * @param canvas 
 * @param position 
 * @returns void
 */
export function eraseAll(canvas: HTMLCanvasElement) {
    if (!(canvas instanceof Node) || canvas.nodeName !== "CANVAS") { return console.log("No canvas detected!") }

    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height)
}

export default {
    version,
    positions,
    writeIn,
    eraseAll,
}