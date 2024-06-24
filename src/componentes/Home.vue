<template>
  <div>
    <div>
      <v-carousel
      height="700"
      
      show-arrows="hover"
      cycle
      
      hide-delimiters
      >
        <v-carousel-item
          v-for="(item, key) in carousel"
          :key="key"
          :src="item"
          :alt="item"
        >
        </v-carousel-item>
      </v-carousel>
    </div>
  
    <div>
      <v-card>
        <v-tabs
          v-model="tab"
          align-tabs="center"
          color="deep-purple-accent-4"
        >
          <v-tab :value="1">Productos</v-tab>
          <v-tab :value="2">Promociones</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item :value="1">
            <Productos v-if="tab === 1"/>
          </v-tab-item>
          <v-tab-item :value="2">
            <Promociones v-if="tab === 2"/>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
  </div>
</template>

<script>
  import Productos from './Productos.vue'
  import Promociones from './Promociones.vue'
  import carouselJSON from '@/carousel.json';

  export default  {
    name: 'src-componentes-home',
    components: {
      Productos, 
      Promociones,
    },
    props: [],
    mounted () {
      this.carousel = carouselJSON;
    },
    data () {
      return {
        carousel:{},
        tab: 1,
      }
    },
    methods: {
    },
    computed: {
    }
}


</script>

<style scoped lang="css">

</style>
