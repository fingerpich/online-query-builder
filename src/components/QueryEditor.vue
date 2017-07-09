<template>
  <div class="hello">
    <head-menu></head-menu>
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

<style scoped>

</style>
