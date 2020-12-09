<template>
  <v-container max-width="960">
    <v-row justify="center">
      <v-col
        cols="6"
        md="3"
        v-for="option in Object.keys(availableBuildingTypes)"
        :key="option"
      >
        <v-overflow-btn
          class="my-2"
          :items="availableBuildingTypes[option]"
          :label="option"
          style="max-width: 380px; min-width: 180px"
          v-model="type[option]"
        ></v-overflow-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'BuildingTypes',
  props: ['buildingType'],
  data: () => ({
    type: {},
    lastTypeStringValue: ''
  }),
  watch: {
    type: {
      deep: true,
      handler (val) {
        let type = ''
        for (const key in this.availableBuildingTypes) {
          type += `${type.length > 0 ? ',' : ''}${key}=${val[key] || ''}`
        }
        this.$emit('update:buildingType', type)
      }
    },
    buildingType: {
      immediate: true,
      handler (val) {
        if (this.lastTypeStringValue === val) return
        this.type = val ? this.breakTypeString(val) : this.getDefaultTypeObject()
        this.lastTypeStringValue = val
      }
    }
  },
  methods: {
    getDefaultTypeObject () {
      return Object.assign({}, ...Object.keys(this.availableBuildingTypes).map(option => ({ [option]: '' })))
    },
    breakTypeString (string) {
      const type = Object.assign({}, ...string.split(',').map(item => Object.assign({}, { [item.split('=')[0]]: item.split('=')[1] })))
      return Object.assign({}, this.getDefaultTypeObject(), type)
    }
  }
}
</script>

<style>
</style>
