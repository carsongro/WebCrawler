const { JSDOM } = require('jsdom')

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

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)
    const body = dom.window.document.querySelectorAll('a')
    let res = []
    for (let s of body) {
        let href = s.href
        if (!href.includes(baseURL)) {
            href = baseURL + href
        }
        res.push(href)
    }
    return res
}

async function crawlPage(url) {
    const response = await fetch(url)
    if (response.status >= 400) {
        console.log('Error fetching data')
        return
    }
    if (!response.headers.get('content-type').includes('text/html')) {
        console.log('Content type is not in the correct format')
        return
    }

    try {
        const html = await response.text()
        console.log(html)
    } catch(err) {
        console.log(`Error getting html body: ${err.message}`)
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}