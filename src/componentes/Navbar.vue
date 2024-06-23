<template>
  <div>
    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>McORT</v-app-bar-title>

      <template v-slot:append>
        <v-btn 
          v-if="isSessionActive"
          icon="mdi-tag-outline"
          @click="changeView('cuponesGuardados')"
        ></v-btn>
        <v-btn icon @click="logout">
          <v-icon v-if="isSessionActive">mdi-export</v-icon>
          <v-icon v-else>mdi-account</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      temporary
    >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.value"
          @click="changeView(item.value)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <br>
    <component :is="currentViewComponent" />
  </div>
</template>


<script>
import Home from './Home.vue'
import Productos from './Productos.vue'
import Promociones from './Promociones.vue'
import CuponesGuardados from './CuponesGuardados.vue'

export default {
  name: 'src-componentes-navbar',
  components: {
    Home,
    Productos,
    Promociones,
    CuponesGuardados
  },
  data() {
    return {
      drawer: false,
      currentView: 'inicio',
      isSessionActive: false, // Esta propiedad determina si hay una sesión activa
      items: [
        {
          title: 'Inicio',
          value: 'inicio',
        },
        {
          title: 'Productos',
          value: 'productos',
        },
        {
          title: 'Promociones',
          value: 'promociones',
        },
      ],
    };
  },
  computed: {
    currentViewComponent() {
      switch (this.currentView) {
        case 'productos':
          return 'Productos';
        case 'promociones':
          return 'Promociones';
        case 'cuponesGuardados':
          return 'CuponesGuardados';
        case 'inicio':
        default:
          return 'Home';
      }
    }
  },
  methods: {
    changeView(view) {
      this.currentView = view;
      this.drawer = false;
    },
    logout() {
      // Aquí puedes añadir la lógica para cerrar la sesión si está activa
      if (this.isSessionActive) {
        // Lógica para cerrar sesión
        localStorage.removeItem('session'); // Ejemplo de cómo cerrar sesión
        this.isSessionActive = false;
      }
      this.$router.push('/login'); // Redirige a la vista de login
    }
  },
  mounted() {
    // Aquí podrías verificar si hay una sesión activa y actualizar la propiedad `isSessionActive`
    this.isSessionActive = !!localStorage.getItem('session'); // Ejemplo: verifica si hay una sesión en localStorage
  }
};
</script>

<style scoped lang="css">
</style>
