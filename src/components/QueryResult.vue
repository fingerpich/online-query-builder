<template>
  <div class="queryResult">
    <head-menu>
      <a :href="'#/edit/'+$route.params.id" class="editQuery">تغییر گزارش</a>
    </head-menu>
    <div class="queryContainer">
      <div v-if="list">
        <h3>{{reportName}}</h3>
        <div class="reportQuery">
          {{reportQuery}}
        </div>
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
      <div v-else class="tableSubstitude">
        <div v-if="error">
          {{error}}
        </div>
        <div v-else class="loader"></div>
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
              this.reportQuery = results.query.query_string
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
  .tableSubstitude{
    min-height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .loader,
    .loader:after {
      border-radius: 50%;
      width: 10em;
      height: 10em;
    }
    .loader {
      margin: 60px auto;
      font-size: 10px;
      position: relative;
      text-indent: -9999em;
      border-top: 1.1em solid rgba(103, 58, 183, 0.2);
      border-right: 1.1em solid rgba(103, 58, 183, 0.2);
      border-bottom: 1.1em solid rgba(103, 58, 183, 0.2);
      border-left: 1.1em solid #ffffff;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-animation: load8 1.1s infinite linear;
      animation: load8 1.1s infinite linear;
    }
    @-webkit-keyframes load8 {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    @keyframes load8 {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

  }
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
