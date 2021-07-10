const { flattenValue } = require('../utils')

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
    ratingsCount,
    thumbnail,
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
    this.thumbnail = thumbnail
  }

  static arrayFromApi (unparsedWorks) {
    return unparsedWorks.map(w => Work.fromApi(w))
  }

  static fromApi (unparsedWork) {
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
    const bookInfo = best_book[0]
    const thumbnail = flattenValue(bookInfo.small_image_url)
    const title = flattenValue(bookInfo.title)
    const author = bookInfo.author[0]
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
      ratingsCount,
      thumbnail
    )
  }
}

module.exports = Work
