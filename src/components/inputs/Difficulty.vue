<template>
  <v-row class="text-center mx-auto">
    <v-col cols="5">
      <div>
        <span class="caption text-uppercase">{{ label }}:</span>
        <span class="font-weight-bold">
          {{ value }}
        </span>
      </div>
      <v-slider
        v-model="difficulty"
        color="#09b"
        min="1"
        max="10"
      ></v-slider>
    </v-col>
    <v-col cols="7">
      <v-rating
        v-model="difficulty"
        length="10"
        full-icon="$block"
        empty-icon="$empty"
        color="red lighten-3"
        background-color="grey lighten-1"
        :label="label"
      ></v-rating>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Difficulty',
  props: ['label', 'value'],
  data () {
    return {
      data: null,
      rating: 0,
      level: 0
    }
  },
  computed: {
    difficulty: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('update:value', val)
      }
    }
  }
}
</script>
