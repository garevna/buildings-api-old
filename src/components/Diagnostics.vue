<template>
  <v-dialog v-model="opened" v-if="marker" max-width="600" height="100%">
    <v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="close = true">
          <v-icon large>$close</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-text>
        <h4>Actual</h4>
      </v-card-text>
      <v-card-text :style="{ color: validated ? '#090' : '#333'}">
        <p class="bordered">{{ marker.address }}</p>
      </v-card-text>
      <v-card-text class="text-center">
        <v-simple-table dense>
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="text-left"><b>lat:</b></td>
                <td class="text-right"><p class="bordered">{{ marker.coordinates[1] }}</p></td>
                <td class="text-left"><b>lng:</b></td>
                <td class="text-right"><p class="bordered">{{ marker.coordinates[0] }}</p></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-text>
        <h4>Formatted</h4>
      </v-card-text>
      <v-card-text :style="{ color: error ? '#a00' : '#09b' }">
        <p class="bordered">{{ formattedAddress }}</p>
      </v-card-text>
      <v-card-text class="text-center">
        <v-simple-table dense>
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="text-left"><b>lat:</b></td>
                <td class="text-right"><p class="bordered">{{ formattedCoordinates[1] }}</p></td>
                <td class="text-left"><b>lng:</b></td>
                <td class="text-right"><p class="bordered">{{ formattedCoordinates[0] }}</p></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card class="mb-2 mx-auto">
        <v-card-text class="text-center">
          <h4>Details for search:</h4>
        </v-card-text>
        <v-card-text class="text-center">
          <v-simple-table dense dark>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td class="text-left">Street</td>
                  <td class="text-right">{{ properties.number }} {{ properties.street }}</td>
                </tr>
                <tr>
                  <td class="text-left">City</td>
                  <td class="text-right">{{ properties.city }}</td>
                </tr>
                <tr>
                  <td class="text-left">Administrative area</td>
                  <td class="text-right">{{ properties.admin }}</td>
                </tr>
                <tr>
                  <td class="text-left">State</td>
                  <td class="text-right">{{ properties.state }}</td>
                </tr>
                <tr>
                  <td class="text-left">Postal code</td>
                  <td class="text-right">{{ properties.postCode }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
      <v-card-actions class="pb-10">
        <v-btn
          text
          @click="replace = true"
          v-if="!updateAll && !finished && marker.address !== formattedAddress"
        > UPDATE </v-btn>
        <v-spacer></v-spacer>
        <Button
          v-if="!updateAll && !finished"
          :clicked.sync="nextStep"
          text="Next"
          icon="rightArrow"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.text-left {
  text-align: left !important;
}
.text-right {
  text-align: right !important;
}
.text-center {
  text-align: center !important;
}
</style>

<script>

import Button from '@/components/Button.vue'

export default {
  name: 'Diagnostics',
  components: {
    Button
  },
  props: ['types', 'finished', 'opened'],
  data () {
    return {
      markerId: '',
      marker: null,
      properties: {
        number: '',
        street: '',
        city: '',
        admin: '',
        state: '',
        postCode: ''
      },
      replace: false,
      ready: false,
      nextStep: false,
      updateAll: false,
      close: false,
      formattedAddress: '',
      formattedCoordinates: ['', ''],
      syncIterator: null,
      asyncIterator: null,
      error: null
    }
  },
  computed: {
    validated () {
      return !!this.marker.properties
    }
  },
  watch: {
    replace (val) {
      if (!val) return
      this.updateMarkerData()
      this.replace = false
    },
    nextStep (val) {
      if (!val && !this.updateAll) return
      this.step()
      this.nextStep = false
    },
    updateAll (val) {
      if (val) this.replaceAll()
    },
    close (val) {
      if (val) {
        this.$emit('update:opened', false)
      }
    }
  },
  methods: {
    async replaceAll () {
      do {
        if (this.close) break
        var { value, done } = await this.asyncIterator.next()
        if (value) {
          this.markerId = value.markerId
          this.marker = value.marker
          if (this.marker.properties) {
            this.formattedAddress = this.marker.address
            this.formattedCoordinates = this.marker.coordinates
            this.properties = this.marker.properties
            continue
          }
          try {
            const { formattedAddress, formattedCoordinates, properties } = await this._validateAddress(this.marker.address)
            this.formattedAddress = formattedAddress
            this.formattedCoordinates = formattedCoordinates
            this.properties = properties
            this.updateMarkerData()
          } catch (err) {
            console.warn(err)
            this.error = true
            this.formattedAddress = err
            this.formattedCoordinates = ''
            this.properties = sessionStorage.getItemByName('emptyProperties')
            break
          }
        }
      } while (!done)
      this.$emit('update:finished', true)
    },
    step () {
      const { value, done } = this.syncIterator.next()
      if (done) this.$emit('update:finished', true)
      this.marker = value
      this._validateAddress(this.marker.address)
        .then((result) => {
          this.formattedAddress = result.formattedAddress
          this.formattedCoordinates = result.formattedCoordinates
          this.properties = result.properties
        })
    },
    updateMarkerData () {
      this.marker = {
        address: this.formattedAddress,
        coordinates: this.formattedCoordinates,
        status: this.marker.status,
        properties: this.properties
      }
      localStorage.setItemByName(this.markerId, this.marker)
    }
    // validateAddress () {
    //   const geocode = this.$root.$map.__geoCoder.geocode
    //   const address = this.marker.address
    //   return new Promise(function (resolve, reject) {
    //     geocode({ address }, function (results, status) {
    //       this.ready = status === 'OK'
    //       if (status === 'OK') {
    //         const latLng = results[0].geometry.location
    //         const number = results[0].address_components.find(item => item.types[0] === 'street_number')
    //         const street = results[0].address_components.find(item => item.types[0] === 'route')
    //         const city = results[0].address_components.find(item => item.types[0] === 'locality')
    //         const state = results[0].address_components.find(item => item.types[0] === 'administrative_area_level_1')
    //         const admin = results[0].address_components.find(item => item.types[0] === 'administrative_area_level_2')
    //         const postCode = results[0].address_components.find(item => item.types[0] === 'postal_code')
    //
    //         resolve({
    //           formattedAddress: results[0].formatted_address,
    //           formattedCoordinates: [latLng.lng(), latLng.lat()],
    //           properties: {
    //             number: number ? number.short_name : '',
    //             street: street ? street.short_name : '',
    //             city: city ? city.short_name : '',
    //             state: state ? state.short_name : '',
    //             admin: admin ? admin.short_name : '',
    //             postCode: postCode ? postCode.short_name : ''
    //           }
    //         })
    //       } else reject(status)
    //     })
    //   })
    // }
  },
  mounted () {
    this.test = this.$root.$map.__geocode
    this.syncIterator = (function * () {
      for (const type of this.types) {
        const collection = localStorage.getItemByName(type)
        for (const markerId of collection) {
          this.markerId = markerId
          yield localStorage.getItemByName(markerId)
        }
      }
    }.bind(this))()

    this.asyncIterator = (async function * () {
      for (const type of this.types) {
        const collection = localStorage.getItemByName(type)
        for (const markerId of collection) {
          // this.markerId = markerId
          yield new Promise(function (resolve) {
            setTimeout(() => resolve({ markerId, marker: localStorage.getItemByName(markerId) }), 1000)
          })
        }
      }
    }.bind(this))()

    this.nextStep = true
  }
}
</script>

<style scoped>
.bordered {
  border: solid 1px #bbb;
  padding: 12px 16px;
  border-radius: 8px;
}
</style>
