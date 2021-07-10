const axios = require('axios').default
const parseXml = require('xml2js').parseStringPromise
const SearchResponse = require('../models/search-response')

class Goodreads {
  constructor () {
    this.baseUrl = process.env.GOODREADS_URL
    this.apiKey = process.env.GOODREADS_API_KEY
  }

  /**
    * Search Goodreads for the given query string. Optionally pass a field to
    * search against, as well as a result page to return
    */
  async searchBooks (searchStr, pageNum, searchField) {
    const url = `${this.baseUrl}search/index.xml`
    const params = { q: searchStr, page: pageNum, search: searchField, key: this.apiKey }

    try {
      const response = await axios.get(url, { params })
      const { GoodreadsResponse } = await parseXml(response.data)
      const results = GoodreadsResponse.search[0]
      return SearchResponse.fromApi(results)
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

module.exports = Goodreads
