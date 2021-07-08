const axios = require('axios').default
const parseXml = require('xml2js').parseStringPromise

class Goodreads {
  constructor () {
    this.baseUrl = process.env.GOODREADS_URL
    this.apiKey = process.env.GOODREADS_API_KEY
  }

  /**
    * Search Goodreads for the given query string. Optionally pass a field to
    * search against, as well as a result page to return
    */
  async searchBooks (query, page, search) {
    const url = `${this.baseUrl}search/index.xml`
    const params = { q: query, page, search, key: this.apiKey }

    try {
      const response = await axios.get(url, { params })
      const { GoodreadsResponse } = await parseXml(response.data)

      // Keep only search result objects
      const results = GoodreadsResponse.search[0].results

      return results
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

module.exports = Goodreads
