<template>
  <div>
    <span class="flex q-ml-md">
      <h3 class="q-ml-lg q-mx-ms">Overview</h3>
    </span>
    <q-separator />
    <div class="">
      <div class="flex justify-around align-center q-ma-lg">
        <q-card class="cardSize flex q-pa-lg row wrap justify-around items-center content-start" style="background: #9FD9F4;maxWidth: 200px">
          <q-img src="../static/pan.svg" style="width:55px; height:50px; border-radius: 18px;background: #9FD9F4;" class="col-2 "/>
          <span class="flex items-center">{{maxPanSale[0]}} </span>
          <span class="" style="fontSize: 24px; fontWeight: bold">{{panValue}}{{valuePan}}</span>
          <span class="">{{quantity}}un</span>
        </q-card>
        <q-card class="cardSize flex q-pa-lg row wrap justify-around items-center content-start" style="background: #9FD9F4;maxWidth: 200px">
          <q-img src="../static/pan.svg" style="width:55px; height:50px; border-radius: 18px;background: #9FD9F4;" class="col-2 "/>
          <span class="flex items-center">{{maxPanSale[0]}} </span>
          <span class="" style="fontSize: 24px; fontWeight: bold">$1200</span>
          <span class="">{{quantity}}un</span>
        </q-card>
        <q-card class="cardSize flex q-pa-lg row wrap justify-around items-center content-start" style="background: #9FD9F4;maxWidth: 200px">
          <q-img src="../static/pan.svg" style="width:55px; height:50px; border-radius: 18px;background: #9FD9F4;" class="col-2 "/>
          <span class="flex items-center">{{maxPanSale[0]}} </span>
          <span class="" style="fontSize: 24px; fontWeight: bold">$1200</span>
          <span class="">{{quantity}}un</span>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  created () {
    this.getBurguersDashboard()
  },
  data () {
    return {
      order: []
    }
  },
  computed: {
    panTest () {
      const order = this.order.filter(item => item.pao)
      const pan = order.map(item => item.pao.map(item => item.tipo))
      const m = [].concat(...pan)
      const n = m.reduce((prev, cur) => {
        prev[cur] = (prev[cur] || 0) + 1
        return prev
      }, {})
      return n
    },
    maxPanSale () {
      const maxPan = this.panTest
      const maxSale = Object.keys(maxPan).sort((a, b) => {
        return maxPan[a] > maxPan[b] ? -1 : maxPan[b] > maxPan[a] ? 1 : 0
      }, [0])
      return maxSale
    },
    quantityPan () {
      const pan = this.panTest
      const maxSale = Object.values(pan).sort((a, b) => {
        return pan[a] > pan[b] ? -1 : pan[b] > pan[a] ? 1 : 0
      }, [0])
      // return maxSale
      return maxSale
    },
    quantity () {
      const quantity = this.quantityPan.filter(x => x > 0)
      const result = (quantity || []).reduce((a, b) => {
        return Math.max(a, b)
      }, 0)
      return result
    },
    // value
    panValue () {
      const order = this.order.filter(item => item.pao)
      const pan = order.map(item => item.pao.map(item => item.price))
      const m = [].concat(...pan)
      const n = m.reduce((prev, cur) => {
        prev[cur] = (prev[cur] || 0) + 1
        return prev
      }, {})
      return n
    },
    valuePan () {
      const max = Object.entries(this.panValue)
      max.map(item => {
        return [...Array(max[item])]
      })
      console.log(max)
      return max
    }
  },
  methods: {
    async getBurguersDashboard () {
      const req = await fetch('http://localhost:3333/burgers')
      const data = await req.json()
      // console.log(data)
      this.order = data
    }
  }
}
</script>

<style lang="scss" scoped>
.cardSize {
  width: 25%;
  height: 130px;
  border-radius: 35px;
}
</style>
