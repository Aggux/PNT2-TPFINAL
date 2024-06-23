import { createRouter, createWebHistory } from 'vue-router';

import Home from './componentes/Home.vue';
import Productos from './componentes/Productos.vue';
import Promociones from './componentes/Promociones.vue';
import CuponesGuardados from './componentes/CuponesGuardados.vue';
import Login from './componentes/Login.vue';
import Navbar from './componentes/Navbar.vue';

const routes = [
  { path: '/', redirect: '/navbar' },
  { path: '/login', component: Login },
  { path: '/navbar', component: Navbar },
  { path: '/home', component: Home },
  { path: '/home/:id', component: Home },
  { path: '/productos', component: Productos },
  { path: '/promociones', component: Promociones },
  { path: '/cuponesGuardados', component: CuponesGuardados },
  { path: '/:pathMatch(.*)*', redirect: '/home' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;


