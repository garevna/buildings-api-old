<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" lg="7">
        <div id="dgtek-container-for-map"></div>
      </v-col>
      <v-col cols="12" lg="5" v-if="ready">
        <AddressInfo
          v-if="!diagnostics"
          :buildingId.sync="selectedBuildingId"
          :search="search"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>

<script>

import Map from '@/components/map.js'
import AddressInfo from '@/components/AddressInfo.vue'

export default {
  name: 'Buildings',

  components: {
    AddressInfo
  },

  props: ['buildingId'],

  data: () => ({
    container: null,
    map: null,
    ready: false,
    diagnostics: false,
    diagnosticsDone: false,
    selectedBuildingId: null,
    selectedBuilding: null,
    newMarker: false,
    showAddressLevels: false
  }),

  computed: {
    search: {
      get () {
        return !this.selectedBuildingId
      },
      set (val) {
        if (!val) return
        this.selectedBuildingId = null
        this.map.resetSelectedMarker()
      }
    },
    save: {
      get () {
        return this.saveData
      },
      set (val) {
        this.$emit('update:saveData', val)
      }
    },
    mapIsReady () {
      return this.ready && this.map && this.Autocomplete
    }
  },

  watch: {
    search (val) {
      if (val) {
        this.selectedBuilding = null
        localStorage.setItemByName('selectedBuilding', null)
        this.$emit('update:buildingSelected', false)
      }
    },
    selectedBuildingId (val) {
      this.$emit('update:buildingId', val)
    },
    newMarker (val) {
      if (!val) return
      this.map.placeMarker(val)
      this.newMarker = false
    },

    diagnosticsDone (val) {
      if (val) this.diagnostics = false
    }
  },

  methods: {

    readyCallback (event) {
      this.ready = true
    },

    async selectedBuildingCallback (event) {
      if (!event.details.id) return
      const buildingData = await this._getBuildingDetails(event.details.id)
      this.selectedBuildingId = event.details.id
      localStorage.setItemByName('selectedBuilding', buildingData)
      this.$emit('update:buildingSelected', true)
    },

    resetSelectedBuildingCallback (event) {
      this.selectedBuilding = null
      localStorage.setItemByName('selectedBuilding', null)
      this.$emit('update:buildingSelected', false)
    },

    // markerPositionChangedHandler (event) {
    //   this.selectedBuilding.coordinates = Object.assign([], event.details.markerCoordinates)
    // },

    emptySpaceClick (event) {
      this.selectedBuildingId = null
      this.selectedBuilding = null
      localStorage.setItemByName('selectedBuilding', null)
      this.$emit('update:buildingSelected', false)
    },

    initMap () {
      const container = document.getElementById('dgtek-container-for-map')
      if (container) {
        this.container = container
      } else {
        this.container = document.body.appendChild(document.createElement('div'))
        this.container.id = 'dgtek-container-for-map'
      }

      this.container.addEventListener('map-is-ready', this.readyCallback.bind(this))
      this.container.addEventListener('marker-selected', this.selectedBuildingCallback.bind(this))
      this.container.addEventListener('reset-selected-marker', this.resetSelectedBuildingCallback.bind(this))
      // this.container.addEventListener('marker-position-changed', this.markerPositionChangedHandler.bind(this))
      this.container.addEventListener('empty-field-click', this.emptySpaceClick)
      this.container.addEventListener('new-marker', this.addNewMarker)

      this.map = new Map({
        container: this.container,
        width: window.innerWidth / 1.5,
        height: 700,
        center: { lat: -37.8357725, lng: 144.9738764 }
      })

      this.$root.$map = this.map

      this.container.addEventListener('marker-type-changed', this.map.changeMarkerType.bind(this.map))
      this.container.addEventListener('marker-address-changed', this.map.changeMarkerAddress.bind(this.map))
      this.container.addEventListener('marker-coordinates-changed', this.map.changeMarkerCoordinates.bind(this.map))

      this.ready = true
    }
  },

  mounted () {
    window.addEventListener('data-ready', this.initMap)
  }
}
</script>
