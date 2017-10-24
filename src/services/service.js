import axios from 'axios'

const serverURL = 'api/'
// const serverURL = '/api/service/kavosh_backend/'
class RestResource {
  errors = [];

  changeSourceContent (source, sourceContent) {
    this.defaultSource = source
    this.defaultContent = sourceContent
  }
  fields = {};
  getFields (source, sourceContent) {
    if (!source) source = this.defaultSource
    if (!sourceContent) sourceContent = this.defaultContent
    if (this.fields[source] && this.fields[source][sourceContent]) {
      return Promise.resolve(this.fields[source][sourceContent])
    } else {
      if (!this.fields[source]) this.fields[source] = {}
      this.fields[source][sourceContent] = axios.get(serverURL + 'dynamic_fields', {
        params: {
          source: source,
          source_content: sourceContent
        },
        withCredentials: true
      })
        .then(response => {
          response.data.json.items.map((field) => {
            field.key = field.value = field.name
            field.sortable = field.sort
            field.groupable = field.group
          })
          this.fields[source][sourceContent] = response.data.json.items
          return this.fields[source][sourceContent]
        })
        .catch(e => {
          this.errors.push(e)
        })
      return this.fields[source][sourceContent]
    }

    // value had better to be uniqe
    // type could be string | int | date
    // return Promise.resolve([
    //   {key: 'id', value: 'id', name: 'id', type: 'int', groupable: true, sortable: true},
    //   {key: 'name', value: 'name', name: 'name', type: 'string', groupable: true, sortable: true},
    //   {key: 'title', value: 'title', name: 'title', type: 'string', groupable: true, sortable: false},
    //   {key: 'content', value: 'content', name: 'content', type: 'string', groupable: true, sortable: true},
    //   {key: 'date', value: 'date', name: 'date', type: 'date', groupable: false, sortable: false},
    //   {key: 'likes', value: 'likes', name: 'likes', type: 'int', groupable: false, sortable: true},
    //   {key: 'score', value: 'score', name: 'score', type: 'int', groupable: false, sortable: false}
    // ])
  }

  getSortableFields (source, content) {
    return new Promise((resolve, reject) => {
      this.getFields(source, content).then((fields) => {
        if (!fields) this.errors.push('fields are empty')
        resolve(fields ? fields.filter((field) => field.sortable) : [])
      })
    })
  }

  getGroupableFields (source, content) {
    return new Promise((resolve, reject) => {
      this.getFields(source, content).then((fields) => {
        if (!fields) this.errors.push('fields are empty')
        resolve(fields ? fields.filter((field) => field.groupable) : [])
      })
    })
  }

  reports = null;
  getQueries (reload) {
    if (this.reports && !reload) {
      return Promise.resolve(this.reports)
    } else {
      this.reports = axios.get(serverURL + 'dynamic_reports', {
        params: {
          user_id: 1
        }
      })
        .then(response => {
          response.data.json.items.map(s => { s.name = s.reportname; s.id = s.report_id })
          this.reports = response.data.json.items
          return this.reports
        })
        .catch(e => {
          this.errors.push(e)
        })
      return this.reports
    }
    // return Promise.resolve([
    //   {id: 1, name: 'importants'},
    //   {id: 2, name: 'related with'},
    //   {id: 3, name: 'conservatives'},
    //   {id: 4, name: 'today'},
    //   {id: 5, name: 'important in last month'}
    // ])
  }

  getQuery (id) {
    // return axios.get(serverURL + 'dynamic_reports?user_id=1')
    //   .then(response => {
    //     return response.data.json
    //   })
    //   .catch(e => {
    //     this.errors.push(e)
    //   })
    const filteredReport = this.reports.filter((report) => report.id === id)
    return Promise.resolve(filteredReport.length ? filteredReport[0] : {})
    // return Promise.resolve({'report_name': 'popularity', 'sort_type': 'asc', 'sort_fields': ['likes'], 'groupBy': ['date'], 'source': 'source2', 'source_content': 'post', 'selected_fields': [], 'search': {'jsonQuery': {'operator': 'AND', 'query': '', 'root': true, 'subQueries': [{'operator': 'OR', 'query': '', 'subQueries': [{'operator': '', 'query': {'field': 'content', 'operator': 'contain', 'input': 'mojtaba', 'q': 'content : *mojtaba*'}}, {'operator': '', 'query': {'field': 'content', 'operator': 'contain', 'input': 'fingerpich', 'q': 'content : *fingerpich*'}}]}, {'operator': '', 'query': {'field': 'likes', 'operator': 'gt', 'input': '20', 'q': 'likes : [ 20 TO * ] '}}]}, 'query': ' (  ( content : *mojtaba* OR content : *fingerpich* )  AND likes : [ 20 TO * ]  ) '}})
  }

  getQueryResult (queryID, page) {
    return axios.get(serverURL + 'dynamic_load', {
      params: {
        id: queryID,
        page_number: page,
        page_size: 10
      }
    })
      .then(response => {
        if (response.data.json) {
          return {
            query: response.data.json.items[0],
            name: response.data.json.items[0].reportname,
            list: response.data.json.items[2],
            totalPages: response.data.json.items[1]['total page']
          }
        } else {
          return {error: 1}
        }
      })
      .catch(e => {
        this.errors.push(e)
      })
  }

  getSources () {
    return Promise.resolve([
      {label: 'جام', value: 'jaam', content: [{label: 'اسناد', value: 'document'}]},
      {label: 'آشنا', value: 'ashna', content: [{label: 'صفحات', value: 'page'}, {label: 'کاربران', value: 'user'}, {label: 'پست ها', value: 'post'}, {label: 'کامنت ها', value: 'comment'}, {label: 'گروه ها', value: 'group'}]}
    ])
  }
  getAQuery (id) {
    return axios.get(serverURL + 'dynamic_reports', {
      params: {
        user_id: 1,
        id: id
      }
    })
      .then(response => {
        response.data.json.json.items.map(s => { s.name = s.reportname; s.id = s.report_id })
        const query = response.data.json.json.items[0]
        // deserialize
        query.sort = {
          fields: query.sort_fields,
          isAscending: query.sort_type === 'asc'
        }
        query.selected_fields = query.output_fields
        query.source_content = query.content
        query.search = {
          query: query.query_string,
          jsonQuery: query.query_json
        }
        return query
      })
      .catch(e => {
        this.errors.push(e)
      })
  }

  saveQuery (query) {
    query = JSON.parse(JSON.stringify(query))
    console.log(query)
    query.sort_fields = query.sort.fields
    // query.content = query.source_content
    // delete query.source_content
    query.sort_type = query.sort.isAscending ? 'asc' : 'desc'
    query.output_fields = query.selected_fields
    query.string_query = query.search.query
    query.json_query = query.search.jsonQuery

    delete query.sort
    delete query.selected_fields
    delete query.search

    query.user_id = 1
    return axios.get(serverURL + 'dynamic_save', {params: query})
      .then(response => {
        return response
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}

const services = new RestResource()
export default services
