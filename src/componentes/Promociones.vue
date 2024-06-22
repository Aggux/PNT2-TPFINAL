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
              <v-icon icon="mdi:mdi-plus" />
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
export default  {
  name: 'src-componentes-promociones',
  props: [],
  mounted() {
    this.promociones = promocionesJSON;
  },
  data() {
    return {
      promociones: {},
    }
  },
  methods: {
    toggleShow(promocion) {
    promocion.show = !promocion.show;
    },
    formatPrice(precio) {
    return isNaN(precio) ? precio : `$${precio}`;
    },
  },
  computed: {

  }
}
</script>

<style></style>
