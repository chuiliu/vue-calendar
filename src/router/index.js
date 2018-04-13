import Vue from 'vue'
import Router from 'vue-router'
import Calendar from '@/components/Calendar'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/c',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
