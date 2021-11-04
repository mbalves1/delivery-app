<template>
  <div class="q-px-lg" style="background:#FFF">
    <span class="flex q-ml-md">
      <h3 class="q-ml-lg q-mx-ms">Burguers<q-img src="../static/burguer.webp" style="height: 48px; width:48px; border-radius:50%" class="q-ml-md"/></h3>
    </span>
    <q-separator />
    <div class="initial q-px-lg">
      <q-scroll-area class="q-mr-md q-mt-lg full-height">

        <h5 class="q-ma-lg">
          Qual o pão:
        </h5>
        <item-card
          v-for="(pao, id) in paodata"
          :key="id"
          :valueprice="pao.price"
          name="pao"
          :nameproduct="pao.tipo"
          :image="pao.image"
          @click="cardTal(paes, pao)"
        />
        <h5 class="q-ma-lg">
          Qual a carne:
        </h5>
        <item-card
          v-for="(carne, id) in carnesdata"
          :key="id"
          :value="carnes"
          :valueprice="carne.price"
          :array="carnes"
          :name="carne"
          :nameproduct="carne.tipo"
          :image="carne.image"
          @click="cardTal(carnes, carne)"
        />
        <h5 class="q-ma-lg q-px-lg">
          Adicionais:
        </h5>
        <div class="flex">
          <q-card
            v-for="(opcional, id) in opcionaisdata"
            :key="id"
            style="width:150px;height:50px"
            class="flex column items-center justify-center q-ml-lg q-mt-sm"
            @click="cardTal(opcional)">
            <q-separator class="q-mt-lg"/>
            <div class="flex align-items-center justify-center checkbox q-pb-sm">
              <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional" class="align-items-center">
              <span class="justify-between q-ml-sm align-items-center">R$ {{ opcional.price }}</span>
              <span class="justify-between q-ml-sm align-items-center">{{ opcional.tipo }}</span>
            </div>
          </q-card>
        </div>
        <!-- {{ { carnes, opcionais, paes} }} -->
      </q-scroll-area>
      <q-item-section  v-if="true" style="border:1px solid #ebebeb; min-height: 650px; background:rgb(233, 233, 233);" class="flex justify-between q-mt-lg">
        <q-item-label class="q-pa-md" style="fontSize:20px;">Carrinho
          <q-separator class="q-mt-md"></q-separator>
        </q-item-label>
        <q-list class="scrollLits">
          <q-item v-for="pao in paes" :key="pao.id" class="flex q-ma-sm" style="background:#fff;border:1px solid #ebebeb; border-left: 5px solid #FFDB3D; border-radius: 5px;">
            <q-img :src="pao.image" style="width:50px;"/>
            <div class="flex column q-pl-md">
              <span class="flex align-center">{{pao.tipo}}</span>
              <span>R$ {{ pao.price }}</span>
            </div>
          </q-item>
          <q-item v-for="carne in carnes" :key="carne.id" class="flex border q-ma-sm" style="background:#fff;border:1px solid #ebebeb; border-left: 5px solid #FFDB3D; border-radius: 5px;">
            <q-img :src="carne.image" style="width:50px;"/>
            <div class="flex column q-pl-md">
              <span class="flex align-center">{{carne.tipo}}</span>
              <span>R$ {{ carne.price }}</span>
            </div>
          </q-item>
          <q-item v-for="item in opcionais" :key="item.id" class="flex border q-ma-sm" style="background:#fff;border:1px solid #ebebeb; border-left: 5px solid #FFDB3D; border-radius: 5px;">
            <div class="flex row q-pl-md">
              <span class="flex align-center q-mr-md">{{item.tipo}}</span>
              <span>R$ {{ item.price }}</span>
            </div>
          </q-item>
        </q-list>
        <div v-if="true" class="flex column q-mb-sm">
          <div class="flex justify-around q-mb-md">
            <span style="fontWeight: bold; fontSize: 20px">Total</span>
            <span style="fontWeight: bold; fontSize: 20px">R$ {{ total }}</span>
          </div>
          <q-btn
            class="send"
            style="height:70px"
            color="green"
            @click.prevent="createOrder()">Enviar<q-icon
            name="send"
            style="margin-left:10px;"/></q-btn>
        </div>
      </q-item-section>
      <div v-else class="flex justify-center align-items-center imageOrderNull" style="height:550px;">
        <q-img src="../static/cloche.jpg" style="width:200px;height:100px"/>
      </div>
    </div>
  </div>

</template>

<script>
// import { ref } from 'vue'
import {
  QCard,
  QSeparator,
  QImg
} from 'quasar'

import ItemCard from './itemCard.vue/itemCard.vue'

export default {
  components: {
    QCard,
    QSeparator,
    QImg,
    ItemCard

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
      msg: null,
      totalOrder: 0,
      arrayPedido: []
    }
  },
  mounted () {
    this.getIngredients()
  },
  computed: {
    total () {
      const arrayPaes = this.paes
      const arrayCarnes = arrayPaes.concat(this.carnes)
      const arrayOrder = arrayCarnes.concat(this.opcionais)
      console.log(arrayOrder)
      return arrayOrder.reduce((acc, item) => {
        return acc + item.price
      }, 0)
    }
  },
  methods: {
    cardTal (card, item) {
      card.push(item)
    },
    async getIngredients () {
      const req = await fetch('http://localhost:3333/ingredientes')
      console.log(req)
      const data = await req.json()
      this.paodata = data.paes
      this.carnesdata = data.carnes
      this.opcionaisdata = data.opcionais
    },
    async createOrder (event) {
      // this.paes.push(this.cardTal)
      console.log(this.arrayPedido)
      const data = {
        carne: this.carnes,
        pao: this.paes,
        opcionais: Array.from(this.opcionais),
        status: 'Solicitado',
        totalOrder: this.total
      }

      const dataJson = JSON.stringify(data)

      const req = await fetch('http://localhost:3333/burgers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: dataJson
      })

      await req.json()

      // this.msg = "Pedido realizado com sucesso!"

      // clear message
      // setTimeout(() => this.msg = "", 3000)

      // limpar campos
      this.carnes = ''
      this.paes = ''
      this.opcionais = []
      this.totalOrder = 0
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

.checkbox {
  display: flex;
  align-items: center;
}

.borderCart {
  border-left: 3px solid black;
}

.imageOrderNull {
  display: flex;
  align-items: center;
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

// keyframe float cloche
</style>
