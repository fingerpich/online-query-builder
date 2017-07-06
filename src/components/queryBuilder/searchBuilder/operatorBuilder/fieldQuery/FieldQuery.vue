<template>
  <div class="fieldOfQuery">
    <el-select v-model="query.field" clearable placeholder="Select a field" v-on:change="onChange">
      <el-option
        v-for="field in fields"
        :key="field.value"
        :label="field.label"
        :value="field.value">
      </el-option>
    </el-select>
    <el-select v-model="query.operator" clearable placeholder="Select an operator" v-on:change="onChange">
      <el-option
        v-for="operator in operators"
        :key="operator.value"
        :label="operator.label"
        :value="operator.value">
      </el-option>
    </el-select>
    <el-input placeholder="Please input" v-on:change="onChange" v-model="query.input"></el-input>

  </div>
</template>

<script>
  export default {
    name: 'fieldQuery',
    props: ['query'],
    data () {
      return {
        matchInput: '',
        fields: [{label: 'id', value: 'id'}, {label: 'content', value: 'content'}, {label: 'date', value: 'date'}],
        operators: [
          {label: 'equal', value: '='},
          {label: 'not equal', value: '!='},
          {label: 'greater than', value: '>'},
          {label: 'less than', value: '<'},
          {label: 'contain', value: 'reg'},
          {label: 'between', value: '[]'}
        ],
        selectedOperator: '',
        selectedField: ''
      }
    },
    methods: {
      onChange: function (e) {
        this.query.q = this.query.field + this.query.operator + this.query.input
        this.$emit('change')
      }
//      getFieldQuery: function () {
//        return this.selectedField + this.matchInput + this.selectedOperator
//      }.bind(this),
//      getFieldJsonQuery: function () {
//        return {
//          field: this.selectedField,
//          input: this.matchInput,
//          operator: this.selectedOperator
//        }
//      }.bind(this)
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
