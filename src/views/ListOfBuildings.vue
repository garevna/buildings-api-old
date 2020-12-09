<template>
    <v-card flat class="transparent">
      <v-data-table
        :headers="headers"
        :items="items"
        item-key="_id"
        class="elevation-1 pa-8"
        :search="search"
      >
        <template v-slot:body.append>
          <tr>
            <td width="140">
              <v-text-field
                v-model="state"
                type="string"
                prepend-icon="mdi-magnify"
              ></v-text-field>
            </td>
            <td width="120">
              <v-text-field
                v-model="postcode"
                type="string"
                prepend-icon="mdi-magnify"
              ></v-text-field>
            </td>
            <td width="240">
              <v-text-field
                v-model="city"
                type="string"
                prepend-icon="mdi-magnify"
              ></v-text-field>
            </td>
            <td width="240">
              <v-text-field
                v-model="street"
                type="string"
                prepend-icon="mdi-magnify"
              ></v-text-field>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
</template>

<script>

export default {

  name: 'ListOfBuildings',

  data: () => ({
    items: localStorage.getAllBuildings().map(item => item.addressComponents),
    search: '',
    postcode: '',
    state: '',
    city: '',
    street: ''
  }),

  computed: {
    headers () {
      return [
        {
          text: 'State',
          align: 'start',
          sortable: true,
          value: 'state',
          filter: value => {
            if (!this.state) return true
            return value.toLowerCase().indexOf(this.state.toLowerCase()) !== -1
          }
        },
        {
          text: 'Postal Code',
          value: 'postCode',
          filter: value => {
            if (!this.postcode) return true
            return value === this.postcode
          }
        },
        {
          text: 'City',
          value: 'city',
          filter: value => {
            if (!this.city) return true
            return value.toLowerCase().indexOf(this.city.toLowerCase()) !== -1
          }
        },
        {
          text: 'Street',
          value: 'street',
          filter: value => {
            if (!this.street) return true
            return value.toLowerCase().indexOf(this.street.toLowerCase()) !== -1
          }
        },
        {
          text: 'Number',
          value: 'number'
        }
      ]
    }
  }
}
</script>
