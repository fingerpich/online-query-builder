<template>
  <div class="hello">
    <head-menu></head-menu>
    <!--<img src="./../assets/logo.png">-->
    <!--<h1>Solr Query builder</h1>-->
    <query-builder></query-builder>
  </div>
</template>

<script>
  import QueryBuilder from './queryBuilder/queryBuilder.vue'
  import services from '../services/service'
  import headMenu from './HeadMenu.vue'
  export default {
    components: {
      QueryBuilder, headMenu
    },
    name: 'queryEditor',
    data () {
      return {}
    },
    created () {
      if (this.$route.params.id) {
        services.getAQuery(this.$route.params.id).then(function () {

        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
