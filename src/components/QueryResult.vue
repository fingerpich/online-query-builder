<template>
  <div class="queryResult">
    <head-menu>
      <a :href="'#/edit/'+$route.params.id" class="editQuery">Edit Query</a>
    </head-menu>
    <div class="queryContainer">
      <h3>{{reportName}}</h3>
      <div class="reportQuery">
        {{reportQuery}}
      </div>
      <div v-if="list">
        <div @mouseleave="mouseLeave">
          <el-table
            :data="list"
            v-on:cell-mouse-enter="cellMouseEnter"
            v-on:cell-click="cellMouseClick"
            border
            stripe
            style="width: 100%">
            <el-table-column v-for="col in columns"
                             :prop="col"
                             :label="col"
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :current-page.sync="currentPage"
            v-on:current-change="changePage"
            :total="totalPages">
          </el-pagination>
        </div>
        <div class="moreDetail">
          <h4>{{moreDetailHeader}}</h4>
          <p>{{moreDetailBody}}</p>
        </div>
      </div>
      <div v-else class="tabl">
        <div v-if="error">
          {{error}}
        </div>
        <div v-else>loading</div>
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
        this.$router.push({ name: 'QueryResultPagination', params: { id: this.$route.params.id, page: pageNumber } })
      },
      mouseLeave: function (e) {
        this.moreDetailHeader = this.clikedMoreDetailHeader
        this.moreDetailBody = this.clickedMoreDetailBody
      },
      cellMouseClick: function (row, column, cell, event) {
        if (this.selectedCell) this.selectedCell.style.background = this.selectedCell.lastBack
        this.clikedMoreDetailHeader = column.label
        this.clickedMoreDetailBody = row[column.label]
        cell.lastBack = cell.style.background
        cell.style.background = '#8af'
        this.selectedCell = cell
      },
      cellMouseEnter: function (row, column, cell, event) {
        this.moreDetailHeader = column.label
        this.moreDetailBody = row[column.label]
      },
      fetchQueryResult: function () {
        services.getQueryResult(this.$route.params.id, this.$route.params.page).then(function (results) {
          if (results) {
            if (results.list) {
              this.list = results.list
              this.reportName = results.name
              this.totalPages = results.totalPages * 10
              this.columns = Object.keys(this.list[0])
              this.reportQuery = results.query
            } else if (results.error) {
              this.error = 'loading problem'
            }
          } else {
            this.error = 'loading problem'
          }
        }.bind(this))
      }
    },
    watch: {
      '$route': function () {
        this.list = null
        this.fetchQueryResult()
      }
    },
    mounted () {
      this.fetchQueryResult()
    },
    data () {
      return {
        reportName: '',
        reportQuery: '',
        moreDetailBody: '',
        moreDetailHeader: '',
        error: '',
        totalPages: 1000,
        currentPage: this.$route.params.page,
        list: null,
        columns: []
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .queryResult{
    .queryContainer {
      margin: 10px;
      padding: 10px;
      background: #fff;
      .moreDetail{
        min-height: 200px;
        max-height: 200px;
        overflow-y: auto;
        margin:10px;
        padding: 15px;
        background: #fff;
        transition:all 0.3s ease
      }
    }
  }
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
  .el-table th>.cell {
    text-overflow: ellipsis;
    padding: 0;
    text-align: center;
    white-space: nowrap;
  }
  .el-table .cell {
    white-space: normal;
    word-break: break-all;
    line-height: 24px;
    padding: 0 3px;
    max-height: 24px;
    text-overflow: ellipsis;
  }
  .reportQuery{
    color: #aaa;
    padding: 0 0 10px;
    font-size: 12px;
  }
</style>
