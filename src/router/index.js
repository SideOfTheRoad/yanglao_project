import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Mhome from '@/components/Mhome'
import Whome from '@/components/Whome'
import Dreserve from '@/components/doctor/Dreserve'
import Reserve from '@/components/user/Reserve'
import Notice from '@/components/user/Notice'
import Resource from '@/components/user/Resource'
import History from '@/components/user/History'
import View from '@/components/user/View'
import rView from '@/components/doctor/rView'
import Photo from '@/components/user/Photo'
import Recom from '@/components/user/Recom'
import Read from '@/components/doctor/Read'

import Recommendyanglao from '@/components/user/Recommendyanglao'
import Infoyanglao from '@/components/user/Infoyanglao'
import Searchyanglao from '@/components/user/Searchyanglao' 
import Onlinecourse from '@/components/user/Onlinecourse' 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
    	path: '/mhome',
    	component: Mhome,
    	children: [
        {
        	path: '/reserve',
        	component: Reserve
        },
        {
          path: '/notice',
          component: Notice

        },
        {
          path: '/resource',
          component: Resource
        },
        {
          path: '/history',
          component: History
        },
        {
          path: '/view',
          component: View
        },
        {
          path: '/photo',
          component: Photo
        },
        {
          path: '/recom',
          component: Recom
        },


        {
          path: '/recommendyanglao',
          component: Recommendyanglao
        },
        {
          path: '/infoyanglao',
          component: Infoyanglao
        },
        {
          path: '/searchyanglao',
          component: Searchyanglao
        },
        {
          path: '/onlinecourse',
          component: Onlinecourse
        },          

    	]
    },
    {
      path: '/whome',
      component: Whome,
      children: [
        {
        	path: '/dreserve',
          component: Dreserve
        },
        {
          path: '/rView',
          component: rView
        },
        {
          path: '/read',
          component: Read
        }
      ]
    },
  ]
})
