<template>
  <div>
    <router-link to="/c">
      <input type="text" v-model="startDate">
    </router-link>
    <router-link to="/c">
      <input type="text" v-model="endDate">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    start: '',
    end: ''
  },
  data () {
    return {
      startDate: this.start,
      endDate: this.end
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>
