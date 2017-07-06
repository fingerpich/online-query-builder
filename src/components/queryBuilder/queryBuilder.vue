<template>
  <div class="queryBuilder">
    <div class="level">
      <h4>انتخاب منبع اطلاعاتی</h4>
    <el-select v-model="query.source" clearable placeholder="Select a field" v-on:change="onChange">
      <el-option key="jam" label="جام" value="jam"></el-option>
      <el-option key="ashena" label="آشنا" value="ashena"></el-option>
    </el-select>
    </div>

    <div class="level">
      <h4>جستجو بر اساس</h4>
      <search-builder :query="query.query"></search-builder>
    </div>

    <div class="level sort">
      <h4>مرتب سازی</h4>
      <el-switch
        v-model="query.sortBy.type"
        on-color="#13ce66"
        on-text="▽"
        off-text="△"
        off-color="#ff4949">
      </el-switch>
      <el-select v-model="query.sortBy.fields" multiple placeholder="Select">
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
    <div class="level">
      <div style="padding:20px"></div>
      <el-input placeholder="query name" v-model="query.name" style="width:initial"></el-input>
      <el-button type="primary">ذخیره</el-button>
    </div>
  </div>
</template>

<script>
  import SearchBuilder from './searchBuilder/searchBuilder'
  export default {
    components: {
      SearchBuilder
    },
    name: 'queryBuilder',
    data () {
      return {
        query: { sortBy: {fields: [], type: 'ASC'}, groupBy: [], source: 'jam', query: {} },
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
