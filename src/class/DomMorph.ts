export default class DomMorph {
    // This means that DomMorph.STRATEGIES cannot be acessed outside
    private static readonly STRATEGIES: Record<string, (element: HTMLElement, controller: AbortController) => any> = {
        "scroll-x": (element, controller) => {
            element.addEventListener("wheel", (e) => {
                e.preventDefault()
                element.scrollBy({
                    left: e.deltaY * 1.2,
                    behavior: "smooth"
                })
            }, { signal: controller.signal })
        }
    }

    mod: "scroll-x" | "unknown"
    controller: AbortController
    element: HTMLElement
    fInfo?: any

    constructor(mod: DomMorph["mod"], element: HTMLElement | Element | null) {
        this.mod = mod || "unknown"
        this.controller = new AbortController()
        this.element = element instanceof HTMLElement ? element : document.createElement("div")

        // Access object in the same class
        const strategy = DomMorph.STRATEGIES[this.mod]
        if (strategy) this.fInfo = strategy(this.element, this.controller)
    }

    destroy() {
        this.controller.abort()
        this.element.remove()
    }
}