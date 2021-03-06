import axios from 'axios'

const serverURL = 'api/'
class RestResource {
  errors = [];

  changeSourceContent (source, sourceContent) {
    this.defaultSource = source
    this.defaultContent = sourceContent
  }
  fields = {};
  getFields (source, sourceContent) {
    // if (this.fields[source] && this.fields[source][sourceContent]) {
    //   return Promise.resolve(this.fields[source][sourceContent])
    // } else {
    //   if (!this.fields[source]) this.fields[source] = {}
    //   this.fields[source][sourceContent] = axios.get(serverURL + 'dynamic_fields', {
    //     params: {
    //       source: source,
    //       source_content: sourceContent
    //     },
    //     withCredentials: true
    //   })
    //     .then(response => {
    //       response.data.items.map((field) => {
    //         field.key = field.value = field.name
    //         field.sortable = field.sort
    //         field.groupable = field.group
    //       })
    //       this.fields[source][sourceContent] = response.data.items
    //       return this.fields[source][sourceContent]
    //     })
    //     .catch(e => {
    //       this.errors.push(e)
    //     })
    //   return this.fields[source][sourceContent]
    // }

    // value had better to be uniqe
    // type could be string | int | date
    return Promise.resolve([
      {key: 'id', value: 'id', name: 'id', type: 'int', groupable: true, sortable: true},
      {key: 'name', value: 'name', name: 'name', type: 'string', groupable: true, sortable: true},
      {key: 'title', value: 'title', name: 'title', type: 'string', groupable: true, sortable: false},
      {key: 'content', value: 'content', name: 'content', type: 'string', groupable: true, sortable: true},
      {key: 'date', value: 'date', name: 'date', type: 'date', groupable: false, sortable: false},
      {key: 'likes', value: 'likes', name: 'likes', type: 'int', groupable: false, sortable: true},
      {key: 'score', value: 'score', name: 'score', type: 'int', groupable: false, sortable: false}
    ])
  }

  getSortableFields (source, content) {
    return new Promise((resolve, reject) => {
      this.getFields(source, content).then((fields) => {
        resolve(fields.filter((field) => field.sortable))
      })
    })
  }

  getGroupableFields (source, content) {
    return new Promise((resolve, reject) => {
      this.getFields(source, content).then((fields) => {
        resolve(fields.filter((field) => field.groupable))
      })
    })
  }

  reports = null;
  getQueries (reload) {
    // if (this.reports && !reload) {
    //   return Promise.resolve(this.reports)
    // } else {
    //   this.reports = axios.get(serverURL + 'dynamic_reports', {
    //     params: {
    //       user_id: 1
    //     }
    //   })
    //     .then(response => {
    //       response.data.items.map(s => { s.name = s.reportname; s.id = s.report_id })
    //       this.reports = response.data.items
    //       return this.reports
    //     })
    //     .catch(e => {
    //       this.errors.push(e)
    //     })
    //   return this.reports
    // }
    return Promise.resolve([
      {id: 1, name: 'importants'},
      {id: 2, name: 'related with'},
      {id: 3, name: 'conservatives'},
      {id: 4, name: 'today'},
      {id: 5, name: 'important in last month'}
    ])
  }

  getQuery (id) {
    // return axios.get(serverURL + 'dynamic_reports?user_id=1')
    //   .then(response => {
    //     return response.data
    //   })
    //   .catch(e => {
    //     this.errors.push(e)
    //   })
    // const filteredReport = this.reports.filter((report) => report.id === id)
    // return Promise.resolve(filteredReport.length ? filteredReport[0] : {})
    return Promise.resolve({'report_name': 'popularity', 'sort_type': 'asc', 'sort_fields': ['likes'], 'groupBy': ['date'], 'source': 'source2', 'source_content': 'post', 'selected_fields': [], 'search': {'jsonQuery': {'operator': 'AND', 'query': '', 'root': true, 'subQueries': [{'operator': 'OR', 'query': '', 'subQueries': [{'operator': '', 'query': {'field': 'content', 'operator': 'contain', 'input': 'mojtaba', 'q': 'content : *mojtaba*'}}, {'operator': '', 'query': {'field': 'content', 'operator': 'contain', 'input': 'fingerpich', 'q': 'content : *fingerpich*'}}]}, {'operator': '', 'query': {'field': 'likes', 'operator': 'gt', 'input': '20', 'q': 'likes : [ 20 TO * ] '}}]}, 'query': ' (  ( content : *mojtaba* OR content : *fingerpich* )  AND likes : [ 20 TO * ]  ) '}})
  }

  getQueryResult (queryID, page) {
    // return axios.get(serverURL + 'load', {
    //   params: {
    //     id: queryID,
    //     page_number: page,
    //   }
    // })
    //   .then(response => {
    //     if (response.data) {
    //       return {
    //         query: response.data.query,
    //         name: response.data.name,
    //         list: response.data.list,
    //         totalPages: response.data.totalPages
    //       }
    //     } else {
    //       return {error: 1}
    //     }
    //   })
    //   .catch(e => {
    //     this.errors.push(e)
    //   })
    const arr = [
      {name: 'ascasc', content: 'wvew vewr rcasc', category: 'csvdcsv', tag: 'csvdcsv', keyword: 'cwvwv', title: 'rcwvew cwvwv', published_date: '1/2/1392', google_score: 5352321, alexa_score: 3353352},
      {name: 'vewrvw', content: 'ewer werc cwrvw', category: 'wswdwsw', tag: 'wswdwsw', keyword: 'wewew', title: 'cwewer wewew', published_date: '2/4/1392', google_score: 3532525, alexa_score: 5538532},
      {name: 'wercwe', content: 'vjhn jhni ircwe', category: 'svjcsvj', tag: 'svjcsvj', keyword: 'rvjvj', title: 'irvjhn rvjvj', published_date: '2/7/1392', google_score: 2421415, alexa_score: 4426421},
      {name: 'jhnijv', content: 'fokj okjs snijv', category: 'swowswo', tag: 'swowswo', keyword: 'nfofo', title: 'snfokj nfofo', published_date: '1/5/1392', google_score: 2321315, alexa_score: 5635321},
      {name: 'okjsdf', content: 'vmen menr rjsdf', category: 'sjmrsjm', tag: 'sjmrsjm', keyword: 'jvmvm', title: 'rjvmen jvmvm', published_date: '8/3/1392', google_score: 7871815, alexa_score: 3653871},
      {name: 'menrbv', content: 'rbvmen me enrbv', category: 'sobnsob', tag: 'sobnsob', keyword: 'nrbrb', title: 'enrbvmenrbrb', published_date: '3/9/1392', google_score: 5651615, alexa_score: 2642651},
      {name: 'wercwe', content: 'vjhn jhni ircwe', category: 'svjcsvj', tag: 'svjcsvj', keyword: 'rvjvj', title: 'irvjhn rvjvj', published_date: '2/7/1392', google_score: 2421415, alexa_score: 4426421},
      {name: 'jhnijv', content: 'fokj okjs snijv', category: 'swowswo', tag: 'swowswo', keyword: 'nfofo', title: 'snfokj nfofo', published_date: '1/5/1392', google_score: 2321315, alexa_score: 5635321},
      {name: 'okjsdf', content: 'vmen menr rjsdf', category: 'sjmrsjm', tag: 'sjmrsjm', keyword: 'jvmvm', title: 'rjvmen jvmvm', published_date: '8/3/1392', google_score: 7871815, alexa_score: 3653871},
      {name: 'menrbv', content: 'rbvmen me enrbv', category: 'sobnsob', tag: 'sobnsob', keyword: 'nrbrb', title: 'enrbvmenrbrb', published_date: '3/9/1392', google_score: 5651615, alexa_score: 2642651},
      {name: 'wercwe', content: 'vjhn jhni ircwe', category: 'svjcsvj', tag: 'svjcsvj', keyword: 'rvjvj', title: 'irvjhn rvjvj', published_date: '2/7/1392', google_score: 2421415, alexa_score: 4426421},
      {name: 'jhnijv', content: 'fokj okjs snijv', category: 'swowswo', tag: 'swowswo', keyword: 'nfofo', title: 'snfokj nfofo', published_date: '1/5/1392', google_score: 2321315, alexa_score: 5635321},
      {name: 'okjsdf', content: 'vmen menr rjsdf', category: 'sjmrsjm', tag: 'sjmrsjm', keyword: 'jvmvm', title: 'rjvmen jvmvm', published_date: '8/3/1392', google_score: 7871815, alexa_score: 3653871},
      {name: 'okjsdf', content: 'vmen menr rjsdf', category: 'sjmrsjm', tag: 'sjmrsjm', keyword: 'jvmvm', title: 'rjvmen jvmvm', published_date: '8/3/1392', google_score: 7871815, alexa_score: 3653871},
      {name: 'menrbv', content: 'rbvmen me enrbv', category: 'sobnsob', tag: 'sobnsob', keyword: 'nrbrb', title: 'enrbvmenrbrb', published_date: '3/9/1392', google_score: 5651615, alexa_score: 2642651},
      {name: 'wercwe', content: 'vjhn jhni ircwe', category: 'svjcsvj', tag: 'svjcsvj', keyword: 'rvjvj', title: 'irvjhn rvjvj', published_date: '2/7/1392', google_score: 2421415, alexa_score: 4426421},
      {name: 'jhnijv', content: 'fokj okjs snijv', category: 'swowswo', tag: 'swowswo', keyword: 'nfofo', title: 'snfokj nfofo', published_date: '1/5/1392', google_score: 2321315, alexa_score: 5635321},
      {name: 'okjsdf', content: 'vmen menr rjsdf', category: 'sjmrsjm', tag: 'sjmrsjm', keyword: 'jvmvm', title: 'rjvmen jvmvm', published_date: '8/3/1392', google_score: 7871815, alexa_score: 3653871},
      {name: 'menrbv', content: 'rbvmen me enrbv', category: 'sobnsob', tag: 'sobnsob', keyword: 'nrbrb', title: 'enrbvmenrbrb', published_date: '3/9/1392', google_score: 5651615, alexa_score: 2642651},
      {name: 'wercwe', content: 'vjhn jhni ircwe', category: 'svjcsvj', tag: 'svjcsvj', keyword: 'rvjvj', title: 'irvjhn rvjvj', published_date: '2/7/1392', google_score: 2421415, alexa_score: 4426421},
      {name: 'jhnijv', content: 'fokj okjs snijv', category: 'swowswo', tag: 'swowswo', keyword: 'nfofo', title: 'snfokj nfofo', published_date: '1/5/1392', google_score: 2321315, alexa_score: 5635321},
      {name: 'okjsdf', content: 'vmen menr rjsdf', category: 'sjmrsjm', tag: 'sjmrsjm', keyword: 'jvmvm', title: 'rjvmen jvmvm', published_date: '8/3/1392', google_score: 7871815, alexa_score: 3653871},
      {name: 'menrbv', content: 'rbvmen me enrbv', category: 'sobnsob', tag: 'sobnsob', keyword: 'nrbrb', title: 'enrbvmenrbrb', published_date: '3/9/1392', google_score: 5651615, alexa_score: 2642651},
      {name: 'wercwe', content: 'vjhn jhni ircwe', category: 'svjcsvj', tag: 'svjcsvj', keyword: 'rvjvj', title: 'irvjhn rvjvj', published_date: '2/7/1392', google_score: 2421415, alexa_score: 4426421},
      {name: 'jhnijv', content: 'fokj okjs snijv', category: 'swowswo', tag: 'swowswo', keyword: 'nfofo', title: 'snfokj nfofo', published_date: '1/5/1392', google_score: 2321315, alexa_score: 5635321}
    ]
    return Promise.resolve(
      {
        query: 'title : *fingerpich*',
        name: 'fingerpich',
        list: arr.filter((a) => {
          return Math.random() > 0.5
        }).slice(0, 10),
        totalPages: 220
      })

    // const filteredReport = this.reports.filter((report) => report.id === id)
    // return Promise.resolve(filteredReport.length ? filteredReport[0] : {})
  }

  getSources () {
    return Promise.resolve([
      {label: 'source1', value: 'source1', content: [{label: 'document', value: 'document'}]},
      {label: 'source2', value: 'source2', content: [{label: 'page', value: 'page'}, {label: 'user', value: 'user'}, {label: 'post', value: 'post'}, {label: 'comment', value: 'comment'}, {label: 'group', value: 'group'}]}
    ])
  }

  saveQuery (query) {
    console.log(query)
    return axios.post(serverURL + 'save', query)
      .then(response => {
        console.log(response)
        return response
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}

const services = new RestResource()
export default services
