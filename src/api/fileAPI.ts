export const version = "1.0.0"

export function urlToFile(url: string, name: string = "file.jpeg"): Promise<File> {
    if (!url || typeof url !== "string") { throw new Error("Invalid url arg") }

    return new Promise(resolve => {
        const arr = url.split(",")
        const data = arr[1]
        const mimeMatch = arr[0]?.match(/:(.*?);/)
        if (!mimeMatch || !data) throw new Error("Error while matching mime and data")

        const mime = mimeMatch[1]
        const dataString = atob(data)

        let n = dataString.length
        let dataArr = new Uint8Array(dataString.length)

        while (n--) { dataArr[n] = dataString.charCodeAt(n) }
        const file = new File([dataArr], name, { type: mime as string })

        resolve(file)
    })
}

export function urlToFileSync(url: string, name: string = "file.jpeg") {
    if (!url || typeof url !== "string") { throw new Error("Invalid url arg") }

    const arr = url.split(",")
    const data = arr[1]
    const mimeMatch = arr[0]?.match(/:(.*?);/)
    //if (!mimeMatch || !data) throw new Error("Error while matching mime and data")

    const mime = mimeMatch[1]
    const dataString = atob(data)

    let n = dataString.length
    let dataArr = new Uint8Array(dataString.length)

    while (n--) { dataArr[n] = dataString.charCodeAt(n) }
    const file = new File([dataArr], name, { type: mime as string })

    return file
}

export default {
    version,
    urlToFile,
    urlToFileSync,
}