const { test, expect } = require("@jest/globals")
const { normalizeURL, getURLsFromHTML } = require("./crawl.js")

test("normalizeURL returns properly with https", () => {
  const url = "https://blog.boot.dev/path"
  const expected = "blog.boot.dev/path"
  expect(normalizeURL(url)).toBe(expected)
})

test("normalizeURL returns properly with CAPS", () => {
  const url = "https://blog.BOOT.dev/path"
  const expected = "blog.boot.dev/path"
  expect(normalizeURL(url)).toBe(expected)
})

test("normalizeURL returns properly with http", () => {
  const url = "http://blog.boot.dev/path"
  const expected = "blog.boot.dev/path"
  expect(normalizeURL(url)).toBe(expected)
})

test("normalizeURL returns properly with / in the end", () => {
  const url = "https://blog.boot.dev/path/"
  const expected = "blog.boot.dev/path"
  expect(normalizeURL(url)).toBe(expected)
})

test("getURLsFromURL relative URLs are converted to absolute URLs", () => {
  const string =
    '<html><body><a href="/path/dev"><span>Go to Boot.dev</span></a></body></html>'
  const baseURL = "https://blog.boot.dev"
  const expected = ["https://blog.boot.dev/path/dev"]
  expect(getURLsFromHTML(string, baseURL)).toStrictEqual(expected)
})

test("getURLsFromURL finds all URLs ", () => {
  const string =
    '<html><body><div><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></div><div><a href="https://blog.boot.dev/path"><span>Go to Boot.dev</span></a></div></body></html>'
  const baseURL = "https://blog.boot.dev"
  const expected = ["https://blog.boot.dev/", "https://blog.boot.dev/path"]
  expect(getURLsFromHTML(string, baseURL)).toStrictEqual(expected)
})
