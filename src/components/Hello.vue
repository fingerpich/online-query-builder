<template>
  <div class="hello">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">Solr Query builder</el-menu-item>
      <el-submenu index="2">
        <template slot="title">query list</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
        new
      </el-menu-item>
    </el-menu>
    <img src="./../assets/logo.png">
    <h1>Solr Query builder</h1>
    <search-builder></search-builder>
  </div>
</template>

<script>
  import SearchBuilder from './searchBuilder/searchBuilder'
  export default {
    components: {
      SearchBuilder
    },
    name: 'hello',
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
