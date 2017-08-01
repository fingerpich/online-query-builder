<template>
  <div class="queryBuilder">
    <div class="level">
      <h4>انتخاب منبع اطلاعاتی</h4>
      <div>
        <el-select v-model="query.source" placeholder="Select a source" v-on:change="onSourceChanged">
          <el-option
            v-for="source in sources"
            :key="source.value"
            :label="source.label"
            :value="source.value">
          </el-option>
        </el-select>
      </div>
      <div style="margin:20px"></div>
      <div>
        <el-select v-model="query.source_content" placeholder="source content" v-on:change="onContentChange">
          <el-option
            v-for="content in contents"
            :key="content.value"
            :label="content.label"
            :value="content.value">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="level">
      <h4>جستجو بر اساس</h4>
      <search-builder :initialData="query.search"></search-builder>
    </div>

    <div class="level sort">
      <h4>مرتب سازی</h4>
      <div>
      <el-switch
        class="sortSwitch"
        v-model="query.sort.isAscending"
        on-color="#13ce66"
        on-text="▽"
        off-text="△"
        off-color="#ff4949">
      </el-switch>
      <el-select v-model="query.sort.fields" multiple placeholder="Select">
        <el-option
          v-for="item in sortable_fields"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </div>
      <div v-if="query.sort.fields.length" class="generatedQuery">
        {{this.sortQuery}}
      </div>
    </div>

    <div class="level group">
      <h4>گروه بندی</h4>
      <el-select v-model="query.groupBy" multiple placeholder="Select">
        <el-option
          v-for="item in groupable_fields"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="level">
      <el-transfer
        v-model="query.selected_fields"
        :titles="['all fields', 'output fields']"
        :data="fields">
      </el-transfer>
    </div>

    <div class="save-query-container">
      <div style="padding:20px"></div>
      <el-input placeholder="query name" v-model="query.name" style="width:initial"></el-input>
      <el-button v-on:click="save" type="primary">ذخیره</el-button>
    </div>
  </div>
</template>

<script>
  import SearchBuilder from './searchBuilder/searchBuilder'
  import services from '../../services/service'
  import * as databaseServices from '../../services/database'
  export default {
    components: {
      SearchBuilder
    },
    computed: {
      sortQuery: function () {
        return databaseServices.getSortQuery(this.query.sort.fields, this.query.sort.isAscending)
      }
    },
    name: 'queryBuilder',
    methods: {
      save: function () {
        services.saveQuery(this.query).then(function (res) {
          if (res) {
            this.$router.push({ name: 'QueryResult', params: { id: res.data } })
            services.getQueries(true)
          }
        }.bind(this))
      },
      onContentChange: function (e) {
        this.changeSourceContent()
      },
      changeSourceContent: function () {
        services.changeSourceContent(this.query.source, this.query.source_content)
        this.loadFields()
        this.query.sort_type = 'asc'
        this.query.sort_fields = []
        this.query.groupBy = []
        this.query.selected_fields = []
        this.query.search = {
          jsonQuery: {operator: '', query: {field: '', operator: '', input: ''}, root: true},
          query: ''
        }
      },
      onSourceChanged: function (e) {
        const selectedSources = this.sources.filter((source) => source.value === this.query.source)
        if (selectedSources && selectedSources[0] && selectedSources[0].content) {
          this.contents = selectedSources[0].content
          this.query.source_content = this.contents[0].value
        }
      },
      loadFields () {
        services.getFields(this.query.source, this.query.source_content).then(function (fields) {
          this.fields = fields
        }.bind(this))
        services.getSortableFields(this.query.source, this.query.source_content).then(function (fields) {
          this.sortable_fields = fields
        }.bind(this))
        services.getGroupableFields(this.query.source, this.query.source_content).then(function (fields) {
          this.groupable_fields = fields
        }.bind(this))
      }
    },
    created () {
      services.getSources().then(function (sources) {
        this.sources = sources
        this.query.source = sources[0].value
        this.contents = sources[0].content
        this.query.source_content = this.contents[0].value
        this.loadFields()
        if (this.$route.params.id) {
          services.getAQuery(this.$route.params.id).then(function (query) {
            this.query.name = query.name
            this.query.source = query.source
            this.query.source_content = query.source_content
            this.query.search.jsonQuery = query.search.jsonQuery
            this.query.search.query = query.search.query
          }.bind(this))
        }
      }.bind(this))
    },
    data () {
      return {
        contents: [],
        sources: [],
        query: {
          name: '',
          sort: {
            fields: [],
            isAscending: true
          },
          groupBy: [],
          source: '',
          source_content: '',
          selected_fields: [],
          search: {
            jsonQuery: {operator: '', query: {field: '', operator: '', input: ''}, root: true},
            query: ''
          }
        },
        fields: [],
        sortable_fields: [],
        groupable_fields: []
      }
    }
  }
</script>

<style lang="scss">
  .queryBuilder{
    width: 80%;
    padding: 2px;
    margin: 39px auto;
    border: 1px solid #d6d6d6;
    box-shadow: 0px 1px 3px 0 #999;
    background: white;
  }
  .level{
    padding: 50px;
    min-height: 200px;
    margin: 0 10px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .save-query-container{
    padding:50px 0 100px;
  }
  .sortSwitch .el-switch__core {
    background: #673ab7 !important;
    border-color: transparent !important;
  }
  .el-transfer-panel__item.el-checkbox{
    text-align: left;
  }
</style>
