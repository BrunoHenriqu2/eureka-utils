export const version = "1.0.1"

export async function urlToFile(url: string, name = "file.jpeg") {
    if (!url || typeof url !== "string") throw new Error("Invalid url arg")

    try {
        // Note: Fetch can read data:image/
        const response = await fetch(url)
        const blob = await response.blob()

        return new File([blob], name, {type: blob.type})
    } catch (error: any) {
        throw new Error("Error while converting url to File: " + error.message)
    }
}

export function urlToFileSync(url: string, name: string = "file.jpeg") {
    if (!url || typeof url !== "string") { throw new Error("Invalid url arg") }

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

    return file
}

export default {
    version,
    urlToFile,
    urlToFileSync,
}