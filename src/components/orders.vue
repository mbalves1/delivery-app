<template>
  <div>
    <div>
      <span class="flex q-ml-md">
        <h3 class="q-ml-lg q-mx-ms">Pedidos<q-img src="../static/burguer.webp" style="height: 48px; width:48px; border-radius:50%" class="q-ml-md"/></h3>
      </span>
      <q-separator />
      <div class="flex">
        <q-markup-table class="q-ma-lg" style="width:95%;">
          <thead>
            <tr>
              <th class="text-left">Pedido</th>
              <th class="text-left">Valor</th>
              <th class="text-right">Status</th>
              <th class="text-right">Ação</th>
            </tr>
          </thead>
            <tbody>
              <tr v-for="(bur, id) in burgers" :key="id">
                <td class="text-left">{{ bur.id }}</td>
                <td class="text-left">R$ {{ bur.totalOrder }}</td>
                <td class="text-right">{{ bur.status }}</td>
                <td class="text-right">
                  <!-- <q-btn  class="rounded-borders" style="border-radius:50%; color: red; width: 10px;"> -->
                  <q-icon @click="deleteBurger(bur.id)" name="delete_forever" color="black" size="25px" style="cursor:pointer"></q-icon>
                  <!-- </q-btn> -->
                </td>
              </tr>
            </tbody>
          </q-markup-table>
      </div>
    </div>
    <div v-if="false">
      <span class="material-icons">
        moped
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      burgers: null,
      burger_id: null,
      status: []
    }
  },
  computed: {
    idCode () {
      return this.burgers
    }
  },
  methods: {
    async getPedidos () {
      const req = await fetch('http://localhost:3333/burgers')

      const data = await req.json()

      this.burgers = data
      console.log(this.burgers)

      // Resgata os status de pedidos
      // this.getStatus()
    },
    async getStatus () {
      const req = await fetch('http://localhost:3333/status')

      const data = await req.json()

      this.status = data
    },
    async deleteBurger (id) {
      const req = await fetch(`http://localhost:3333/burgers/${id}`, {
        method: 'DELETE'
      })

      const res = await req.json()
      console.log(res)

      this.getPedidos()
    },
    async updateBurger (event, id) {
      const option = event.target.value

      const dataJson = JSON.stringify({ status: option })

      const req = await fetch(`http://localhost:3333/burgers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: dataJson
      })

      const res = await req.json()

      console.log(res)
    }
  },
  mounted () {
    this.getPedidos()
  }
}
</script>

<style lang="scss" scoped>
</style>
