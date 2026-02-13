export default {
    async delay(seconds, f) {
        const ms = seconds && typeof seconds === "number" ? seconds * 1000 : 33.33

        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true)
                if (typeof f === "function") f()
            }, ms)
        })
    },
}