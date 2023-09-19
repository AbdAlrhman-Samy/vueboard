import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import OrdersView from '../views/Orders/OrdersView.vue'
import ProductsView from '../views/Products/ProductsView.vue'
import UsersView from '../views/Users/UsersView.vue'
import UserDetailsView from '../views/Users/UserDetailsView.vue'
import OrderDetailsView from '../views/Orders/OrderDetailsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
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
      path: '/orders/:id',
      name: 'order-details',
      component: OrderDetailsView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
    },
    {
      path: '/users/:id',
      name: 'user-details',
      component: UserDetailsView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFoundView
    }
  ]
})

export default router
