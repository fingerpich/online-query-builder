import Vue from 'vue'
import Router from 'vue-router'
import QueryEditor from '@/components/QueryEditor'
import QueryResult from '@/components/QueryResult'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'QueryEditor',
      component: QueryEditor
    },
    {
      path: '/new',
      name: 'QueryEditor',
      component: QueryEditor
    },
    {
      path: '/result',
      name: 'QueryResult',
      component: QueryResult
    }
  ]
})
