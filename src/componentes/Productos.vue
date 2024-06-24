<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="busqueda"
            label="Buscar producto por nombre"
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          v-for="(producto, key) in productosFiltrados"
          :key="key"
          cols="12"
          md="6"
          lg="3"
        >
          <v-card class="mx-auto" max-width="344" style="margin-bottom: 20px;">
            <v-img
              :src="producto.imagen"
              height="300px"
              cover
            ></v-img>

            <v-card-title>
              {{ producto.titulo }}
            </v-card-title>

            <v-card-subtitle>
              {{ producto.kcal }} kcal
            </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange-lighten-2" text @click="mostrarDescripcion(producto)">
                DESCRIPCION
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                :icon="producto.show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="toggleShow(producto)"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="producto.show">
                <v-divider></v-divider>
                <v-card-text>{{ producto.contenido }}</v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import productosJSON from '@/productos.json';

export default {
  name: 'Productos',
  data() {
    return {
      busqueda: '',
      productos: {},
      productosFiltrados: {}
    };
  },
  methods: {
    toggleShow(producto) {
      producto.show = !producto.show;
    },
    mostrarDescripcion(producto) {
      alert(producto.contenido);
    },
    filtrarProductos() {
      const textoBusqueda = this.busqueda.toLowerCase();

      const resultadosFiltrados = Object.entries(this.productos).filter(([,producto]) => producto.titulo.toLowerCase().includes(textoBusqueda));

      this.productosFiltrados = Object.fromEntries(resultadosFiltrados);

    }
  },
  watch: {
    busqueda() {
      this.filtrarProductos();
    }
  },
  mounted() {
    this.productos = productosJSON;
    this.productosFiltrados = this.productos; 
  }
};
</script>

<style>
</style>
