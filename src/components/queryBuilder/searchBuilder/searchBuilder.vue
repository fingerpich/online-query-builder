<template>
  <div>
    <div class="operatorGenerator">
      <operator-builder v-on:operatorChange="queryChanged" :json-data="initialData.jsonQuery"></operator-builder>
    </div>
    <div class="generatedQuery">
      {{this.initialData.query}}
    </div>
  </div>
</template>

<script>
  import operatorBuilder from './operatorBuilder/operatorBuilder'
  import * as databaseServices from '../../../services/database'
  export default {
    components: {
      operatorBuilder
    },
    props: {
      initialData: Object
    },
    created () {

    },
    methods: {
      queryChanged: function () {
        this.initialData.query = databaseServices.extractSearchQuery(this.initialData.jsonQuery)
      }
    },
    name: 'searchBuilder',
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .generatedQuery{
    margin: 40px 0 0;
    padding: 10px;
    color: #969696;
    font-family: monospace;
    font-size: 12px;
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
        height:calc(100% - 42px);
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
        border: 1px solid lighten($borderColor,3%);
        margin: 3px 0 0;
        display: block;
      }
      .newItem{
        display:flex;
        .operatorScope{
          &::before{
            background: lighten($borderColor,5%);
          }
          width:42px;
        }
        .addSubqueryButton {

        }
      }
    }
  }
</style>
