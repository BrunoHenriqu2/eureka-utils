export declare interface canvasObj {
    text?: string,
    position?: "center" | {x: string, y: string}
    font?: string,
    maxWidth? : number,
}

/**
 * Write any rect in the designed canvas
 */
export declare function writeIn(canvas: HTMLCanvasElement, textObj: canvasObj)

/**
 * erase any rect in the designed canvas position
 */
export declare function erase(canvas: HTMLCanvasElement, position: canvasObj["position"])