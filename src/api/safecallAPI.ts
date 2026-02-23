import task from "./taskAPI.js"

export const version = "1.0.0"

/**
 * Execute a designed function and capture any errors, returning the sucess and they results
 * @param f Any function
 * @returns sucess, result
 */
export async function pcall(f: Function): Promise<{sucess: boolean, result: any | null}> {
    const _f = typeof f === "function"? f : () => console.log("\"f\" must be valid!")
    
    let sucess, result = undefined

    try {
        sucess = true
        result = await _f()
    } catch (err) {
        sucess = false
        result = err
    }

    return { sucess, result }
}

/**
 * Execute a designed function. If any error as captured, them try execute the function more {times} times
 * @param f Any function
 * @param times Amount of attempts
 * @returns any
 */
export async function retry(f: Function, times: number): Promise<any> {
    const _times = times || 1
    const _f = typeof f === "function"? f : () => console.log("\"f\" must be valid!")

    let { sucess, result } = await pcall(f)

    if (!sucess) {
        console.log(sucess, result)
        
        for (let attempts = 0; attempts < _times; attempts++) {
            await task.wait(1)
            console.log(`Trying more ${_times - attempts} times`)
            ;({sucess, result} = await pcall(f))
            if (sucess) break
        }
    }

    return result
}

export default {
    version,
    pcall,
    retry,
}