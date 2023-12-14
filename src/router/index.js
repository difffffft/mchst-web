import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/pages/Home/index.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView
        },
        {
            path: '/c/:id',
            name: 'ChatSession',
            component: HomeView
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/pages/Login/index.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/pages/Register/index.vue')
        },
        {
            path: '/forgot',
            name: 'Forgot',
            component: () => import('@/pages/Forgot/index.vue')
        },
        {
            path: '/404',
            component: () => import('@/pages/Error/404/index.vue')
        },
        {
            path: '/:pathMatch(.*)',
            redirect: '/404'
        }
    ]
})

export default router
