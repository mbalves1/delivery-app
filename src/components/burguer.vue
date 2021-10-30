<template>
  <div class="q-mx-lg">
    <span class="flex q-ml-md">
      <h3 class="q-ml-lg q-mx-ms">Burguers<q-img src="../static/burguer.webp" style="height: 48px; width:48px; border-radius:50%" class="q-ml-md"/></h3>
    </span>
    <q-separator />
    <div class="initial">
      <q-scroll-area class="q-mr-md q-mt-lg full-height scroll-y">

        <h5 class="q-ma-lg">
          Qual o pão:
        </h5>
        <div class="flex">
          <q-card
            v-for="(pao, id) in paodata"
            :key="id"
            class="flex column items-center justify-center q-mr-lg q-mt-sm mobile">
            <q-img :src="pao.image" style="width:100px" class="q-mb-md"/>
            <input type="checkbox" name="pao" v-model="paes" :value="pao"/>
              <!-- <q-icon name="lunch_dining" size="50px" color="grey"/> -->
            <span style="margin-top:20px">{{ pao.tipo }}</span>
          </q-card>
        </div>
        <h5 class="q-ma-lg">
          Qual a carne:
        </h5>
        <div class="flex">
          <q-card
            v-for="(carne, id) in carnesdata"
            :key="id"
            class="flex column items-center justify-center q-mr-lg q-mt-sm mobile">
            <q-img :src="carne.image" style="width:100px" class="q-mb-md"/>
            <q-separator class="q-mt-lg"/>
            <input type="checkbox" name="carne" v-model="carnes" :value="carne">
            <span style="margin-top:20px">{{ carne.tipo }}</span>
          </q-card>
        </div>
        <h5 class="q-ma-lg">
          Adicionais:
        </h5>
        <div class="flex">
          <q-card
            v-for="(opcional, id) in opcionaisdata"
            :key="id"
            style="width:150px;height:50px"
            class="flex column items-center justify-center q-ml-lg q-mt-sm">
            <q-separator class="q-mt-lg"/>
            <div class="flex">
              <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional" class="width: 50px">
              <span class="justify-between q-ml-md">{{ opcional.tipo }}</span>
            </div>
          </q-card>
        </div>
        <!-- {{ { carnes, opcionais, paes} }} -->
      </q-scroll-area>
      <q-item-section style="border:1px solid #ebebeb; height: 550px" class="flex justify-between q-mt-lg">
        <q-list>
          <q-item v-for="pao in paes" :key="pao.id" class="flex border q-ma-sm" style="border:1px solid #ebebeb">
            <q-img :src="pao.image" style="width:50px;"/>
            <div class="flex column q-pl-md">
              <span class="flex align-center">{{pao.tipo}}</span>
              <span>R$ {{ pao.price }}</span>
            </div>
          </q-item>
          <q-item v-for="carne in carnes" :key="carne.id" class="flex border q-ma-sm" style="border:1px solid #ebebeb">
            <q-img :src="carne.image" style="width:50px;"/>
            <div class="flex column q-pl-md">
              <span class="flex align-center">{{carne.tipo}}</span>
              <span>R$ {{ carne.price }}</span>
            </div>
          </q-item>
          <q-item v-for="item in opcionais" :key="item.id" class="flex border q-ma-sm" style="border:1px solid #ebebeb">
            <q-img :src="item.image" style="width:50px;"/>
            <div class="flex column q-pl-md">
              <span class="flex align-center">{{item.tipo}}</span>
              <span>R$ {{ item.price }}</span>
            </div>
          </q-item>
        </q-list>
        <q-btn
          class="q-ma-md send"
          style="height:70px"
          color="green"
          @click.prevent="createOrder()">Enviar<q-icon
          name="send"
          style="margin-left:10px;"/></q-btn>
      </q-item-section>
    </div>
  </div>

</template>

<script>
// import { ref } from 'vue'
import {
  QCard,
  QSeparator,
  QImg
  // QRadio,
  // QInput
} from 'quasar'

export default {
  components: {
    QCard,
    QSeparator,
    QImg
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
  mounted () {
    this.getIngredients()
  },
  computed: {
    total () {
      return this.carnes
    }
  },
  methods: {
    async getIngredients () {
      const req = await fetch('http://localhost:3333/ingredientes')
      console.log(req)
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

      const req = await fetch('http://localhost:3333/burgers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: dataJson
      })
      console.log(req)

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
  height:190px;
}

.hover:hover {
  background: rgb(233, 233, 233);
}

.initial {
  display: grid;
  grid-template-columns: 3fr 1fr;
}

input[type=checkbox] {
  transform: scale(1.5);
  padding: 5px;
  cursor: pointer;
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
