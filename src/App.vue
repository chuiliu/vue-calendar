<template>
  <div id="app">
    <router-view :start="startDate" :end="endDate"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      startDate: '2018-1-1',
      endDate: '2018-5-6'
    }
  },
  created () {
    this.initDate()
  },
  methods: {
    initDate () {
      let today = new Date()
      let startDate = new Date(+today - (60 * 60 * 24 * 7 * 1000))
      this.startDate = [startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()].join('-')
      this.endDate = [today.getFullYear(), today.getMonth() + 1, today.getDate()].join('-')
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
