import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const Home = () => import('../views/home/Home')
const Profile = () => import('../views/profile/Profile')
const Shopcart = () => import('../views/shopcart/Shopcart')
const Category = () => import('../views/category/Category')
const Detail = ()=>import('../views/detail/Detail')


const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/shopcart',
    component: Shopcart
  },
  {
    path: '/category',
    component: Category
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]

const router = new Router({
  routes,
  mode: 'history',
})

export default router
