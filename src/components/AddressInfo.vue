<template>
  <v-card v-if="ready || search" class="mt-12">
    <v-select
      v-if="!search"
      :items="types"
      label="Status"
      v-model="status"
      outlined
      class="mx-4"
    ></v-select>

    <v-card-text class="mx-auto px-auto">
      <InputWithAutocomplete
        :address.sync="buildingDescription.address"
        :coordinates.sync="buildingDescription.coordinates"
        :properties.sync="buildingDescription.addressComponents"
        :search="search"
      />
    </v-card-text>

    <v-card-text class="text-center">
      <h4>Address components</h4>
    </v-card-text>

    <AddressDetails
      v-if="addressComponents"
      :number="addressComponents.number"
      :street="addressComponents.street"
      :city="addressComponents.city"
      :state="addressComponents.state"
      :admin="addressComponents.admin"
      :postCode="addressComponents.postCode"
    />
    <v-card-text class="text-center">

      <v-btn
        text
        v-if="newMarkerButton"
        @click="createNewMarker"
      >
        Add this address
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<style>

.input-field-simple {
  outline: none;
  width: 100%;
  padding: 8px 16px;
  border: solid 1px #bbb;
  border-radius: 8px;
}
.input-field-simple:focus {
  outline: none;
  border: solid 1px #09b;
}

.text-left {
  text-align: left !important;
}
.text-right {
  text-align: right !important;
}

.vs__clear {
  display: none!important;
}

.vs--searchable .vs__dropdown-toggle {
    cursor: pointer!important;
    padding: 16px!important;
    background-color: #09b!important;
    color: #fff!important;
}

.vs--single .vs__selected {
    background-color: transparent;
    border-color: transparent;
    color: #fff;
}

#vs1__listbox {
  line-height:180%;
}

</style>

<script>

import InputWithAutocomplete from '@/components/InputWithAutocomplete.vue'
import AddressDetails from '@/components/AddressDetails.vue'

export default {
  name: 'AddressInfo',

  components: {
    InputWithAutocomplete,
    AddressDetails
  },

  props: ['buildingId', 'search'],

  data () {
    return {
      newBuilding: require('@/config/newBuilding.js').default,
      ready: false,
      removeMarker: false,
      newMarker: false,
      saveChanges: false,
      types: localStorage.$buildingTypes,
      buildingDescription: null,
      autocomplete: null,
      message: '',
      first: '',
      second: '',
      third: '',
      addressDescriptionVisible: false
    }
  },

  computed: {
    newMarkerButton () {
      return !this.buildingId && !!this.buildingDescription.address && !!this.buildingDescription.coordinates
    },
    status: {
      get () {
        return this.buildingId && this.buildingDescription ? this.buildingDescription.status : null
      },
      set (val) {
        if (!val) return
        this.buildingDescription.status = val
        localStorage.updateMarkerType(val)
        this.$root.$map[this.buildingId].status = val
        Object.assign(this.buildingDescription, { status: val })
      }
    },
    addressComponents () {
      return this.buildingDescription ? this.buildingDescription.addressComponents
        : { address: '', addressComponents: {}, coordinates: [] }
    }
  },

  watch: {
    addressComponents: {
      deep: true,
      handler (val) {
        if (this.buildingDescription && this.buildingDescription.addressComponents) {
          Object.assign(this.buildingDescription.addressComponents, val)
        }
      }
    },
    buildingDescription: {
      deep: true,
      handler (val) {
        if (!val) { return }
        localStorage.setItemByName('selectedBuilding', val)
        this.$emit('update:descriptionChanged', true)
      }
    },
    buildingId: {
      immediate: true,
      handler (newVal, oldVal) {
        this.ready = false
        if (!newVal || !this.buildingId) {
          this.buildingDescription = this.newBuilding
          return
        }
        this.buildingDescription = localStorage.getItemByName('selectedBuilding')
        this.ready = true
      }
    },

    removeMarker (val) {
      if (!val || !this.buildingId) return
      this.$parent.map.removeMarker(this.buildingId)
      localStorage.removeBuilding(this.buildingId)
      this.removeMarker = false
      this.$emit('update:buildingId', undefined)
    },

    saveChanges (val) {
      if (val) {
        const response = this._saveBuilding()
        if (!response.error) {
          this.$root.$emit('message-event', {
            type: 'Success',
            message: 'Building data saved'
          })
        } else {
          this.$root.$emit('error-event', {
            type: 'Data save error',
            message: 'Error saving building\' data'
          })
        }
      }
      this.saveChanges = false
    }
  },

  methods: {
    createNewMarker () {
      if (!this.buildingDescription) return console.warn('Not available!')
      this.$root.$map.resetSearchMarker()
      this.createNewBuilding().then(() => {
        this.newMarker = false
      })
    },
    async createNewBuilding () {
      const map = this.$root.$map
      const placeMarker = map.placeMarker.bind(map)
      const selectMarkerById = map.selectMarkerById.bind(map)

      const building = this.newBuilding
      Object.assign(building, this.buildingDescription, { status: this.$buildingTypes.default })
      building._id = await this._createNewBuilding(building)
      if (!building._id) throw new Error('Server error:\nBuilding was not created')
      Object.assign(this.$parent, {
        selectedBuildingId: building._id,
        selectedBulding: building
      })
      const { address, coordinates, status, _id: id } = building

      map[id] = placeMarker({ address, coordinates, status, id })
      selectMarkerById(id)
      return building
    }
  },

  beforeMount () {
    this.buildingDescription = this.buildingId ? localStorage.getItemByName(this.buildingId) : {}
  }
}
</script>
