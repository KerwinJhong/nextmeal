import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NotFound from './views/NotFound'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: () => import('./views/Restaurants.vue')
    },
    {
      path: '/restaurant/:restaurant_id',
      name: 'restaurant',
      component: () => import('./views/Restaurant.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/subscribe',
      name: 'subscribe',
      component: () => import('./views/Subscribe.vue')
    },
    {
      path: '/orders/tomorrow',
      name: 'order-tomorrow',
      component: () => import('./views/OrdersTomorrow.vue')
    },
    {
      path: '/orders/new',
      name: 'order-new',
      component: () => import('./views/OrderNew.vue')
    },
    {
      path: '/orders/:order_id/edit',
      name: 'order-edit',
      component: () => import('./views/OrderEdit.vue')
    },
    {
      path: '/user',
      name: 'user-profile',
      component: () => import('./views/UserProfile.vue')
    },
    {
      path: '/owner',
      name: 'owner-info',
      component: () => import('./views/OwnerInfo.vue')
    },
    {
      path: '/owner/dishes',
      name: 'owner-dishes',
      component: () => import('./views/OwnerDishes.vue')
    },
    {
      path: '/owner/dishes/new',
      name: 'owner-dish-new',
      component: () => import('./views/OwnerDishNew.vue')
    },
    {
      path: '/owner/dishes/:dish_id',
      name: 'owner-dish-edit',
      component: () => import('./views/OwnerDishEdit.vue')
    },
    {
      path: '/owner/menu',
      name: 'owner-menu',
      component: () => import('./views/OwnerMenu.vue')
    },
    {
      path: '/admin/restaurants',
      name: 'admin-restaurants',
      component: () => import('./views/AdminRestaurants.vue')
    },
    {
      path: '/admin/restaurants/:restaurant_id',
      name: 'admin-restaurant-edit',
      component: () => import('./views/AdminRestaurantEdit.vue')
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('./views/AdminUsers.vue')
    },
    {
      path: '/admin/users/:user_id',
      name: 'admin-user-edit',
      component: () => import('./views/AdminUserEdit.vue')
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})
