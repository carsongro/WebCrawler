function normalizeURL(url) {
    const oldURL = new URL(url)
    const hostname = oldURL.hostname
    const pathname = oldURL.pathname
    let newURL = `${hostname}${pathname}`
    if (newURL.slice(-1) === '/') {
        newURL = newURL.slice(0, -1)
    }
    return newURL.toLowerCase()
}

module.exports = {
    normalizeURL
}