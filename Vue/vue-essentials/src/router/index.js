import Vue from 'vue';
import VueRouter from 'vue-router';
import Staff from '../views/Staff.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/staff',
        name: 'staff',
        component: Staff
    },
    {
        path: '/cheatSheet',
        name: 'cheatSheet',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "cheatSheet" */ '../views/CheatSheet.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router;
