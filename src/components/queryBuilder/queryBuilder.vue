<template>
  <div class="queryBuilder">
    <div class="level">
      <h4>انتخاب منبع اطلاعاتی</h4>
      <div>
        <el-select v-model="query.source" placeholder="Select a source" v-on:change="onSourceChanged">
          <el-option key="jam" label="جام" value="jam"></el-option>
          <el-option key="ashna" label="آشنا" value="ashna"></el-option>
        </el-select>
      </div>
      <div style="margin:20px"></div>
      <div>
        <el-select v-if="isAshna" v-model="query.source_content" placeholder="source content">
          <el-option key="page"     label="صفحه" value="page"></el-option>
          <el-option key="user"     label="کاربر" value="user"></el-option>
          <el-option key="post"     label="پست" value="post"></el-option>
          <el-option key="comment"  label="کامنت" value="comment"></el-option>
          <el-option key="group"    label="گروه" value="group"></el-option>
        </el-select>
      </div>
    </div>

    <div class="level">
      <h4>جستجو بر اساس</h4>
      <search-builder :query="query.query"></search-builder>
    </div>

    <div class="level sort">
      <h4>مرتب سازی</h4>
      <el-switch
        v-model="query.sort_type"
        on-color="#13ce66"
        on-text="▽"
        off-text="△"
        off-color="#ff4949">
      </el-switch>
      <el-select v-model="query.sort_fields" multiple placeholder="Select">
        <el-option
          v-for="item in fields"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="level group">
      <h4>گروه بندی</h4>
      <el-select v-model="query.groupBy" multiple placeholder="Select">
        <el-option
          v-for="item in fields"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <!--<div class="level outputFields" style="align-items: flex-start">-->
      <!--<el-transfer-->
        <!--v-model="query.selected_fields"-->
        <!--:render-content="renderFunc"-->
        <!--:titles="['fields', 'selected']"-->
        <!--:button-texts="['To left', 'To right']"-->
        <!--:footer-format="{-->
      <!--noChecked: '${total}',-->
      <!--hasChecked: '${checked}/${total}'-->
    <!--}"-->
        <!--@change="handleChange"-->
        <!--:data="fields">-->
        <!--<el-button class="transfer-footer" slot="left-footer" size="small">Operation</el-button>-->
        <!--<el-button class="transfer-footer" slot="right-footer" size="small">Operation</el-button>-->
      <!--</el-transfer>-->
    <!--</div>-->

    <div class="level">
      <div style="padding:20px"></div>
      <el-input placeholder="query name" v-model="query.report_name" style="width:initial"></el-input>
      <el-button v-on:click="save" type="primary">ذخیره</el-button>
    </div>
  </div>
</template>

<script>
  import SearchBuilder from './searchBuilder/searchBuilder'
  import services from '../../services/service'
  export default {
    components: {
      SearchBuilder
    },
    computed: {
      isAshna () {
        return this.query.source === 'ashna'
      }
    },
    name: 'queryBuilder',
    methods: {
      save: function () {
        services.saveQuery(this.query)
      },
      onSourceChanged: function (e) {
        this.query.sort_type = 'asc'
        this.query.sort_fields = []
        this.query.groupBy = []
        if (this.query.source === 'jam') {
          this.query.source_content = 'document'
        } else {
          this.query.source_content = 'page'
        }
        this.query.selected_fields = []
      }
    },
    created () {
      services.getFields().then(function (fields) {
        this.fields = fields
      }.bind(this))
    },
    data () {
      return {
        query: { report_name: '', sort_type: 'asc', sort_fields: [], groupBy: [], source: 'jam', source_content: 'document', query: {}, selected_fields: [] },
        fields: [{label: 'id', value: '_id'}, {label: 'name', value: '_name'}]
      }
    }
  }
</script>

<style lang="scss">
  .level{
    padding:50px;
    min-height: 150px;
    margin:10px;
    border-top: 1px solid #e5e5e5;
  }
</style>
