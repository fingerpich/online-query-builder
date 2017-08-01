import Vue from 'vue'
import Router from 'vue-router'
import QueryEditor from '@/components/QueryEditor'
import QueryResult from '@/components/QueryResult'
import login from '@/components/login'

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
      name: 'editQuery',
      component: QueryEditor
    },
    {
      path: '/load/:id',
      name: 'QueryResult',
      component: QueryResult
    },
    {
      path: '/load/:id/:page',
      name: 'QueryResultPagination',
      component: QueryResult
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
