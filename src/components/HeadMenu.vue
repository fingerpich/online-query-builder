<template>
  <div>
    <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">Solr Query builder</el-menu-item>
      <el-submenu index="2">
        <template slot="title">Queries</template>
        <el-menu-item index="2-1" v-for="report in reports">
          <a :href="'#load/' + report.id">{{report.name}}</a>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
        <a href="#/new">New+</a>
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
      services.getReports().then(function (reports) {
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
