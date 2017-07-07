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
      path: '/edit/:id',
      name: 'QueryEditor',
      component: QueryEditor
    },
    {
      path: '/load/:id',
      name: 'QueryResult',
      component: QueryResult
    },
    {
      path: '/load/:id/:page',
      name: 'QueryResult',
      component: QueryResult
    }
  ]
})
