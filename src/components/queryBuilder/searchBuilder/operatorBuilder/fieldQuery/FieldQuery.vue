<template>
  <div class="fieldOfQuery">
    <el-select v-model="query.field" clearable placeholder="Field" v-on:change="fieldChanged">
      <el-option
        v-for="field in fields"
        :key="field.value"
        :label="field.label"
        :value="field.value">
      </el-option>
    </el-select>
    <el-select v-bind:disabled="!query.field" v-model="query.operator" clearable placeholder="Operator" v-on:change="onChange">
      <el-option
        v-for="operator in operators"
        v-if="hasThisOperator(operator)"
        :key="operator.value"
        :label="operator.label"
        :value="operator.value">
      </el-option>
    </el-select>
    <span v-if="query.operator!='between'">
      <el-input v-bind:disabled="!query.field || !query.operator" placeholder="match" v-on:change="onChange" v-model="query.input"></el-input>
    </span>
    <span v-else>
      <el-input v-bind:disabled="!query.field" placeholder="match" v-on:change="onChange" v-model="inputFrom"></el-input>
      <el-input v-bind:disabled="!query.field" placeholder="match" v-on:change="onChange" v-model="inputTo"></el-input>
    </span>
  </div>
</template>

<script>
  import services from '../../../../../services/service'
  export default {
    name: 'fieldQuery',
    props: ['query'],
    computed: {
    },
    ready: function () {

    },
    created () {
      services.getFields().then(function (fields) {
        this.fields = fields
      }.bind(this))
    },
    updated () {
      services.getFields().then(function (fields) {
        this.fields = fields
      }.bind(this))
    },
    data () {
      return {
        inputFrom: '',
        inputTo: '',
        matchInput: '',
        fields: [{label: 'id', value: 'id', type: 'int'}, {label: 'content', value: 'content', type: 'string'}, {label: 'date', value: 'date', type: 'string'}],
        operators: [
          {label: 'equal', value: 'equal', types: 'int,string,date'},
//          {label: 'not equal', value: 'notEqual', types: 'int,string,date'},
          {label: 'greater than', value: 'gt', types: 'int,date'},
          {label: 'less than', value: 'lt', types: 'int,date'},
          {label: 'contain', value: 'contain', types: 'string'},
          {label: 'between', value: 'between', types: 'int,date'}
        ],
        selectedOperator: '',
        selectedField: ''
      }
    },
    methods: {
      hasThisOperator (operator) {
        let selectedFieldType = this.getFieldType()
        return operator.types.indexOf(selectedFieldType) > -1
      },
      getFieldType () {
        if (!this.query.field) return 'string'
        if (this.fields) {
          const filtered = this.fields.filter(function (field) {
            return field.value === this.query.field
          }.bind(this))
          if (filtered && filtered[0]) {
            return filtered[0].type
          }
        }
        return ''
      },
      fieldChanged: function (e) {
        this.query.operator = ''
        this.query.input = ''
        this.onChange(e)
      },
      onChange: function (e) {
        const fieldType = this.getFieldType()
        let output = ''
        const operator = this.query.operator
        const field = this.query.field
        const input = this.query.input

        if (operator === 'lt') {
          output = field + ' : [ * TO ' + input + ' ] '
        } else if (operator === 'gt') {
          output = field + ' : [ ' + input + ' TO * ] '
        } else if (operator === 'between') {
          output = field + ' : [' + this.inputFrom + ' TO ' + this.inputTo + ']'
        } else if (operator === 'contain') {
          output = field + ' : *' + input + '*'
        } else if (operator === 'equal') {
          output = field + ' : '
          if (fieldType === 'string') {
            output += '"' + input + '"'
          } else {
            output += input
          }
        }
        this.query.q = output
//      this.query.q = this.query.field + ' ' + this.query.operator + ' ' + this.query.input
        this.$emit('change')
      }
    },
    events: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-input,.el-select {
    width: 130px;
  }
</style>
