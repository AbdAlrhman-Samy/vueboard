import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import OrdersView from '../views/Orders/OrdersView.vue'
import ProductsView from '../views/Products/ProductsView.vue'
import UsersView from '../views/Users/UsersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    }
  ]
})

export default router
