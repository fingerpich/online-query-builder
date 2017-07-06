import Vue from 'vue'
import FieldQuery from './fieldQuery/FieldQuery.vue'
export default Vue.component('operator-builder', {
  components: {
    FieldQuery
  },
  template: `
    <div class="operator">
      <div class="operatorScope">
        <el-button v-on:click="removeSubquery" v-if="!jsonData.root" type="text" class="closeButton">×</el-button>
        <el-radio-group v-model="jsonData.operator" v-if="hasSubQuery">
          <el-radio-button label="OR" key="OR"></el-radio-button>
          <el-radio-button label="AND" key="AND"></el-radio-button>
        </el-radio-group>
        <el-checkbox-button v-else label="NOT" key="NOT"></el-checkbox-button>
        <el-button v-on:click="addSubquery" type="text" class="addButton">+</el-button>
      </div>
      <ul v-if="hasSubQuery">
        <li v-for="q in jsonData.subQueries">
          <sub-operator-builder v-on:operatorChange="onChange" :json-data="q"></sub-operator-builder>
        </li>
      </ul>
      <div v-else>
        <field-query v-on:change="onChange" :query="jsonData.query"></field-query>
      </div>
    </div>
  `,
  computed: {
    hasSubQuery: function () {
      return this.jsonData.subQueries &&
        this.jsonData.subQueries.length
    }
  },
  name: 'sub-operator-builder',
  props: {
    jsonData: Object
  },
  data () {
    return {
    }
  },
  methods: {
    onChange: function () {
      this.$emit('operatorChange')
    },
    getQuery: function () {
      if (this.hasSubQuery) {
        let res = []
        for (var i in this.$children) {
          res.push(this.$children[i].getQuery())
        }
        res.join(this.jsonData.operator)
        return res
      } else {
        return this.jsonData.operator + this.jsonData.query.q
      }
    },
    addSubquery: function () {
      if (!this.hasSubQuery) {
        Vue.set(this.jsonData, 'operator', 'AND')
        Vue.set(this.jsonData, 'subQueries', [{operator: '', query: this.jsonData.query}])
        Vue.set(this.jsonData, 'query', '')
      }
      this.jsonData.subQueries.push({operator: '', query: {field: '', operator: '', input: ''}})
    },
    removeSubquery: function () {
      if (!this.hasSubQuery) {
        this.$emit('removeMe')
      }
    }
  }
})
