<template>
  <div>
    <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" style="float:right">
        <a href="#/">
          <div class="logo">
            <div class="logoIcon"></div>
            <div>
              <h2>سیستم تحلیلی کاوش</h2>
              <h3>
                Kavosh Analytics System
              </h3>
            </div>
          </div>
        </a>
      </el-menu-item>
      <el-submenu index="2" class="reportList">
        <template slot="title">گزارش ها</template>
        <el-menu-item index="2-1" :key="report.id" v-for="report in reports">
          <a :href="'#load/' + report.id">{{report.name}}</a>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
        <a href="#/new">گزارش جدید</a>
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

<style lang="scss">
  .logo{
    display: flex;
    flex-direction: row-reverse;
    .logoIcon{
      background: url(../assets/Kavosh-logo.png) no-repeat 100% 0;
      background-size: 44px 44px;
      position: relative;
      z-index: 90;
      right: 0;
      width: 46px;
      height: 50px;
      margin: 12px;
    }
    h2,h3{
      line-height:18px;
    }
    h2{
      margin:14px 0 0;
      font-size:18px;
    }
    h3{
      margin:3px 0;
      opacity: 0.5;
      font-size:14px;
      font-weight: 100;
    }
  }
  .el-menu-item {
    padding: 0;
    a{
      padding:0 5px;
      display: block;
      text-decoration: none;
    }
  }
  .reportList .el-menu{
    max-height: 250px;
    overflow-y: scroll;
  }
</style>
