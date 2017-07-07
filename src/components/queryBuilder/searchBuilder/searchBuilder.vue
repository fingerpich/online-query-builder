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
      return ' ( ' + jsonData.subQueries.map((subQuery) => { return generateQuery(subQuery) }).join(' ' + jsonData.operator + ' ') + ' ) '
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
    $borderColor:#ddd;
    .operatorScope{
      position: relative;
      &::before{
        content:' ';
        position:absolute;
        width:100%;
        height:1px;
        background: $borderColor;
        top:50%;
        margin:-1px 0;
      }
      &.has-sub-query::after{
        content:' ';
        position:absolute;
        width:1px;
        height:80%;
        height:calc(100% - 40px);
        background: $borderColor;
        top:20px;
        right:0;
        margin:-1px 0;
      }
      display: flex;
      padding: 0 5px 0 0;
      align-items: center;
      /*border-right: 1px solid #e6e6e6;*/
      .el-radio-button__inner,.el-checkbox-button span{
        padding:5px;
        margin:0 0 0 3px;
        border-radius:5px;
      }
      .el-radio-button:not(.is-active) span,.el-checkbox-button:not(.is-checked) span{
        color:$borderColor;
        border:none;
        /*background: none;*/
      }
      .operatorSelector{
        width: 80px
      }
    }
    .addRemoveQuery{
      .el-button{
        width:35px;
      }
    }
    ul.subQueries{
      list-style: none;
      margin:0;
      padding:0;
      li{
        display: block;
        padding: 2px 0;
        margin: 0;
      }
      .addSubqueryButton{
        width: 401px;
        background: #f5f5f5;
        margin: 3px 0 0 47px;
        display: block;
      }
    }
  }
</style>
