<template>
  <div>
    <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" style="float:right">
        <div>
          <a class="logo" href="/dashboard" title="داشبورد">
            <h2 class="title">سیــستم تحلــیلی کــاوش</h2>
            <span class="en-title">Kavosh Analytics System</span>
            <span class="ictLogo"></span>
          </a>
        </div>
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
    position: absolute;
    width: 218px;
    height: 45px;
    right: 0;
    top: 13px;
    .ictLogo {
      background: url('../assets/Kavosh-logo.png') no-repeat top right ;
      background-size: 44px 44px;
      position:absolute;
      margin-right: 0.5rem;
      z-index: 90;
      right: 0;
      width: 44px;
      height: 44px;
    }
    .title,.en-title {
      color: #fff;
      margin: -3px 0 0 0;
      line-height: 1.6rem;
      font-size: 1rem;
      top: 0;
      position: absolute;
      right: 55px;
      text-align: center;
      width: 170px;
    }
    .en-title{
      margin-top: 25px;
      font-size:0.9rem
    }
    @media screen and (max-width: 400px) {
      position: absolute;
      .ictLogo{
        background-size: 36px;
        margin: 4px;
      }
      .en-title,.title{
        right: 20px;
        font-size: 11px;
      }
      .title{
        margin-top: 10px;
        font-size: 12px;
      }
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
    max-height: 350px;
    overflow-y: auto;
  }
</style>
