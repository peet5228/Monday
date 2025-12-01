import LoginForm from '@/LoginForm.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RegisterForm from '@/RegisterForm.vue'
import UserLayout from '@/components/UserLayout.vue'
//eva
import Evaluatee from '@/views/Evaluatee/index.vue'

import Edit_eva from '@/views/Evaluatee/Edit_eva.vue'
import Selfeva from '@/views/Evaluatee/Selfeva.vue'
import Check_score from '@/views/Evaluatee/Check_score.vue'
import Check_eva from '@/views/Evaluatee/Check_eva.vue'

import Index from '@/views/Staff/index.vue'
import ManaggeEva from '@/views/Staff/ManageEva.vue'
import ManageCommit from '@/views/Staff/ManageCommit.vue'
import Topic from '@/views/Staff/Topic.vue'
import Indicate from '@/views/Staff/Indicate.vue'
import Round_eva from '@/views/Staff/Round_eva.vue'
import Eva from '@/views/Staff/Eva.vue'
import Eva_commit from '@/views/Staff/Eva_commit.vue'
import Score_evaList from '@/views/Staff/Score_evaList.vue'
import Score_commitList from '@/views/Staff/Score_commitList.vue'
import Status_commit from '@/views/Staff/Status_commit.vue'
import Status2 from '@/views/Staff/Status2.vue'
import StatusEva from '@/views/Staff/StatusEva.vue'
import Document from '@/views/Staff/Document.vue'

import Committee from '@/views/Committee/index.vue'
import Show_eva from '@/views/Committee/Show_eva.vue'
import Score_eva from '@/views/Committee/Score_eva.vue'
import Save_score from '@/views/Committee/Save_score.vue'
import Signature from '@/views/Committee/Signature.vue'
import Signature_save from '@/views/Committee/Signature_save.vue'
import Score_commit from '@/views/Committee/Score_commit.vue'

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

    //commit
    {
      path: '/Committee',
      component: UserLayout,
      children:[
        {
          path: '/Committee',
          name: 'Committee',
          component: Committee,
        },
        {
          path: '/Show_eva',
          name: 'Show_eva',
          component: Show_eva,
        },
        {
          path: '/Score_eva/:id_eva',
          name: 'Score_eva',
          component: Score_eva,
        },
        {
          path: '/Save_score/:id_eva',
          name: 'Save_score',
          component: Save_score,
        },
        {
          path: '/Signature',
          name: 'Signature',
          component: Signature,
        },
        {
          path: '/Signature_save/:id_eva',
          name: 'Signature_save',
          component: Signature_save,
        },
        {
          path: '/Score_commit/:id_eva',
          name: 'Score_commit',
          component: Score_commit,
        },
      ]
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
        {
          path: '/Edit_eva',
          name: 'Edit_eva',
          component: Edit_eva,
        },
        {
          path: '/Selfeva',
          name: 'Selfeva',
          component: Selfeva,
        },
        {
          path: '/Check_score',
          name: 'Check_score',
          component: Check_score,
        },
        {
          path: '/Check_eva',
          name: 'Check_eva',
          component: Check_eva,
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
        {
          path: '/Score_evaList',
          name: 'Score_evaList',
          component: Score_evaList,
        },
        {
          path: '/Score_commitList',
          name: 'Score_commitList',
          component: Score_commitList,
        },
        {
          path: '/StatusCommit',
          name: 'StatusCommit',
          component: Status_commit,
        },
        {
          path: '/StatusEva',
          name: 'StatusEva',
          component: StatusEva,
        },
        {
          path: '/Status2/:id_eva',
          name: 'Status2',
          component: Status2,
        },
        {
          path: '/Document',
          name: 'Document',
          component: Document,
        },
      ]
    },
  ],
})

export default router
