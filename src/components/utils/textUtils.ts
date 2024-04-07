export function splitTextByInputs(str: string) {
    const regex = /{{input\d*}}/g
    const matches = str.split(regex)
    return matches
}