// Liked this script? Well, fell free to use it! No judgement. //

export const version = "1.0.0"

export async function pcall(f) {
    if (typeof f !== "function") { return console.log("\"f\" must be valid!") }
    
    let sucess, result = undefined

    try {
        sucess = true
        result = await f()
    } catch (err) {
        sucess = false
        result = err
    }

    return { sucess, result }
}

export async function retry(f, times) {
    const _times = times || 1

    if (typeof f !== "function") { return console.log("\"f\" must be valid!") }

    let { sucess, result } = await pcall(f)

    if (!sucess) {
        console.log(sucess, result)
        
        for (let attempts = 0; attempts < _times; attempts++) {
            if (sucess) { break }        
            console.log(`Trying more ${_times - attempts} times`)
            sucess, result = await pcall(f)
        }
    }

    return result
}