<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="(item, key) in promociones"
          :key="key"
          cols="12"
          md="6"
          lg="3"
        >
          <v-card class="mx-auto" max-width="344" style="margin-bottom: 20px;">
            <v-img
              :src="promociones[key].imagen"
              height="350px"
              cover
            ></v-img>

            <v-card-title>
              {{ promociones[key].titulo }}
            </v-card-title>

            <v-card-subtitle>
              {{ formatPrice(promociones[key].precio) }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange-lighten-2" text="DESCRIPCION"></v-btn>
              <v-icon v-if="isSessionActive" @click="addCupon(key)">mdi-plus</v-icon>
              <v-spacer></v-spacer>
              <v-btn
                :icon="promociones[key].show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="toggleShow(promociones[key])"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="promociones[key].show">
                <v-divider></v-divider>
                <v-card-text>{{ promociones[key].contenido }}</v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import promocionesJSON from '@/promociones.json';
import { getCuponesGuardados, updateCuponesGuardados } from "./servicios/cuponesGuardados.js";

export default {
  name: 'src-componentes-promociones',
  props: [],
  mounted() {
    this.promociones = promocionesJSON;
    this.isSessionActive = !!localStorage.getItem('session');
    const user = JSON.parse(localStorage.getItem('user'));
    this.userId = user ? user.id : null;
    this.loadCuponesGuardados();
  },
  data() {
    return {
      promociones: {},
      isSessionActive: false,
      userId: null,
      cuponesGuardados: null
    }
  },
  methods: {
    toggleShow(promocion) {
      promocion.show = !promocion.show;
    },
    formatPrice(precio) {
      return isNaN(precio) ? precio : `$${precio}`;
    },
    async loadCuponesGuardados() {
      if (this.userId) {
        const cuponesGuardados = await getCuponesGuardados();
        this.cuponesGuardados = cuponesGuardados.find(cupon => cupon.id === this.userId);
      }
    },
    async addCupon(key) {
      if (!this.cuponesGuardados) {
        console.error("Cupones guardados no encontrado para el usuario.");
        return;
      }

      const cupon = this.promociones[key];
      this.cuponesGuardados.cupones.push(cupon);
      
      try {
        await updateCuponesGuardados(this.userId, this.cuponesGuardados);
        this.$emit("cuponAdded", cupon);
      } catch (error) {
        console.error("Error al agregar el cupón:", error);
      }
    }
  }
}
</script>

<style></style>
