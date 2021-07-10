const axios = require('axios').default
const parseXml = require('xml2js').parseStringPromise
const Work = require('../models/work')

class Goodreads {
  constructor () {
    this.baseUrl = process.env.GOODREADS_URL
    this.apiKey = process.env.GOODREADS_API_KEY
  }

  async searchBooksTest (query) {
    const url = `${this.baseUrl}search/index.xml`
    const response = await axios.get(url, { params: { ...query, key: this.apiKey } })
    console.log(response.data)
    return response.data
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
      // Pull out the matching 'works' into a flatter data model
      const results = GoodreadsResponse.search[0].results[0].work
      return results ? Work.arrayFromApi(results) : []
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

module.exports = Goodreads
