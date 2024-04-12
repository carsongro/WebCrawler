function printReport(pages) {
    console.log('==========================================')
    console.log('Begin Report')
    console.log('==========================================')

    const sortedPages = sortPages(pages)
    for (const page of sortedPages) {
        const url = page[0]
        const count = page[1]
        console.log(`Found ${count} internal links to ${url}`)
    }

    console.log('==========================================')
    console.log('End Report')
    console.log('==========================================')
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a, b) => {
        return b[1] - a[1]
    })
    return pagesArr
}

module.exports = {
    sortPages,
    printReport
}