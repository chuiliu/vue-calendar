<template>
  <div class="calendar">
    <header class="">
      <div class="cal-header">
        <div class="btn btn-back" @click="back()">取消</div>
        <div class="cal-title">选择日期</div>
      </div>
      <div class="week-bar">
        <div class="cell" v-for="w in week" :key="w">{{w}}</div>
      </div>
    </header>
    <div class="cal-body">
      <section v-for="(item, index) in data" :key="index">
        <div class="month-title">{{item.year}}年{{item.month}}月</div>
        <div class="month-body">
          <div class="cell"
            v-for="(date, index) in item.dateList"
            :key="index"
            @click="selectDate(item.year, item.month, date)">
            <div class="inner" :class="{'start-date': date.startDate, 'end-date': date.endDate}">
              {{date.date}}
              <div class="desc" v-if="date.startDate">开始</div>
              <div class="desc" v-else-if="date.endDate">结束</div>
              <div class="desc" v-else-if="date.isToday">今天</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  props: ['start', 'end'],
  data () {
    return {
      week: ['日', '一', '二', '三', '四', '五', '六'],
      data: [],
      startDate: this.start,
      endDate: this.end,
      curStartDate: {
        dateStr: this.start,
        startDate: false,
        endDate: false
      },
      curEndDate: {
        dateStr: this.end,
        startDate: false,
        endDate: false
      }
    }
  },
  created () {
    this.getData()
    console.log(this.curStartDate)
  },
  methods: {
    getData () {
      let ret = []
      let startY = 2018
      let startM = 3
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
        ret[i] = {
          date: null,
          today: false
        }
      }

      for (let i = 1; i <= totalDate; i++) {
        let today = new Date().toDateString()
        let curDate = new Date(y, m - 1, i).toDateString()
        let curDateStr = [y, m, i].join('-')
        let startDate = new Date(this.startDate).toDateString()
        let endDate = new Date(this.endDate).toDateString()

        let isToday = curDate === today
        let isStartDate = curDate === startDate
        let isEndDate = curDate === endDate

        let date = {
          date: i,
          dateStr: curDateStr,
          isToday: isToday,
          startDate: isStartDate,
          endDate: isEndDate
        }

        ret.push(date)

        if (isStartDate) {
          this.curStartDate = date
        }

        if (isEndDate) {
          this.curEndDate = date
        }
      }
      return ret
    },
    selectDate (y, m, d) {
      if (!d.date) {
        return
      }
      let selectDateStr = d.dateStr
      let curStartDateStr = this.curStartDate.dateStr
      let curEndDateStr = this.curEndDate.dateStr
      // this.mode === 0 ? this.startDate = date : this.endDate = date

      console.log(+new Date(selectDateStr) - new Date(this.curStartDate.dateStr))

      if (selectDateStr === curStartDateStr || selectDateStr === curEndDateStr) {
        return
      }

      if (curStartDateStr && curEndDateStr) {
        this.curStartDate.startDate = false
        this.curEndDate.endDate = false
        d.startDate = true
        d.endDate = false
        this.curStartDate = d
        this.curEndDate = {}
      } else if (curStartDateStr) {
        if (+new Date(selectDateStr) - new Date(curStartDateStr) < 0) {
          this.curStartDate.startDate = false
          this.curEndDate.endDate = false
          d.startDate = true
          d.endDate = false
          this.curStartDate = d
          this.curEndDate = {}
        } else {
          this.curEndDate.endDate = false
          d.startDate = false
          d.endDate = true
          this.curEndDate = d
        }
      }

      // if (this.mode === 0) {
      //   this.curStartDate.startDate = false
      //   d.startDate = true
      //   d.endDate = false
      //   this.curStartDate = d
      // } else {
      //   this.curEndDate.endDate = false
      //   d.startDate = false
      //   d.endDate = true
      //   this.curEndDate = d
      // }
    },
    back () {
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
  .background-color: #fff;
}
header {
  position: fixed;
  width: 100%;
  z-index: 1;
  border-bottom: 1px solid #ccc;
  background-color: #eee;
}
.cal-header {
  height: 2rem;
  line-height: 2rem;
}
.cal-title {
  font-size: 1.1em;
}
.btn {
  padding: 0 .6em;
}
.btn-back {
  position: absolute;
  width: 3.25rem;
  color: rgb(94, 156, 225);
}
.week-bar,
.month-body {
  display: flex;
  flex-wrap: wrap;
}
.month-title {
  background-color: #eee;
  line-height: 2em;
}
.cell {
  /*position: relative;*/
  padding: .2em;
  width: 14.28571%;
  height: 2.8rem;
  line-height: 2rem;
  text-align: center;
  font-size: 0.9em;
  background-color: #fff;
}
.cell:nth-child(7n),
.cell:nth-child(7n+1) {
  color: rgb(94, 156, 225);
}
.cell .inner {
  position: relative;
  height: 100%;
  border-radius: 3px;
}
.cell .start-date,
.cell .end-date {
  background-color: rgb(94, 156, 225);
  color: #fff;
}
.cell .desc {
  position: absolute;
  bottom: .25em;
  width: 100%;
  margin: 0 auto;
  font-size: 0.6em;
  line-height: 1;
  color: inherit;
}
.week-bar .cell {
  height: 1.75rem;
  line-height: 1.75rem;
  background-color: inherit;
}
.cal-body {
  padding-top: 3.75rem;
}
</style>
