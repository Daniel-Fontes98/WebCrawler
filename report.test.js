const { test, expect } = require("@jest/globals")
const { sortPages } = require("./report.js")

test("Sorted pages sorts properly", () => {
  const pages = {
    page1: 5,
    page2: 10,
    page3: 1,
  }

  const expected = [
    ["page2", 10],
    ["page1", 5],
    ["page3", 1],
  ]

  const sorted = sortPages(pages)
  expect(sorted).toStrictEqual(expected)
})
