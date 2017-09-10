import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'

import request from '@/components/requests/page'
import page_list_request from '@/components/requests/list'
import page_edit_request from '@/components/requests/edit'
import page_edit_goods from '@/components/requests/edit-goods'
import page_edit_tasks from '@/components/requests/edit-tasks'

import page_view_drive from '@/components/drive/view'

import page_edit_confirm from '@/components/confirm/edit'
import page_edit_payment from '@/components/payment/edit'

import tasks from '@/components/tasks/page'
import page_lists_tasks from '@/components/tasks/list'
import page_edit_lists_tasks from '@/components/tasks/edit'

import page_print_request from '@/components/requests/print'
import page_login from '@/components/login/login'

Vue.use(Router)

let router = new Router({
  routes: [{
    path: '/',
    redirect: '/request/'
  }, {
    path: '/login/',
    name: 'page-login',
    component: page_login
  }, {
    path: '/request',
    component: request,
    children: [
      { path: '', name: 'page-list-requests', component: page_list_request },
      { path: 'edit/:number', name: 'page-edit-request', component: page_edit_request },
      { path: 'edit/:number/goods', name: 'page-edit-goods', component: page_edit_goods },
      { path: 'edit/:number/tasks', name: 'page-edit-tasks', component: page_edit_tasks },
      { path: 'print/:number', name: 'page-print-request', component: page_print_request },
      //{ path: 'view/:id', name: 'page-view-request', component: page_view_request }
    ]
  }, {
    path: '/request/drive/:number',
    name: 'page-view-drive',
    component: page_view_drive
  }, {
    path: '/request/confirm/:number',
    name: 'page-edit-confirm',
    component: page_edit_confirm
  }, {
    path: '/request/payment/:number',
    name: 'page-edit-payment',
    component: page_edit_payment
  }, {
    path: '/tasks',
    component: tasks,
    children: [
      { path: '', name: 'page-list-tasks', component: page_lists_tasks },
      { path: 'edit/:number', name: 'page-edit-list-tasks', component: page_edit_lists_tasks },
    ]
  }]
})

export default router;