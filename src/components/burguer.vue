<template>
  <div class="q-pl-lg" style="background:#FFF">
    <span class="flex q-ml-md">
      <h3 class="q-ml-lg ">Burguers<q-img src="../static/burguer.webp" style="height: 48px; width:48px; border-radius:50%" class="q-ml-md"/></h3>
    </span>
    <q-separator />
    <div class="flex row initial q-pl-lg">
      <div class="scrollbar" style="height: 80vh;overflow-y:scroll">
        <div class="q-mr-md q-mt-lg full-height">

          <h5 class="q-ma-lg">
            Qual o pão:
          </h5>
          <div class="flex row q-ml-md">
            <item-card
              v-for="(pao, id) in paodata"
              :key="id"
              :valueprice="pao.price"
              name="pao"
              :nameproduct="pao.tipo"
              :image="pao.image"
              @click="cardTal(paes, pao)"
              class="flex row"
            />
          </div>

          <h5 class="q-ma-lg">
            Qual a carne:
          </h5>
          <div class="flex q-mx-md">
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
          </div>
          <h5 class="q-ma-lg q-px-lg">
            Adicionais:
          </h5>
          <div class="flex q-mx-md q-mb-md q-pb-lg">
            <item-card
              v-for="(opcional, id) in opcionaisdata"
              :key="id"
              :value="opcionais"
              :valueprice="opcional.price"
              :array="opcionais"
              :name="opcional"
              :nameproduct="opcional.tipo"
              :image="opcional.image"
              @click="cardTal(opcionais, opcional)"
            />
          </div>
          <!-- {{ { carnes, opcionais, paes} }} -->
        </div>
      </div>
      <div class="full-height">
        <q-item-section  v-if="total != 0" style="border:1px solid #ebebeb; min-height: 650px; background:rgb(233, 233, 233);" class="flex justify-between">
          <q-item-label class="q-pa-md" style="fontSize:20px;">Carrinho
            <!-- <span>icon</span> -->
            <q-separator class="q-mt-md"></q-separator>
          </q-item-label>
          <q-list class="scrollLits">
            <cart
              v-for="(pao, index) in paes"
              :key="index"
              :image="pao.image"
              :price="pao.price"
              :tipo="pao.tipo"
              @remove-item="remove(paes, index)"
            />
            <cart
              v-for="(carne, index) in carnes"
              :key="index"
              :image="carne.image"
              :price="carne.price"
              :tipo="carne.tipo"
              @remove-item="remove(carnes, index)"
            />
            <cart
              v-for="(item, index) in opcionais"
              :key="index"
              :image="item.image"
              :price="item.price"
              :tipo="item.tipo"
              @remove-item="remove(opcionais, index)"
            />
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
  </div>

</template>

<script>
// import { ref } from 'vue'

// Libs
import moment from 'moment'

import {
  QSeparator,
  QImg
} from 'quasar'

import ItemCard from './itemCard/itemCard.vue'
import Cart from './Cart/cart.vue'

export default {
  components: {
    QSeparator,
    QImg,
    ItemCard,
    Cart

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
      arrayPedido: [],
      dateSale: ''
    }
  },
  mounted () {
    this.getIngredients()
  },
  computed: {
    total () {
      // const arrayPaes = this.paes
      // const arrayCarnes = arrayPaes.concat(this.carnes)
      const arrayOrder = [].concat(this.opcionais, this.carnes, this.paes)
      return arrayOrder?.reduce((acc, item) => {
        return acc + item.price
      }, 0)
    }
  },
  methods: {
    cardTal (card, item) {
      card.push(item)
    },
    remove (card, index) {
      card.splice(index, 1)
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
      const endOfDay = moment().format('DD/MM/YYYY')
      console.log('aqui', endOfDay)
      const data = {
        carne: this.carnes,
        pao: this.paes,
        opcionais: Array.from(this.opcionais),
        status: 'Solicitado',
        totalOrder: this.total,
        dateSale: endOfDay
      }

      const dataJson = JSON.stringify(data)

      const req = await fetch('http://localhost:3333/burgers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: dataJson
      })

      await req.json()

      console.log('obj', dataJson)
      // this.msg = "Pedido realizado com sucesso!"

      // clear message
      // setTimeout(() => this.msg = "", 3000)

      // limpar campos
      this.carnes = []
      this.paes = []
      this.opcionais = []
      this.totalOrder = 0
      this.total = 0
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

.scrollbar::-webkit-scrollbar-track {
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 30%, black 60%, #e3e3e3 61%, #e3e3e3 100%);
}

.scrollbar::-webkit-scrollbar {
  width: 4px;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: black;
  border-radius: 4px;
}

:root {
  --body-bg-color: #9e9898;
  --scroll-color: black;
  --scroll--hover-color: #666;
  --scroll-track-color: rgba(255,255,255,0);
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

  .initial {
    display: grid;
    grid-template-columns: 1fr;
  }

  .mobileViewCard {
    display: flex;
    flex-direction: row;
  }
}

// keyframe float cloche
</style>
