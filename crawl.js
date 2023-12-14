const { JSDOM } = require("jsdom")

function normalizeURL(url) {
  const urlObj = new URL(url)
  let fullPath = `${urlObj.host}${urlObj.pathname}`
  if (fullPath.length > 0 && fullPath.slice(-1) === "/") {
    fullPath = fullPath.slice(0, -1)
  }
  return fullPath
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = []
  const dom = new JSDOM(htmlBody)
  const aElements = dom.window.document.querySelectorAll("a")
  for (const aElement of aElements) {
    if (aElement.href.slice(0, 1) === "/") {
      try {
        urls.push(new URL(aElement.href, baseURL).href)
      } catch (err) {
        console.log(`${err.message}: ${aElement.href}`)
      }
    } else {
      try {
        urls.push(new URL(aElement.href, baseURL).href)
      } catch (err) {
        console.log(`${err.message}: ${aElement.href}`)
      }
    }
  }
  return urls
}

const crawlPage = async (baseURL, currentURL, pages) => {
  if (new URL(baseURL).hostname !== new URL(currentURL, baseURL).hostname) {
    return pages
  }

  const normalizedCurrent = normalizeURL(currentURL, baseURL)

  if (normalizedCurrent in pages) {
    pages[normalizedCurrent] += 1
    return pages
  }

  pages[normalizedCurrent] =
    normalizedCurrent === normalizeURL(baseURL, baseURL) ? 0 : 1

  console.log(`Crawling ${normalizedCurrent}`)

  try {
    const response = await fetch(`https://${normalizedCurrent}`, {
      method: "GET",
      mode: "cors",
    })

    if (response.status >= 400) {
      console.error("URL returned error 400+")
      return pages
    }

    if (!response.headers.get("content-type").includes("text/html")) {
      console.error("URL returned invalid content type")
      return pages
    }

    try {
      const responseBody = await response.text()
      const urls = getURLsFromHTML(responseBody, baseURL)

      for (let url of urls) {
        pages = await crawlPage(baseURL, url, pages)
      }
    } catch (err) {
      console.error(err)
      return pages
    }
  } catch (err) {
    console.log(err)
  }

  return pages
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
}
