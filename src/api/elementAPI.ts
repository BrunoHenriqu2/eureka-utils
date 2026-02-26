export const version = "1.0.0"

export function addAttributes(element: HTMLElement, attributes: Record<string, any>) {
    if (!element) throw new Error(`the first argument must be a ${HTMLElement.name}!`)

    for (let attributeKey in attributes) {
        try { element.setAttribute(`${attributeKey}`, `${attributes[attributeKey]}`) } catch (err) { console.log(err) }
    }
}

export function removeAttributes(element: HTMLElement, attributes: string[]) {
    if (!element) throw new Error(`the first argument must be a ${HTMLElement.name}!`)

    attributes.forEach(attribute => {
        try { element.removeAttribute(`${attribute}`) } catch (err) { console.log(err) }
    })
}

export function findFirstAncestor(element: HTMLElement, ancestorInfo: { tag: string, attributes?: Record<string, any> } = { tag: "DIV" }) {
    if (!(element instanceof HTMLElement)) throw new Error(`The first argument must a be a ${HTMLElement.name}!`)

    let ancestor = element.parentElement

    for (let i = 0; i < 1000 && ancestor; i++) { // O loop não vai travar se não achar o antepassado em 1000 iterações (ancestor, in english :3).
        if (ancestor.tagName === ancestorInfo.tag.toUpperCase()) {
            if (ancestorInfo.attributes) {
                for (const [key, v] of Object.entries(ancestorInfo.attributes)) {
                    if ((ancestor as any)[key] !== v) continue
                }
            }

            break
        } else {
            ancestor = element.parentElement
        }
    }

    return ancestor
}

export function loadBeforeHTML(element: HTMLElement, beforeHTML: string, beforeRegex: RegExp) {
    if (!beforeRegex) { throw new Error("Regex must be defined!" + beforeRegex) } //console.log(element.innerHTML)    
    element.innerHTML = element.innerHTML.replace(beforeRegex, `${beforeHTML}${beforeRegex.source}`)
}

export function loadAfterHTML(element: HTMLElement, afterHTML: string, afterRegex: RegExp) {
    if (!afterRegex) { throw new Error("Regex must be defined! " + afterRegex) }
    element.innerHTML = element.innerHTML.replace(afterRegex, `${afterRegex.source}${afterHTML}`)
}

export function loadBefore(beforeElement: HTMLElement, nodeToAdd: HTMLElement) {
    if (!(beforeElement instanceof HTMLElement) || !(nodeToAdd instanceof HTMLElement)) {
        throw new Error(`${beforeElement} and ${nodeToAdd} must be a ${HTMLElement.name}!`)
    }
    beforeElement.parentElement?.insertBefore(nodeToAdd, beforeElement)
}

export function loadAfter(afterElement: HTMLElement, elementToAdd: HTMLElement) {
    if (!(afterElement instanceof HTMLElement) || !elementToAdd) {
        throw new Error(`${afterElement} e ${elementToAdd} must be a ${HTMLElement.name}!`)
    }

    const nextSibling = afterElement.nextSibling

    if (!nextSibling) {
        afterElement.parentElement?.appendChild(elementToAdd)
    } else {
        nextSibling.parentElement?.insertBefore(elementToAdd, nextSibling)
    }
}

export default {
    version,
    addAttributes,
    findFirstAncestor,
    loadBeforeHTML,
    loadAfterHTML,
    loadBefore,
    loadAfter,
}