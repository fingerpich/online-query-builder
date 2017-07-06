import axios from 'axios'

const serverURL = 'api/'
class RestResource {
  errors=[]
  getFields () {
    return axios.get(serverURL + 'dynamic_fields', {withCredentials: true})
      .then(response => {
        response.data.items.map((field) => {
          field.key = field.value = field.name
        })
        return response.data.items
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
  getGroupByFields () {
    // Use vue-resource or any other http library to send your request
  }
  getResult (queryID) {
    return axios.get(serverURL + 'dynamic_load?report_id=' + queryID)
      .then(response => {
        // JSON responses are automatically parsed.
        return response.data.items
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
  getReports () {
    return axios.get(serverURL + 'dynamic_reports?user_id=1')
      .then(response => {
        // JSON responses are automatically parsed.
        return response.data.items
      })
      .catch(e => {
        this.errors.push(e)
      })
    // Use vue-resource or any other http library to send your request
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
