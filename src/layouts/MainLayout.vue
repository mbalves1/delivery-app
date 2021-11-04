<template>
  <q-layout>
    <!-- <q-header elevated style="background:#3f3a3f;"> -->
    <q-header style="background: rgba(245, 208, 39, 0.47); color:#3f3a3f" class="flex">
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
          <q-img src="../static/burguer.webp" style="height: 48px; width:48px; border-radius:50%" class="q-mr-md"/>Burguer Delivery
        </q-item-label>

        <q-item clickable to="/burguer" v-ripple active-class="my-menu-link" class="q-ml-lg">
          <q-item-section avatar>
            <q-icon name="fastfood" />
          </q-item-section>
          <q-item-section>
            Burguer
          </q-item-section>
        </q-item>

        <q-item clickable to="/orders" v-ripple active-class="my-menu-link" class="q-ml-lg">
          <q-item-section avatar>
            <q-icon name="delivery_dining" />
          </q-item-section>
          <q-item-section>
            Pedidos
          </q-item-section>
        </q-item>

        <q-item clickable to="/register" v-ripple active-class="my-menu-link" class="q-ml-lg">
          <q-item-section avatar>
            <q-icon name="format_list_bulleted" />
          </q-item-section>
          <q-item-section>
            Cadastro
          </q-item-section>
        </q-item>

        <q-item clickable to="/dashboard" v-ripple active-class="my-menu-link" class="q-ml-lg">
          <q-item-section avatar>
            <q-icon name="space_dashboard" />
          </q-item-section>
          <q-item-section>
            Dashboard
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, defineComponent } from 'vue'
import {
} from 'quasar'

const menuList = [
  {
    icon: 'fastfood',
    label: 'Burguer',
    separator: false,
    link: '/burguer'
  },
  {
    icon: 'delivery_dining',
    label: 'Pedidos',
    separator: false
  },
  {
    icon: 'delivery_dining',
    label: 'Dashboard',
    separator: false
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  data () {
    return {
      burguer: true,
      activeTabs: 'Burgers'
    }
  },

  methods: {
    tabs (event) {
      const tb = this.menuList.map((item, index) => {
        console.log(index)
        return item.label
      })
      console.log(tb.index, event.target.value)
      return true
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
    background: rgba(245, 208, 39, 0.47);
    color: #130F13;
  }
</style>
