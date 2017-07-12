<template>
  <div class="hello">
    <head-menu></head-menu>
    <div class="queryText">
      <strong>SELECT </strong>
      <a :href="'#/edit/'+$route.params.id">edit query</a>
    </div>
    <div>
      <el-table
        :data="list"
        border
        style="width: 100%">
        <el-table-column v-for="col in columns"
          :prop="col"
          :label="col"
          >
        </el-table-column>
      </el-table>
      <h1> </h1>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          v-on:current-change="changePage"
          :total="1000">
        </el-pagination>
      </div>
    </div>
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
    methods: {
      changePage: function (pageNumber) {
        window.location.hash = '#/load/' + this.$route.params.id + '/' + pageNumber
      }
    },
    watch: {
      '$route': function () {
        services.getQueryResult(this.$route.params.id).then(function (results) {
          this.list = results
        }.bind(this))
      }
    },
    created () {
      services.getQueryResult(this.$route.params.id).then(function (results) {
        if (results) {
          this.list = results
          this.columns = Object.keys(results[0])
        }
      }.bind(this))
    },
    data () {
      return {
        list: [],
        columns: []
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

</style>
