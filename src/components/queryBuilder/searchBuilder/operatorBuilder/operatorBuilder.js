import Vue from 'vue'
import FieldQuery from './fieldQuery/FieldQuery.vue'
export default Vue.component('operator-builder', {
  components: {
    FieldQuery
  },
  template: `
    <div class="operator">
      <div class="operatorScope" v-bind:class="{ 'has-sub-query': hasSubQuery}">
        <el-radio-group v-model="jsonData.operator" v-on:change="onChange" v-if="hasSubQuery">
          <el-radio-button label="OR" key="OR"></el-radio-button>
          <el-radio-button label="AND" key="AND"></el-radio-button>
        </el-radio-group>
        <el-checkbox-button v-model="jsonData.operator" v-on:change="onChange" v-else label="NOT" key="not" value="-"></el-checkbox-button>
      </div>
      <ul class="subQueries" v-if="hasSubQuery">
        <li v-for="q in jsonData.subQueries">
          <sub-operator-builder v-on:removeMe="removeSubquery" v-on:operatorChange="onChange" :json-data="q"></sub-operator-builder>
        </li>
        <li class="newItem">
          <div class="operatorScope"></div>
          <el-button v-on:click="addSubquery" type="text" class="addSubqueryButton" icon="plus"></el-button>
        </li>
        
      </ul>
      <div class="aQuery" v-else>
        <field-query v-on:change="onChange" :query="jsonData.query"></field-query>
      </div>
      <div class="addRemoveQuery" v-if="!hasSubQuery">
        <el-button v-on:click="addSubquery" v-bind:disabled="!jsonData.query.operator" type="text" class="addButton" icon="share"></el-button>
        <el-button v-on:click="removeMe" v-if="!jsonData.root" type="text" class="closeButton" icon="delete"></el-button>      
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
        Vue.set(this.jsonData, 'subQueries', [{operator: this.jsonData.operator, query: this.jsonData.query}])
        Vue.set(this.jsonData, 'operator', 'AND')
        Vue.set(this.jsonData, 'query', '')
      }
      this.jsonData.subQueries.push({operator: '', query: {field: '', operator: '', input: ''}})
    },
    removeMe: function () {
      if (!this.hasSubQuery) {
        this.$emit('removeMe', this.jsonData)
      }
    },
    removeSubquery: function (e) {
      const index = this.jsonData.subQueries.indexOf(e)
      if (this.jsonData.subQueries.length === 2) {
        const child = this.jsonData.subQueries[1 - index]
        Vue.set(this.jsonData, 'subQueries', child.subQueries)
        Vue.set(this.jsonData, 'operator', child.operator)
        Vue.set(this.jsonData, 'query', child.query)
      } else {
        this.jsonData.subQueries.splice(index, 1)
      }
    }
  }
})
