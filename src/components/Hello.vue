<template>
  <div class="hello">
    <h1>Solr Query builder</h1>
    <search-builder></search-builder>
  </div>
</template>

<script>
  import SearchBuilder from './searchBuilder/searchBuilder'
  export default {
    components: {
      SearchBuilder
    },
    name: 'hello',
    data () {
      return {
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
