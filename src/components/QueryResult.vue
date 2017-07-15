<template>
  <div class="hello">
    <head-menu>
      <a :href="'#/edit/'+$route.params.id" class="editQuery">تغییر گزارش</a>
    </head-menu>
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
      editQuery: function () {
        this.$router.push({ name: 'edit', params: { id: this.$route.params.id } })
      },
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
  .queryText{
    padding: 20px;
  }
  .editQuery{
    padding: 0 10px;
    text-decoration: none;
  }
</style>
