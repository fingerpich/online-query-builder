<template>
  <div class="hello">
    <head-menu></head-menu>
    <div class="queryText">
      <a :href="'#/edit/'+$route.params.id">edit query</a>
    </div>
    <div>
      <el-table
        :data="list"
        border
        style="width: 100%"
        height="250">
        <el-table-column
          prop="title"
          label="title"
          >
        </el-table-column>
        <el-table-column
          prop="content"
          label="content"
          >
        </el-table-column>
        <el-table-column
          prop="published_date"
          label="published_date"
          >
        </el-table-column>
        <el-table-column
          prop="tag"
          label="tag"
          >
        </el-table-column>
        <el-table-column
          prop="keyword"
          label="keyword"
          >
        </el-table-column>
        <el-table-column
          prop="alexa_score"
          label="alexa score"
          >
        </el-table-column>
        <el-table-column
          prop="google_score"
          label="google score"
        ></el-table-column>
        <el-table-column
          prop="category"
          label="category"
        ></el-table-column>
      </el-table>
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
    created () {
      services.getResult(this.$route.params.id).then(function (results) {
        this.list = results
      }.bind(this))
    },
    data () {
      return {
        list: []
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
