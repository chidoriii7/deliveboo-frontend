import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import RestaurantPage from './pages/RestaurantPage.vue';
import DishesPage from './pages/DishesPage.vue';
import PayPage from './pages/PayPage.vue';
import Test from './pages/Test.vue'

const routes = [
    {
        name: 'homePage',
        path: '/',
        component: HomePage
    },
    // Ristoranti
    {
        name: 'restaurant',
        path: '/restaurant/:type?',// Path con il tipo come parametro
        component: RestaurantPage
    },
    // Piatti ristoranti
    {
        name: 'dishes',
        path: '/restaurant/:slug',  // Path con lo slug come parametro
        component: DishesPage,
    },
    {
        name: 'test',
        path: '/test',
        component: Test,
    },
    {
        name: 'payPage',
        path: '/pay',
        component: PayPage
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

//svuota il local storage dalle ultime tipologie di risoranti scelte quando torna in home
router.beforeEach((to, from, next) => {
    if (to.name === 'homePage') {
        localStorage.removeItem('selectedTypes');
        console.log('Local storage cancellato entrando nella home');
    }
    next();
});

export default router;
