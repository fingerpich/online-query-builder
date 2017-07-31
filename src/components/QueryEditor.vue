<template>
  <div class="hello">
    <head-menu></head-menu>
    <query-builder></query-builder>
  </div>
</template>

<script>
  import QueryBuilder from './queryBuilder/queryBuilder.vue'
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
    }
  }
</script>

<style scoped>

</style>
