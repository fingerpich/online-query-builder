<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  html,body{
    margin:0;
    background: #eee;
  }

  .el-menu--dark{
    background:#673ab7;
  }
  .el-menu--horizontal.el-menu--dark .el-menu-item:hover, .el-menu--horizontal.el-menu--dark .el-submenu__title:hover{
    background: #7f53ce;
  }
  .el-menu--horizontal .el-submenu .el-submenu__icon-arrow,
  .el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title {
    color:#fff;
  }
  .el-menu--horizontal .el-submenu .el-submenu__title,
  .el-menu--horizontal .el-menu-item{
    line-height: 70px;
    height: 70px;
  }


  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin:0
  }
</style>
