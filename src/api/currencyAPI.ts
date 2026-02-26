export const version = "1.0.0"

export function decodificatePtBr(value: string) {
    if (typeof value !== "string") { throw new Error("Value must be a string! Ex: '1.234,56'") }

    let conversion: string | number = value.replace(/[^\d,]/g, "")
    conversion = conversion.replace(",", ".")
    conversion = parseFloat(conversion)

    return conversion
}

export function locatePtBr(value: number) {
    return Number(value.toFixed(2)).toLocaleString("pt-br", { minimumFractionDigits: 2 })
}

export const consortium = {
    toInstallment(value: string | number, term: number, tax: number) {
        // If It's a string, the expected value is the masked version (ex: 1.200,00)
        const _value = typeof value === "string"? value = decodificatePtBr(value) : value

        let result = (_value * tax) + _value
        let full = result / term
        let half = full / 2

        return { half: locatePtBr(half), full: locatePtBr(full) }
    }
}

export default {
    version,
    locatePtBr,
    decodificatePtBr,
    consortium
}