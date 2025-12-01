import LoginForm from '@/LoginForm.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RegisterForm from '@/RegisterForm.vue'
import UserLayout from '@/components/UserLayout.vue'
//eva
import Evaluatee from '@/views/Evaluatee/index.vue'
import Index from '@/views/Staff/index.vue'
import ManaggeEva from '@/views/Staff/ManageEva.vue'
import ManageCommit from '@/views/Staff/ManageCommit.vue'
import Topic from '@/views/Staff/Topic.vue'
import Indicate from '@/views/Staff/Indicate.vue'
import Round_eva from '@/views/Staff/Round_eva.vue'
import Eva from '@/views/Staff/Eva.vue'
import Eva_commit from '@/views/Staff/Eva_commit.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/regis',
      name: 'RegisterForm',
      component: RegisterForm,
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: LoginForm,
    },
    {
      path: '/',
      redirect: '/login',
    },

    //eva
    {
      path: '/Evaluatee',
      component: UserLayout,
      children:[
        {
          path: '/Evaluatee',
          name: 'Evaluatee',
          component: Evaluatee,
        },
      ]
    },
    // Staff ======================
    {
      path: '/Staff',
      component: UserLayout,
      children:[
        {
          path: '/Staff',
          name: 'StaffDashboard',
          component: Index,
        },
        {
          path: '/ManageEva',
          name: 'ManageEva',
          component: ManaggeEva,
        },
        {
          path: '/ManageCommit',
          name: 'ManageCommit',
          component: ManageCommit,
        },
        {
          path: '/Topic',
          name: 'Topic',
          component: Topic,
        },
        {
          path: '/Indicate',
          name: 'Indicate',
          component: Indicate,
        },
        {
          path: '/Round_eva',
          name: 'Round_eva',
          component: Round_eva,
        },
        {
          path: '/Eva',
          name: 'Eva',
          component: Eva,
        },
        {
          path: '/Eva_commit/:id_eva',
          name: 'Eva_commit',
          component: Eva_commit,
        },
      ]
    },
  ],
})

export default router
