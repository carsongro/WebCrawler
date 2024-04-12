const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test('using https://blog.boot.dev/path/', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})

test('using https://blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path')
})

test('using http://blog.boot.dev/path/', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})

test('using http://blog.boot.dev/path/', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})