<template>
  <div class="">
    <q-card
      class="flex items-center justify-center q-mr-lg q-mt-sm mobile"
      style="cursor:pointer;"
    >
    <div>
      <q-img :src="image" style="width:100px" class="q-mb-md"/>
    </div>
    <q-separator></q-separator>
    <div class="card q-px-sm">
      <div clas="flex column">
        <span class="flex align-items-center justify-center" style="color:black; fontWeight: 700;">{{ nameproduct }}</span>
        <span class="flex align-items-center justify-end q-pr-md" style="color:grey; fontWeight: 700;">R$ {{ valueprice }}</span>
      </div>
    </div>
    </q-card>
  </div>
</template>

<script>
import {
  QSeparator
} from 'quasar'
export default {
  components: {
    QSeparator
  },
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

.card {
  height: 50px;
  padding: 0;
  width: 100%;
  margin: 0;
}

.card:hover {
  background: rgb(241, 241, 241);
}

.mobile:hover {
  // box-shadow: none;
  // border: 1px solid rgb(201, 201, 201);
}

</style>
