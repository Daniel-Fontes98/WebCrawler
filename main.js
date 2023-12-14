const { argv } = require("node:process")
const { crawlPage } = require("./crawl.js")
const { printReport } = require("./report.js")

async function main() {
  if (argv.length < 3 || argv.length > 3) {
    console.error("Usage: npm run start BASE_URL")
    return
  }

  console.log(`Web crawler starting at ${argv[2]} `)
  const pages = []
  await crawlPage(argv[2], argv[2], pages)
  printReport(pages)
}

main()
