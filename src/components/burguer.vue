<template>
  <div class="q-mx-lg">
    <span class="flex q-ml-md">
      <h3 class="q-ml-lg q-mx-ms">Burguers<q-img src="../static/burguer.webp" style="height: 48px; width:48px; border-radius:50%" class="q-ml-md"/></h3>
    </span>
    <q-separator />
    <h5 class="q-ma-lg">
      Qual o pão:
    </h5>
    <div class="flex">
      <q-card
        v-for="(pao, id) in paodata"
        :key="id"
        class="flex column items-center justify-center q-mr-lg q-mt-sm mobile">
        <q-icon name="lunch_dining" size="50px" color="grey"/>
        <q-separator class="q-mt-lg"/>
        <input type="checkbox" name="pao" v-model="paes" :value="pao"/>
        <span>{{ pao.tipo }}</span>
      </q-card>
    </div>
    <h5 class="q-ma-lg">
      Qual a carne:
    </h5>
    <div class="flex">
      <q-card
        v-for="(carne, id) in carnesdata"
        :key="id"
        style="width:130px;height:150px"
        class="flex column items-center justify-center q-mr-lg q-mt-sm">
        <q-icon name="fiber_manual_record" size="50px" color="grey"/>
        <q-separator class="q-mt-lg"/>
        <input type="checkbox" name="carne" v-model="carnes" :value="carne">
        <span>{{ carne.tipo }}</span>
      </q-card>
    </div>
    <h5 class="q-ma-lg">
      Adicionais:
    </h5>
    <div class="flex">
      <q-card
        v-for="(opcional, id) in opcionaisdata"
        :key="id"
        style="width:120px;height:50px"
        class="flex column items-center justify-center q-ml-lg q-mt-sm">
        <q-separator class="q-mt-lg"/>
        <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional">
        <span>{{ opcional.tipo }}</span>
      </q-card>
    </div>
    <!-- {{ { carnes, opcionais, paes} }} -->
    <q-btn class="q-ma-md send" style="height:70px" color="green" @click.prevent="createOrder()">Enviar<q-icon name="send" style="margin-left:10px;"/></q-btn>
  </div>

</template>

<script>
// import { ref } from 'vue'
import {
  QCard,
  QSeparator
  // QRadio,
  // QInput
} from 'quasar'

export default {
  components: {
    QCard,
    QSeparator
    // QInput
    // QRadio
  },
  data () {
    return {
      shape: '',
      paes: [],
      carnes: [],
      opcionaisdata: null,
      paodata: null,
      carnesdata: null,
      opcionais: [],
      status: 'Solicitado',
      msg: null
    }
  },
  methods: {
    async getIngredients () {
      const req = await fetch('http://localhost:3000/ingredientes')
      const data = await req.json()
      this.paodata = data.paes
      this.carnesdata = data.carnes
      this.opcionaisdata = data.opcionais
    },
    async createOrder (event) {
      const data = {
        carne: this.carnes,
        pao: this.paes,
        opcionais: Array.from(this.opcionais),
        status: 'Solicitado'
      }

      const dataJson = JSON.stringify(data)

      const req = await fetch('http://localhost:3000/burgers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: dataJson
      })

      const res = await req.json()

      console.log(res)

      // this.msg = "Pedido realizado com sucesso!"

      // clear message
      // setTimeout(() => this.msg = "", 3000)

      // limpar campos
      this.carnes = ''
      this.paes = ''
      this.opcionais = []
    }
  },
  mounted () {
    this.getIngredients()
  },
  watch: {
    paes () {
      if (this.paes.length > 1) {
        console.log('Certeza que gostaria de adicionar mais de um tipo de pão?')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile {
  width:130px;
  height:150px;
}

@media screen and (max-width: 600px) {
  .mobile {
    width: 100%;
  }
  .send {
    margin:20px 0 20px;
    width: 100%;
    height: 50px;
  }
}
</style>
