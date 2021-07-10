const flattenValue = (obj) => {
  if (obj[0]?.$?.nil === 'true') {
    return null
  }
  return obj[0]._ ?? obj[0]
}

module.exports = { flattenValue }
