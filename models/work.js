class Work {
  constructor (
    id,
    title,
    authorName,
    authorId,
    originalPublicationYear,
    originalPublicationMonth,
    originalPublicationDay,
    averageRating,
    ratingsCount
  ) {
    this.id = id
    this.title = title
    this.authorName = authorName
    this.authorId = authorId
    this.originalPublicationYear = originalPublicationYear
    this.originalPublicationMonth = originalPublicationMonth
    this.originalPublicationDay = originalPublicationDay
    this.averageRating = averageRating
    this.ratingsCount = ratingsCount
  }

  static arrayFromApi (toJsArray) {
    return toJsArray.map(w => Work.fromApi(w))
  }

  static fromApi (unparsedWork) {
    // Helper to flatten jsonified object
    const flattenValue = (obj) => {
      if (obj[0]?.$?.nil === 'true') {
        return null
      }
      return obj[0]._ ?? obj[0]
    }

    // Pull out initial snake_cased variables
    const {
      id,
      best_book,
      original_publication_day,
      original_publication_month,
      original_publication_year,
      average_rating,
      ratings_count
    } = unparsedWork

    // Grab the data we care about from them
    const workId = flattenValue(id)
    const title = flattenValue(best_book[0].title)
    const author = best_book[0].author[0]
    const authorName = flattenValue(author.name)
    const authorId = flattenValue(author.id)
    const pubYear = flattenValue(original_publication_year)
    const pubMonth = flattenValue(original_publication_month)
    const pubDay = flattenValue(original_publication_day)
    const avgRating = flattenValue(average_rating)
    const ratingsCount = flattenValue(ratings_count)

    return new Work(
      workId,
      title,
      authorName,
      authorId,
      pubYear,
      pubMonth,
      pubDay,
      avgRating,
      ratingsCount
    )
  }
}

module.exports = Work
