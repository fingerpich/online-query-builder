import Vue from 'vue'
import FieldQuery from './fieldQuery/FieldQuery.vue'
export default Vue.component('operator-builder', {
  components: {
    FieldQuery
  },
  computed: {
    hasSubQuery: function () {
      return this.jsonData.subQueries &&
        this.jsonData.subQueries.length
    }
  },
  template: `
    <div>
      <button v-on:click="addSubquery">add</button>
      <span>{{ jsonData.operator }}</span>
      <ul v-if="hasSubQuery">
        <li v-for="q in jsonData.subQueries">
          <sub-operator-builder :json-data="q"></sub-operator-builder>
        </li>
      </ul>
      <div v-else>
        <field-query :query="jsonData.query"></field-query>
      </div>
    </div>
  `,
  name: 'sub-operator-builder',
  props: {
    jsonData: Object
  },
  data () {
    return {
    }
  },
  methods: {
    addSubquery: function () {
      if (!this.hasSubQuery) {
        Vue.set(this.jsonData, 'operator', 'AND')
        Vue.set(this.jsonData, 'subQueries', [{operator: '', query: this.jsonData.query}])
        Vue.set(this.jsonData, 'query', '')
      }
      this.jsonData.subQueries.push({operator: '', query: ''})
    }
  }
})
