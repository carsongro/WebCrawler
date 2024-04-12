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

async function crawlPage(url, currentURL, pages) {
    const baseURLObj = new URL(url)
    const currentURLObj = new URL(currentURL)

    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normalizedURL = normalizeURL(currentURL)

    if (pages[normalizedURL]) {
        pages[normalizedURL]++
        return pages
    }

    pages[normalizedURL] = 1

    console.log(`Fetching ${currentURL}`)
    const response = await fetch(currentURL)
    
    if (response.status >= 400) {
        console.log('Error fetching data')
        return pages
    }

    if (!response.headers.get('content-type').includes('text/html')) {
        console.log('Content type is not in the correct format')
        return pages
    }
    try {
        const html = await response.text()
        bodyURLs = getURLsFromHTML(html, url)
        for (bodyURL of bodyURLs) {
            pages = await crawlPage(url, bodyURL, pages)
        }
        return pages
    } catch(err) {
        console.log(`Error getting html body for ${currentURL}: ${err.message}`)
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}