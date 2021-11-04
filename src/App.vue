<template>
  <div>
    <!-- <burguer></burguer>
    <orders></orders> -->
    <router-view/>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

// import Burguer from 'src/components/burguer.vue'
// import Orders from 'src/components/orders.vue'

export default defineComponent({
  components: {
    // Burguer,
    // Orders
  },
  name: 'App'
})
</script>
<style>
</style>
