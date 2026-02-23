export default {
    version: "1.0.0",

    /**
     * Wait for a designed time
     * @param duration Time in seconds
     * @returns Promise
     */
    async wait(duration?: number) {
        const ms = duration && typeof duration === "number" ? duration * 1000 : 16.67

        return new Promise(resolve => {
            if (typeof window !== "undefined" && ms === 16.67) {
                requestAnimationFrame(() => resolve(true))
            } else {
                setTimeout(() => resolve(true), ms)
            }
        })
    },
    
    /**
     * "Schedule" a task to execute after the designed time as elapsed
     * @param duration Time in seconds
     * @param f Function
     * @returns Promise
     */
    async delay(duration?: number, f?: Function) {
        const ms = duration && typeof duration === "number" ? duration * 1000 : 16.67 * 1000
        if (typeof f !== "function") return
        
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true)
                 f()
            }, ms)
        })
    },
}