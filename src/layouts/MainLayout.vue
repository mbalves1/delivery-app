<template>
  <q-layout>
    <!-- <q-header elevated style="background:#3f3a3f;"> -->
    <q-header style="background: #ebe9eb; color:#3f3a3f" class="flex">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Delivery
        </q-toolbar-title>

        <div>timer</div>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="color"
    >
      <q-list>
        <q-item-label
          header
        >
          <!-- <q-img src="../static/burguer.webp" style="height: 48px; width:48px;border-radius:50%"/> -->
          Burguer Delivery
        </q-item-label>

      <!-- <div class="flex column q-ma-lg q-gutter-y-md">
        <span @click="burguer = true" style="fontSize:20px;" class="text-teal">
          <q-icon name="lunch_dining" class="q-ma-lg"/>Burguer</span>
        <span @click="burguer = false" style="fontSize:20px;">
          <q-icon name="space_dashboard" class="q-ma-lg"/>Orders</span>
      </div> -->

       <template v-for="(menuItem, index) in menuList" :key="index">
          <q-item clickable @click="burguer = !burguer" v-ripple class="q-ml-lg">
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
        </template>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view>
        <burguer v-if="burguer"></burguer>
        <orders v-if="!burguer"></orders>

      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, defineComponent } from 'vue'
import {
// QImg
// QTabs,
// QTab
} from 'quasar'
import Burguer from 'src/components/burguer.vue'
import Orders from 'src/components/orders.vue'

const menuList = [
  {
    icon: 'fastfood',
    label: 'Burguer',
    separator: false
  },
  {
    icon: 'delivery_dining',
    label: 'Pedidos',
    separator: false
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    // QImg,
    Burguer,
    Orders
    // QTabs,
    // QTab
  },

  data () {
    return {
      burguer: true
    }
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      drawer: ref(true),
      menuList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
<style>
  .color {
    background: #ebe9eb;
    color: #130F13;
  }
</style>
