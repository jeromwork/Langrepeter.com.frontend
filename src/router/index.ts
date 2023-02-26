import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AudioRecorder from "@/components/AudioRecorder.vue";
import Repeaters from "@/components/Repeaters.vue";
import Table from "@/components/Table.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/audio',
    name: 'audio',
    component: AudioRecorder
  },
  {
    path: '/repeaters',
    name: 'repeaters',
    component: Repeaters
  },
  {
    path: '/table',
    name: 'table',
    component: Table
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
