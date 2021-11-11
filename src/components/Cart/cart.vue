<template>
  <div>
    <q-item class="flex justify-between align-center q-ma-sm cart">
      <div class="flex">
        <q-img :src="image" style="width:50px;"/>
        <div class="flex q-pl-md flex align-center column">
          <span class="flex align-center column justify-between">{{ tipo }}</span>
          <span>R$ {{ price }}</span>
        </div>
      </div>
      <!-- <q-icon @click="remove(paes, index)" name="cancel"/> -->
      <q-icon @click="removeEvent" name="cancel"/>
    </q-item>
  </div>
</template>

<script>
// Quasar
import {
  QItem,
  QImg
} from 'quasar'

export default {
  components: {
    QItem,
    QImg
  },
  props: {
    image: {
      type: String,
      required: false
    },
    tipo: { String },
    price: { Number }
  },
  methods: {
    removeEvent () {
      this.$emit('remove-item')
    }
  }
}
</script>

<style lang="scss" scoped>
.cart {
  background:#fff;
  border:1px solid #ebebeb;
  border-left: 5px solid #FFDB3D;
  border-radius: 5px;
}
.tipo {

}

</style>
