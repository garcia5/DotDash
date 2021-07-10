/**
 * Helper to get the values we care about out of the JSONified XML
 */
const flattenValue = (obj) => {
  if (obj[0]?.$?.nil === 'true') {
    return null
  }
  return obj[0]._ ?? obj[0]
}

module.exports = { flattenValue }
