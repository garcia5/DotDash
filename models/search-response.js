const { flattenValue } = require('../utils')
const Work = require('./work')

/**
 * Response model for /search endpoint. Returns a page of (20) Works
 * as well as the total number of works
 */
class SearchResponse {
  constructor (
    totalResults,
    works
  ) {
    this.totalResults = totalResults
    this.works = works
  }

  static fromApi (searchResults) {
    const totalResults = flattenValue(searchResults['total-results'])
    const unparsedWorks = searchResults.results[0].work
    const works = unparsedWorks ? Work.arrayFromApi(unparsedWorks) : []
    return new SearchResponse(
      totalResults,
      works
    )
  }
}

module.exports = SearchResponse
