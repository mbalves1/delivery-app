<template>
  <div>
    <q-card
      class="flex row items-center justify-center q-mr-lg q-mt-sm mobile"
    >
      <q-img :src="image" style="width:100px" class="q-mb-md"/>
      <div class="flex align-items-center justify-center checkbox">

        <span>R$ {{ valueprice }}</span>
      </div>
      <span>{{ nameproduct }}</span>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: false
    },
    name: {
      type: Object,
      required: false
    },
    value: {
      type: Array,
      required: false
    },
    array: {
      type: Array,
      required: false
    },
    valueprice: {
      type: Number
    },
    nameproduct: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.mobile {
  width:130px;
  height:190px;
}

</style>
