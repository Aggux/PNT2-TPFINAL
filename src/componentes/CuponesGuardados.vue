<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="(cupon, index) in cupones"
          :key="index"
          cols="12"
          md="6"
          lg="3"
        >
          <v-card class="mx-auto" max-width="344" style="margin-bottom: 20px;">
            <v-img
              :src="cupon.imagen"
              height="350px"
              cover
            ></v-img>

            <v-card-title>
              {{ cupon.titulo }}
            </v-card-title>

            <v-card-subtitle>
              {{ formatPrice(cupon.precio) }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange-lighten-2" text="DESCRIPCION"></v-btn>
              <v-btn icon @click="removeCupon(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div>
                <v-divider></v-divider>
                <v-card-text>{{ cupon.contenido }}</v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getCuponesGuardados, updateCuponesGuardados } from "./servicios/cuponesGuardados.js";

export default {
  name: 'src-componentes-cupones-guardados',
  props: [],
  data() {
    return {
      cupones: [],
      userId: null
    };
  },
  async mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.userId = user ? user.id : null;
    await this.loadCuponesGuardados();
  },
  methods: {
    async loadCuponesGuardados() {
      if (this.userId) {
        const cuponesGuardados = await getCuponesGuardados();
        const userCupones = cuponesGuardados.find(cupones => cupones.id === this.userId);
        this.cupones = userCupones ? userCupones.cupones : [];
      }
    },
    formatPrice(precio) {
      return isNaN(precio) ? precio : `$${precio}`;
    },
    async removeCupon(index) {
      if (!confirm("¿Seguro que quieres eliminar este cupón?")) {
        return;
      }

      if (this.userId && this.cupones.length > index) {
        this.cupones.splice(index, 1);
        const cuponesGuardados = {
          id: this.userId,
          cupones: this.cupones
        };

        try {
          await updateCuponesGuardados(this.userId, cuponesGuardados);
          console.log("Cupón eliminado exitosamente.");
        } catch (error) {
          console.error("Error al eliminar el cupón:", error);
          
          await this.loadCuponesGuardados();
        }
      }
    }
  }
}
</script>

<style></style>
