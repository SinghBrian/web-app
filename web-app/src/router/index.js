import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
const homes = () => import("../components/home.vue")
const MyAccount = () => import("../components/MyAccount.vue")
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  
    {
      path: "/",
      name:"home",
      component: homes,
    },
    {
      path: "/MyAccount/:Name",
      name:"MyAccount",
      component: MyAccount,
    }
  ]
})

export default router
