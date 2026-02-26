import { urlToFile, urlToFileSync } from "../api/fileAPI.js"

export default class Jpeg {
    quality: number = .7
    fileName: string = "file.jpeg"
    width: number = 800
    file: File | undefined = undefined
    url: string | undefined = undefined

    constructor(blob: Blob, info: Jpeg | Record<string, any> = {}) {
        this.quality = info.quality || this.quality
        this.fileName = info.fileName || this.fileName
        this.width = info.width || this.width

        const fileReader = new FileReader

        fileReader.onload = (e) => {
            const img_url = e.target?.result as string
            const img = document.createElement("img")
            img.src = img_url

            img.onload = (event) => {
                const canvas = document.createElement("canvas")
                const ratio = this.width / (event.target as HTMLImageElement).width

                canvas.width = this.width
                canvas.height = (event.target as HTMLImageElement).height * ratio

                const ctx = canvas.getContext("2d")
                ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)

                const resizedImgUrl = canvas.toDataURL("image/jpeg", this.quality) //console.log(resizedImgUrl)
                const newFile = urlToFileSync(resizedImgUrl, `${this.fileName}`)

                this.url = resizedImgUrl
                this.file = newFile
            }
        }
        fileReader.onerror = (err) => {
            fileReader.abort()
            reject(new DOMException(`Cannot read the file! ${err}`))
        }
        fileReader.readAsDataURL(blob)
    }
}