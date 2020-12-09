<template>
  <v-card flat>
    <v-card-text>
      <h3 :style="{ color: invalidAddress ? '#900' : '#09b' }">
        {{ address }}
      </h3>
    </v-card-text>
    <table>
      <tbody>
        <tr>
          <td>
            <v-text-field
              v-model="postCode"
              label="Postal code"
              outlined
            />
          </td>
          <td style="width: 120px">
            <v-select
              v-model="state"
              :items="administrativeAreas"
              label="State"
              single-line
              outlined
            ></v-select>
          </td>
          <td>
            <v-text-field
              v-model="city"
              label="Locality"
              outlined
            />
          </td>
          <td>
            <v-text-field
              v-model="street"
              label="Street name"
              outlined
            />
          </td>
          <td>
            <v-text-field
              v-model="number"
              label="Street number"
              outlined
            />
          </td>
          <td>
            <v-text-field
              v-model="buildingName"
              label="Building Name"
              outlined
            />
          </td>
          <td>
            <v-select
              :items="$buildingTypes"
              label="Status"
              v-model="status"
              outlined
            />
          </td>
          <td>
          </td>
        </tr>
      </tbody>
    </table>
    <v-card flat max-width="480" class="mx-auto">
      <table width="100%">
        <thead>
          <tr>
            <th>Lat</th>
            <th>Lng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-center" :style="{ color: invalidAddress ? '#900' : '#09b' }">
              {{ coordinates[1] }}
            </td>
            <td class="text-center" :style="{ color: invalidAddress ? '#900' : '#09b' }">
              {{ coordinates[0] }}
            </td>
          </tr>
        </tbody>
      </table>
    </v-card>
  </v-card>
</template>

<script>

export default {
  name: 'BuildingListItem',

  props: ['editedItem'],

  data: () => ({
    administrativeAreas: require('@/config/administrativeAreasAU').default,
    selectedBuildingData: null,
    invalidAddress: false
  }),

  computed: {
    address: {
      get () {
        return this.invalidAddress ? 'Invalid address' : this.editedItem.address
      },
      set (val) {
        this.updateBuildingData('address', val)
      }
    },
    postCode: {
      get () {
        return this.editedItem.postCode
      },
      set (val) {
        this.updateAddressComponents('postCode', val)
      }
    },
    state: {
      get () {
        return this.editedItem.state
      },
      set (val) {
        this.updateAddressComponents('state', val)
      }
    },
    city: {
      get () {
        return this.editedItem.city
      },
      set (val) {
        this.updateAddressComponents('city', val)
      }
    },
    street: {
      get () {
        return this.editedItem.street
      },
      set (val) {
        this.updateAddressComponents('street', val)
      }
    },
    number: {
      get () {
        return this.editedItem.number
      },
      set (val) {
        this.updateAddressComponents('number', val)
      }
    },
    buildingName: {
      get () {
        return this.editedItem.buildingName
      },
      set (val) {
        this.updateBuildingData('buildingName', val)
      }
    },
    status: {
      get () {
        return this.editedItem.status
      },
      set (val) {
        this.updateBuildingData('status', val)
      }
    },
    coordinates: {
      get () {
        return this.editedItem.coordinates
      },
      set (val) {
        this.updateBuildingData('coordinates', val)
      }
    }
  },

  watch: {
    'editedItem._id': {
      immediate: true,
      handler (val) {
        this.selectedBuildingData = localStorage.getItemByName('selectedBulding')
      }
    }
  },

  methods: {
    async updateAddressComponents (propName, propValue) {
      Object.assign(this.selectedBuildingData.addressComponents, { [propName]: propValue })
      Object.assign(this.editedItem, { [propName]: propValue })
      const options = {
        streetNumber: this.number,
        streetName: this.street,
        locality: this.city,
        state: this.state,
        postCode: this.postCode
      }
      const validationResult = await this._validateAddress(options)

      if (validationResult.error) {
        this.updateBuildingData('coordinates', ['error', 'error'])
        this.invalidAddress = true
        return
      }

      this.invalidAddress = false
      this.updateBuildingData('address', validationResult.formattedAddress)
      this.updateBuildingData('coordinates', validationResult.formattedCoordinates)

      localStorage.setItemByName('selectedBuilding', this.selectedBuildingData)
      this.$emit('update:editedItem', Object.assign(this.editedItem, { [propName]: propValue }))
    },

    updateBuildingData (propName, propValue) {
      Object.assign(this.selectedBuildingData, { [propName]: propValue })
      localStorage.setItemByName('selectedBuilding', this.selectedBuildingData)
      this.$emit('update:editedItem', Object.assign(this.editedItem, { [propName]: propValue }))
    }
  },

  mounted () {
    this._getBuildingDetails(this.editedItem._id)
      .then((response) => {
        this.selectedBuildingData = response
        localStorage.setItemByName('selectedBuilding', this.selectedBuildingData)
      })
  }
}
</script>
