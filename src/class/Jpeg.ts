import { urlToFile } from "../api/fileAPI.js"

export default class Jpeg {
    quality: number = .7
    name: string = "file.jpeg"
    width: number = 800
    file: File | undefined = undefined
    url: string | undefined = undefined

    constructor(info: Jpeg | Record<string, any> = {}) {
        this.quality = info.quality || this.quality
        this.name = info.name || this.name
        this.width = info.width || this.width
    }

    // Humph! Use um método async em vez de fazer bagunça no constructor
    async process(blob: Blob) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()

            fileReader.onload = (e) => {
                const img_url = e.target?.result
                const img = document.createElement("img")
                img.src = img_url as string

                img.onload = async() => {
                    const canvas = document.createElement("canvas")
                    const ratio = this.width / img.width

                    canvas.width = this.width
                    canvas.height = img.height * ratio

                    const ctx = canvas.getContext("2d")
                    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)

                    const resizedImgUrl = canvas.toDataURL("image/jpeg", this.quality)
                    const newFile = await urlToFile(resizedImgUrl, this.name)

                    if (!resizedImgUrl.startsWith("data:image")) {
                        throw new Error("Canvas failed to generate a valid image")
                    }

                    this.url = resizedImgUrl
                    this.file = newFile

                    URL.revokeObjectURL(img.src)
                    resolve(this)
                }
            }

            fileReader.onerror = () => reject(new Error("Error while reading blob"))
            fileReader.readAsDataURL(blob)
        })
    }
}