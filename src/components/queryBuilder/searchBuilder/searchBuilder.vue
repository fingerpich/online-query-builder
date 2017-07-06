<template>
  <div>
    <div class="operatorGenerator">
      <operator-builder v-on:operatorChange="queryChanged" :json-data="query"></operator-builder>
    </div>
    <div class="generatedQuery">
      {{this.generatedQuery}}
    </div>
  </div>
</template>

<script>
  import operatorBuilder from './operatorBuilder/operatorBuilder'
  function generateQuery (jsonData) {
    if (jsonData.subQueries) {
      return jsonData.subQueries.map((subQuery) => { return generateQuery(subQuery) }).join(' ' + jsonData.operator + ' ')
    } else {
      return jsonData.operator + jsonData.query.q
    }
  }
  export default {
    components: {
      operatorBuilder
    },
    methods: {
      queryChanged: function () {
        this.generatedQuery = generateQuery(this.query)
      }
    },
    events: {
      getQuery: function () {
        return this.generatedQuery
      }
    },
    name: 'searchBuilder',
    data () {
      return {
        generatedQuery: '',
        query: {operator: '', query: {field: '', operator: '', input: ''}, root: true}
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .generatedQuery{
    padding: 40px 0 0;
  }
  .operatorGenerator{
    display: flex;
    justify-content: center;
  }
  .operator{
    display: flex;
    flex-direction: row;
    .operatorScope{
      display: flex;
      padding: 0 5px;
      align-items: center;
      border-right: 1px solid #e6e6e6;
      .el-radio-button__inner,.el-checkbox-button span{
        padding:5px;
      }
      .el-radio-button:not(.is-active) span,.el-checkbox-button:not(.is-checked) span{
        color:rgba(0,0,0,0.25);
        border:none;
      }
      .el-button{
        width:35px;
      }
      .operatorSelector{
        width: 80px
      }
    }
    ul{
      list-style: none;
      margin:0;
      li{
        display: block;
        padding: 2px;
        margin: 0;
      }
    }
  }
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
