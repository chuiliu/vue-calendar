<template>
  <div class="calendar">
    <header class="cal-header">
      <div class="btn btn-back" @click="back()">返回</div>
      <div class="cal-title">{{title}}</div>
      <div class="btn btn-ok" @click="confirm()">完成</div>
    </header>
    <div class="select-area">
      <div class="from" @click="updateMode(0)">{{startDate}}</div>~
      <div class="to" @click="updateMode(1)">{{endDate}}</div>
    </div>
    <div class="week-bar">
      <div class="cell" v-for="w in week" :key="w">{{w}}</div>
    </div>
    <section v-for="(item, index) in data" :key="index">
      <div class="month-title">{{item.year}}-{{item.month}}</div>
      <div class="month-body">
        <div class="cell" v-for="date in item.dateList" :key="date" @click="selectDate(item.year, item.month, date)">{{date}}</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  props: ['start', 'end', 'tt'],
  data () {
    return {
      week: ['日', '一', '二', '三', '四', '五', '六'],
      data: [],
      mode: 0,
      title: '开始日期',
      startDate: this.start,
      endDate: this.end
    }
  },
  created () {
    this.getData()
    console.log(this.start, this.end)
  },
  methods: {
    getData () {
      let ret = []
      let startY = 2017
      let startM = 12
      let endY = 2018
      let endM = 5
      let totalMonth = (endY - startY) * 12 + (endM - startM) + 1

      let curY = startY
      let curM = startM
      for (let i = 0; i < totalMonth; i++) {
        if (curM > 12) {
          curM = 1
          curY++
        }
        let curDateList = this.getMonthData(curY, curM)
        ret[i] = {
          year: curY,
          month: curM,
          dateList: curDateList
        }
        curM++
      }

      this.data = ret
    },
    getMonthData (y, m) {
      let ret = []
      let firstDate = new Date(y, m - 1) // 月第一天
      let firstDateWeek = firstDate.getDay() // 月第一天周几
      let lastDate = new Date(y, m, 0) // 月最后一天
      let totalDate = lastDate.getDate() // 月总天数

      for (let i = 0; i < firstDateWeek; i++) {
        ret[i] = null
      }

      for (let i = 1; i <= totalDate; i++) {
        ret.push(i)
      }
      return ret
    },
    selectDate (y, m, d) {
      let date = Array.prototype.slice.call(arguments).join('-')
      this.mode === 0 ? this.startDate = date : this.endDate = date
    },
    updateMode (mode) {
      this.mode = mode
      this.title = mode === 0 ? '开始日期' : '结束日期'
    },
    back () {
      this.$router.back()
    },
    confirm () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}
.calendar {
  .background-color: #eee;
}
.cal-header {
  height: 2em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
.btn {
  padding: 0 .6em;
}
.btn-ok {
  color: #fc7878;
}
.select-area {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  font-size: 1.2em;
  font-weight: 500;
  line-height: 2.5;
}
.week-bar,
.month-body {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
}
.month-title {
  background-color: #eee;
  line-height: 2em;
}
.cell {
  width: 14.28571%;
  height: 2.8rem;
  line-height: 2.8rem;
  /*border: 1px solid #eee;*/
  text-align: center;
  background-color: #fff;
}
.cell:nth-child(7n),
.cell:nth-child(7n+1) {
  color: #fc7878;
}
</style>
