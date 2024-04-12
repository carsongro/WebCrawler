const { arch } = require('node:process');
const { crawlPage } = require('./crawl.js')

function main() {
    if (process.argv.length !== 3) {
        console.log('Please provide just the URL')
        return
    }

    const url = process.argv[2]

    console.log(`Starting at ${url}`)
    crawlPage(url)
}

main()
