import { createWebHistory, createRouter } from 'vue-router';

import Base from '@/views/base.vue';
import List from '@/views/list.vue';
import Computed from '@/views/computeds.vue';
import HelloWorld from '@/views/HelloWorld.vue';
import FormModel from '@/views/formModel.vue';
import Life from '@/views/life.vue';
import User from '@/views/user.vue';
import Father from '@/views/father.vue';
import Son from '@/views/son.vue';

const routes = [
  { path: '/', redirect: '/base' },
  { path: '/base', component: Base },
  { path: '/list', component: List }, // 修改其中一个路径以避免重复
  { path: '/computed', component: Computed },
  { path: '/hello', component: HelloWorld },
  { path: '/form', component: FormModel },
  { path: '/life', component: Life },
  {
    path: '/user/:id',
    name: 'user',
    meta: {
      title: '用户详情'
    },
    component: User
  },
  {
    path: '/fa',
    component: Father,
    children: [
      {
        path: 'son',
        component: Son
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
