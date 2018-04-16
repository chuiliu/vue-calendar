<template>
  <div class="date-field">
    <router-link to="/c">
      <div class="form-group">
        <label>起始日期</label>
        <input type="text" v-model="startDate">
      </div>
    </router-link>
    <router-link to="/c">
      <div class="form-group">
        <label>结束日期</label>
        <input type="text" v-model="endDate">
      </div>
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
