const printReport = (pages) => {
  console.log("\n\nStarting Report")
  const sortedPages = sortPages(pages)

  for (let page of sortedPages) {
    console.log(`Found ${page[1]} internal links to ${page[0]}`)
  }
}

const sortPages = (pages) => {
  const entries = Object.entries(pages)
  entries.sort((x, y) => y[1] - x[1])
  return entries
}

module.exports = {
  printReport,
  sortPages,
}
