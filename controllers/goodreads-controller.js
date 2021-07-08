const axios = require('axios').default
const parseXml = require('xml2js').parseStringPromise

class Goodreads {
  constructor () {
    this.baseUrl = process.env.GOODREADS_URL
    this.apiKey = process.env.GOODREADS_API_KEY
  }

  /*
    * Search goodreads for the given 'q' string against any field
    */
  async searchBooks (query) {
    const url = `${this.baseUrl}search/index.xml`
    const params = {
      q: query.q,
      page: query.page,
      key: this.apiKey,
      search: query.search
    }

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
