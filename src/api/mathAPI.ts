export const version = "1.0.0"

export function random (min: number = 0, max: number = 1) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export default {
    version,
    random,    
}