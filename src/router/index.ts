import HomePage from '../views/HomePage.vue';

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/pokemon/:id',
            component: () => import('../views/PokemonPage.vue') // Allow lazy loading and improves performance
        }
    ]
});

export default router;
