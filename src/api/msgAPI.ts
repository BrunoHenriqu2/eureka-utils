export const version = "1.0.0"
export const error = {
    new(message: string) { throw new Error(message) },

    fromAllExistances(...arg: any) {
        const elements = [...arg]

        const sendMessage = () => {
            let message = ""
            let send = false

            for (let i = 0; i < elements.length; i++) {
                const element = elements[i]
                if (!element) send = true
                message += `${element}, `
            }

            message += "Need to be valid!"

            return { send, message }
        }

        const { send, message } = sendMessage()
        if (send) this.new(message)
    },

    // fromType(args: [{}]) {
    //     //[0] = {argv: HTMLElement}
    //     for (let i = 0; i < args.length; i++) {
    //         const e = args[i]
    //         if () {
    //             this.new(`The argument must be `)
    //             break
    //         }
    //     }
    // }
}
// error.fromType([
//     { type: HTMLElement, element: document.createElement("div") }
// ])
export const log = {
    new(message: string) { return console.log(message) }
}

export default {
    error,
    log,
}