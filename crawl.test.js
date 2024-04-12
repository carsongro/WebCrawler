const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')
const { getURLsFromHTML } = require('./crawl.js')

test('using https://blog.boot.dev/path/', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toEqual('blog.boot.dev/path')
})

test('using https://blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toEqual('blog.boot.dev/path')
})

test('using http://blog.boot.dev/path/', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toEqual('blog.boot.dev/path')
})

test('using http://blog.boot.dev/path/', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toEqual('blog.boot.dev/path')
})

test('getting link from html', () => {
    const body = `
    <html>
        <body>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        </body>
    </html>
    `
    const result = getURLsFromHTML(body, 'https://blog.boot.dev')
    expect(result).toEqual(['https://blog.boot.dev/'])
})

test('getting many link from html', () => {
    const body = `
    <html>
        <body>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        </body>
    </html>
    `
    const result = getURLsFromHTML(body, 'https://blog.boot.dev')
    expect(result).toEqual(['https://blog.boot.dev/', 'https://blog.boot.dev/', 'https://blog.boot.dev/', 'https://blog.boot.dev/', 'https://blog.boot.dev/'])
})

test('getting link from html relative', () => {
    const body = `
    <html>
        <body>
            <a href="/path/"><span>Go to Boot.dev</span></a>
        </body>
    </html>
    `
    const result = getURLsFromHTML(body, 'https://blog.boot.dev')
    expect(result).toEqual(['https://blog.boot.dev/path/'])
})