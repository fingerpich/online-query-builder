<template>
  <div class="login">
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    components: {},
    name: 'login',
    methods: {},
    created () {
      axios.post('/api/login', {
        username: 'admin',
        password: 'admin'
      }, {withCredentials: true})
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
