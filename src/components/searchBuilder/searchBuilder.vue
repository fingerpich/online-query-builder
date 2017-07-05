<template>
  <div>
    <!--<button>add</button>-->
    <operator-builder :json-data="query"></operator-builder>
    <!--<field-query ></field-query>-->
  </div>
</template>

<script>
  import operatorBuilder from './operatorBuilder/operatorBuilder'
//  import FieldQuery from './operatorBuilder/fieldQuery/FieldQuery.vue'
  export default {
    components: {
      operatorBuilder
    },
    name: 'searchBuilder',
    data () {
      return {
        query: {operator: '', query: ''},
        msg: 'webkojikna to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
