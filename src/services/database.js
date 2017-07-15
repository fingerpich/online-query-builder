
function solrSearchQueryGenerator (jsonData) {
  if (jsonData.subQueries) {
    return ' ( ' + jsonData.subQueries.map((subQuery) => { return solrSearchQueryGenerator(subQuery) }).join(' ' + jsonData.operator + ' ') + ' ) '
  } else {
    return ((jsonData.operator === true) ? '-' : '') + jsonData.query.q
  }
}

export function extractSearchQuery (jsonData) {
  return solrSearchQueryGenerator(jsonData)
}

export function getSortQuery (fields, isAscending) {
  return 'sort = ' + fields.join(',') + ' ' + (isAscending ? 'asc' : 'desc')
}
