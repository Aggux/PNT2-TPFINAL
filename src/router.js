// import { createRouter, createWebHistory } from 'vue-router'

// import Home from './componentes/Home.vue'
// import Productos  from './componentes/Productos.vue';
// import Promociones  from './componentes/Promociones.vue';


// const routes = [
//     { path: '/', redirect: '/Home' },

//     { path: '/home', component: Home },
//     { path: '/home/:id', component: Home },
//     { path: '/productos', component: Productos },
//     { path: '/promociones', component: Promociones },

//     { path: '/:pathmatch(.*)*', redirect: '/Home' },

// ]

// const router = createRouter({
//     history: createWebHistory(),
//     routes, 
// })

// export default router
import { createRouter, createWebHistory } from 'vue-router';
import Login from './componentes/Login.vue';
import Navbar from './componentes/Navbar.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/navbar', component: Navbar }
  // Asegúrate de que otras rutas estén correctamente definidas si las tienes
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;


