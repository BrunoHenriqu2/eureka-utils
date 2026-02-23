import { urlToFile } from "../api/fileAPI.js"

export default class Jpeg {
    quality: number = .7
    fileName: string = "file.jpeg"
    heigh?: number | undefined = undefined
    width: number = 800

    constructor(blob: Blob, info: Jpeg | Record<string, any> = {}) {
        this.quality = info.quality || this.quality
        this.fileName = info.fileName || this.fileName
        this.heigh = info.heigh || this.heigh
        this.width = info.width || this.width

        new Promise((resolve, reject) => {
            const fileReader = new FileReader

            fileReader.onload = (e) => {
                const img_url = e.target?.result
                const img = document.createElement("img")
                img.src = img_url
                
                img.onload = (event) => {
                    const canvas = document.createElement("canvas")
                    const ratio = info.width / event.target?.width

                    canvas.width = info.width
                    canvas.height = event.target?.height * ratio

                    const ctx = canvas.getContext("2d")
                    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)

                    const resizedImgUrl = canvas.toDataURL("image/jpeg", this.quality) //console.log(resizedImgUrl)
                    let newFile = urlToFile(resizedImgUrl, `${info.fileName}`)

                    resolve(newFile)
                }
            }
            fileReader.onerror = (err) => {
                fileReader.abort()
                reject(new DOMException(`Cannot read the file! ${err}`))
            }
            fileReader.readAsDataURL(blob)
        })
    }
}