export function download(file: any, fileType: string, fileName: string) {
    const blob = new Blob([file], { type: fileType })
    const linkElement = document.createElement("a")
    linkElement.href = window.URL.createObjectURL(blob)
    linkElement.download = fileName
    document.body.appendChild(linkElement)
    linkElement.click()
    document.body.removeChild(linkElement)
    window.URL.revokeObjectURL(linkElement.href)
}