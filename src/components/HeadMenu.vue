<template>
  <div>
    <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        <a href="#/">Solr Query builder</a>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">گزارش ها</template>
        <el-menu-item index="2-1" :key="report.id" v-for="report in reports">
          <a :href="'#load/' + report.id">{{report.name}}</a>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
        <a href="#/new">گزارش جدید+</a>
      </el-menu-item>
      <el-menu-item index="4">
        <slot></slot>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import services from '../services/service'
  export default {
    computed: {},
    name: 'headMenu',
    methods: {},
    created () {
      services.getQueries().then(function (reports) {
        this.reports = reports
      }.bind(this))
    },
    data () {
      return {
        reports: []
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-menu-item {
    padding: 0;
    a{
      padding:0 5px;
      display: block;
      text-decoration: none;
    }
  }
</style>
