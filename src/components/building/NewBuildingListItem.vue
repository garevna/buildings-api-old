<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card flat class="pa-4">
      <v-card-title>
        <h3 :style="{ color: invalidAddress ? '#900' : '#09b' }">
          {{ editedItem.address }}
        </h3>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('update:opened', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>

      <v-card-text>
        <table with="100%">
          <tbody>
            <tr>
              <td style="width: 140px">
                <v-text-field
                  v-model="editedItem.addressComponents.number"
                  label="Street number*"
                  placeholder="Number"
                  color="#09b"
                  prepend-inner-icon="$marker"
                  outlined
                />
              </td>
              <td colspan="2">
                <v-text-field
                  v-model="editedItem.addressComponents.street"
                  label="Street name*"
                  placeholder="Name"
                  color="#09b"
                  prepend-inner-icon="$marker"
                  outlined
                />
              </td>
            </tr>
            <tr>
              <td colspan="3">
                <v-text-field
                  v-model="editedItem.addressComponents.city"
                  label="City*"
                  color="#09b"
                  prepend-inner-icon="$marker"
                  outlined
                />
              </td>
            </tr>
            <tr>
              <td>
                <!-- <v-text-field
                  v-model="editedItem.state"
                  label="State*"
                  placeholder="VIC"
                  color="#09b"
                  prepend-inner-icon="$marker"
                  outlined
                /> -->
                <v-select
                  v-model="editedItem.addressComponents.state"
                  :items="administrativeAreas"
                  label="State"
                  single-line
                  outlined
                ></v-select>
              </td>
              <td style="width: 140px">
                <v-text-field
                  v-model="editedItem.addressComponents.postCode"
                  label="Postal code*"
                  placeholder="3182"
                  color="#09b"
                  prepend-inner-icon="$marker"
                  outlined
                />
              </td>
              <td></td>
            </tr>
            <tr>
              <td colspan="3">
                <v-text-field
                  v-model="editedItem.buildingName"
                  label="Building Name (optional)"
                  color="#09b"
                  outlined
                />
              </td>
            </tr>
          </tbody>
        </table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="addressReady"
          dark
          color="#09b"
          @click="validateAddress"
        >
          Validate address
          <v-icon
            right
            dark
          >
            $diagnostics
          </v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-text v-if="addressReady">
        <h5>Coordinates</h5>
        <table>
          <thead>
            <tr>
              <th>Lat</th>
              <th>Lng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ editedItem.coordinates[1] }}</td>
              <td>{{ editedItem.coordinates[0] }}</td>
            </tr>
          </tbody>
        </table>
      </v-card-text>
      <v-card-text v-if="editedItem.coordinates[0]">
        <v-select
          :items="$buildingTypes"
          label="Status"
          v-model="editedItem.status"
          outlined
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="canSave"
          dark
          color="#09b"
          @click="saveCallback"
        >
          Save
          <v-icon
            right
            dark
          >
            $save
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'EditBuildingListItem',

  props: ['opened', 'save'],

  data: () => ({
    administrativeAreas: require('@/config/administrativeAreasAU').default,
    editedItem: require('@/config/newBuilding.js').default,
    invalidAddress: true,
    canSave: false
  }),

  computed: {
    addressReady () {
      return this.editedItem.addressComponents.postCode &&
        this.editedItem.addressComponents.state &&
        this.editedItem.addressComponents.city &&
        this.editedItem.addressComponents.street &&
        this.editedItem.addressComponents.number
    },
    address () {
      const { number = '', street = '', city = '', state = '', postCode = '' } = this.editedItem.addressComponents
      return `${number} ${street}, ${city} ${state} ${postCode}`
    },
    dialog: {
      get () {
        return this.opened
      },
      set (val) {
        this.$emit('update:opened', val)
      }
    },
    coordinates: {
      get () {
        return this.editedItem.coordinates
      },
      set (val) {
        Object.assign(this.editedItem, { coordinates: val })
      }
    }
  },
  watch: {
    opened (val) {
      this.editedItem = require('@/config/newBuilding.js').default
    }
  },
  methods: {
    async validateAddress () {
      const options = {
        streetNumber: this.editedItem.addressComponents.number,
        streetName: this.editedItem.addressComponents.street,
        locality: this.editedItem.addressComponents.city,
        state: this.editedItem.addressComponents.state,
        postCode: this.editedItem.addressComponents.postCode
      }
      const validationResult = await this._validateAddress(options)
      if (validationResult.error) {
        this.invalidAddress = true
        return
      }
      Object.assign(this.editedItem, {
        address: validationResult.formattedAddress,
        coordinates: validationResult.formattedCoordinates,
        addressComponents: validationResult.properties
      })
      this.canSave = true
    },
    async saveCallback () {
      localStorage.setItemByName('selectedBuilding', this.editedItem)
      const response = await this._createNewBuilding(this.editedItem)
      if (response.error) {
        this.$root.$emit('error-event', {
          type: 'Error while creating new building',
          message: 'Saving building\' data failed'
        })
      }

      this.$root.$emit('message-event', {
        type: 'Success',
        message: 'New building was created'
      })

      localStorage.setItemByName('selectedBuilding', Object.assign(this.editedItem, { _id: response.data }))
      localStorage.setBuilingsListItem(response.data, this.editedItem)
      this.$emit('update:save', true)
      this.$emit('update:opened', false)
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
}
th, td {
  min-width: 140px;
  text-align: center;
}
</style>
