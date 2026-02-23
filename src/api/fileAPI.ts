export const version = "1.0.0"

export function urlToFile(url: string, name: string = "file.jpeg") {
    if (!url || typeof url !== "string") { throw new Error("Invalid url was passed") }
    
    return new Promise(resolve => {
        const arr = url.split(",")

        const mime = arr[0].match(/:(.*?);/)[1]
        const data = arr[1]

        const dataString = atob(data)

        let n = dataString.length
        let dataArr = new Uint8Array(dataString.length)

        while (n--) { dataArr[n] = dataString.charCodeAt(n) }
        const file = new File([dataArr], name, { type: mime })

        resolve(file)
    })
}

export function urlToFileSync(url: string, name: string = "file.jpeg") {
    if (!url || typeof url !== "string") { throw new Error("Invalid url as passed") }

    const arr = url.split(",")

    const mime = arr[0].match(/:(.*?);/)[1]
    const data = arr[1]

    const dataString = atob(data)

    let n = dataString.length
    let dataArr = new Uint8Array(dataString.length)

    while (n--) { dataArr[n] = dataString.charCodeAt(n) }
    const file = new File([dataArr], name, { type: mime })

    return file
}

export default {
    version,
    urlToFile,
}