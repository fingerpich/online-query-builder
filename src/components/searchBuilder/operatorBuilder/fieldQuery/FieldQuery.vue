<template>
  <div>
    <select>
      <option v-for="field in fields">{{ field.name }}</option>
    </select>
    <select>
      <option v-for="operator in operators">{{ operator.name }}</option>
    </select>
    <input v-model="value">
  </div>
</template>

<script>
  export default {
    name: 'fieldQuery',
    data () {
      return {
        value: '',
        fields: [{name: 'id'}, {name: 'content'}, {name: 'date'}],
        operators: [{name: '='}, {name: '!='}, {name: '>'}, {name: '<'}]
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
