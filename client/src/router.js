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
      path: '/order/tomorrow',
      name: 'order-tomorrow',
      component: () => import('./views/OrdersTomorrow.vue')
    },
    {
      path: '/order/new',
      name: 'order-new',
      component: () => import('./views/OrderNew.vue')
    },
    {
      path: '/order/:order_id/edit',
      name: 'order-edit',
      component: () => import('./views/OrderEdit.vue')
    },
    {
      path: '/order/:order_id/comment',
      name: 'order-comment',
      component: () => import('./views/OrderComment.vue')
    },
    {
      path: '/order/:order_id',
      name: 'order',
      component: () => import('./views/Order.vue')
    },
    {
      path: '/user',
      name: 'user-profile',
      component: () => import('./views/UserProfile.vue')
    },
    {
      path: '/user/orders',
      name: 'user-order',
      component: () => import('./views/UserOrders.vue')
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
      path: '/owner/orders',
      name: 'owner-orders',
      component: () => import('./views/OwnerOrders.vue')
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
      path: '/admin/orders',
      name: 'admin-orders',
      component: () => import('./views/AdminOrders.vue')
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})
