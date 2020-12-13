<template>
  <v-container fluid>
    <v-card flat max-width="1440" class="transparent mx-auto mb-10 pb-12">
      <v-data-table
        :headers="headers"
        :options.sync="options"
        :items="items"
        item-key="_id"
        class="elevation-0 pa-8"
        :single-expand="true"
        :expanded.sync="expanded"
        calculate-widths
        multi-sort
        show-expand
        dense
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              <h5>
                {{ expandedItemName }}
              </h5>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              color="#09b"
              text
              class="mb-2"
              @click="createNewBuilding = true"
            >
              New Building
            </v-btn>

            <NewBuildingListItem
              :opened.sync="createNewBuilding"
              :save.sync="updateListOfBuildings"
            />

          </v-toolbar>
        </template>
        <template v-slot:item.connect="{ item }">
          <v-icon class="mr-4" :color="getColor(item.status)">{{ getIcon(item.status) }}</v-icon>
        </template>
        <template v-slot:item.actions="{ item }">

          <v-icon
            small
            class="mr-2"
            :color="getIconColorForSaveButton(item)"
            @click="saveItem(item)"
          > $save </v-icon>

          <v-icon
            small
            color="#900"
            @click="deleteItem(item)"
          > $delete </v-icon>
        </template>

        <template v-slot:body.append>
          <tr style="background: #eaeaea; font-size: 12px!important">
            <td width="160">
              <v-select
                v-model="stateSearch"
                :items="administrativeAreas"
                hint="State"
                persistent-hint
                single-line
                chips
                deletable-chips
              ></v-select>
            </td>
            <td width="180">
              <v-text-field
                v-model="postcodeSearch"
                hint="Postal Code"
                persistent-hint
                append-icon="mdi-magnify"
              ></v-text-field>
            </td>
            <td width="280">
              <v-text-field
                v-model="localitySearch"
                hint="Locality"
                persistent-hint
                append-icon="mdi-magnify"
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                v-model="streetSearch"
                hint="Street Name"
                persistent-hint
                append-icon="mdi-magnify"
              ></v-text-field>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="pa-10">
            <BuildingListItem
              :editedItem.sync="item"
              :buildingId.sync="buildingId"
            />
          </td>
        </template>
      </v-data-table>
      <Legend />
    </v-card>
    <PopupDelete :opened.sync="dialogDelete" :delete.sync="deleteConfirmed" />
  </v-container>
</template>

<script>

export default {

  name: 'ListOfBuildings',

  components: {
    PopupDelete: () => import('@/components/inputs/PopupDelete.vue'),
    NewBuildingListItem: () => import('@/components/building/NewBuildingListItem.vue'),
    BuildingListItem: () => import('@/components/building/BuildingListItem.vue'),
    Legend: () => import('@/components/Legend.vue')
  },

  props: ['selectedBuildingId'],

  data: () => ({
    administrativeAreas: require('@/config/administrativeAreasAU').default,
    createNewBuilding: false,
    updateListOfBuildings: false,
    dialogDelete: false,
    deleteConfirmed: false,
    expanded: [],
    expandedItemName: null,
    items: localStorage.getAllBuildings()
      .map(item => Object.assign(item.addressComponents, {
        _id: item._id,
        address: item.address,
        coordinates: item.coordinates,
        buildingName: item.buildingName,
        status: item.status,
        isActive: false
      })),
    options: {
      page: 1,
      itemsPerPage: 10
    },
    postcodeSearch: '',
    stateSearch: '',
    localitySearch: '',
    streetSearch: '',
    editedIndex: -1,
    editedItem: {}
  }),

  computed: {
    buildingId: {
      get () {
        return this.selectedBuildingId
      },
      set (val) {
        this._getBuildingDetails(val)
          .then(() => { this.$emit('update:selectedBuildingId', val) })
      }
    },
    headers () {
      return [
        {
          text: 'State',
          align: 'start',
          sortable: true,
          value: 'state',
          filter: value => {
            if (!this.stateSearch) return true
            return value.toLowerCase().indexOf(this.stateSearch.toLowerCase()) !== -1
          }
        },
        {
          text: 'Postal Code',
          value: 'postCode',
          filter: value => {
            if (!this.postcodeSearch) return true
            return value === this.postcodeSearch
          }
        },
        {
          text: 'Locality',
          value: 'city',
          filter: value => {
            if (!this.localitySearch) return true
            return value.toLowerCase().indexOf(this.localitySearch.toLowerCase()) !== -1
          }
        },
        {
          text: 'Street Name',
          value: 'street',
          filter: value => {
            if (!this.streetSearch) return true
            return value.toLowerCase().indexOf(this.streetSearch.toLowerCase()) !== -1
          }
        },
        {
          text: 'Street Number',
          value: 'number'
        },
        {
          text: 'Status',
          value: 'connect',
          sortable: false
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        },
        { text: '', value: 'data-table-expand' }
      ]
    }
  },

  watch: {
    createNewBuilding (val) {
      if (val) {
        this.clearActive()
        this.expandedItemName = ''
        this.buildingId = null
        localStorage.setItemByName('selectedBuilding', null)
      }
    },
    updateListOfBuildings (val) {
      if (!val) return
      const building = localStorage.getItemByName('selectedBuilding')
      this.items.push(Object.assign(building.addressComponents, {
        address: building.address,
        buildingName: building.buildingName,
        status: building.status,
        coordinates: building.coordinates,
        _id: building._id,
        isActive: true
      }))

      this.expanded = [this.items[this.items.length - 1]]
      Object.assign(this.options, { page: Math.floor(this.items.length + 1 / this.options.itemsPerPage) })
      this.updateListOfBuildings = false
      this.$emit('update:selectedBuildingId', building._id)
    },
    expanded (val) {
      this.clearActive()
      if (!val[0]) {
        this.expandedItemName = ''
        this.$emit('update:selectedBuildingId', null)
        return
      }
      const index = this.items.indexOf(val[0])
      this.items[index].isActive = true
      this.expandedItemName = `${val[0].number} ${val[0].street}, ${val[0].city} ${val[0].state} ${val[0].postCode}`
      this.$emit('update:selectedBuildingId', val[0]._id)
    },
    deleteConfirmed (val) {
      val && this.deleteBuilding()
    }
  },

  methods: {
    clearActive () {
      this.items.forEach(item => Object.assign(item, { isActive: false }))
    },
    getIcon (status) {
      const index = this.$buildingTypes.indexOf(status)
      if (index === -1) {
        console.warn('Invalid Building Status: ', status)
        return this.$typeIcons[this.$typeIcons.length - 1][0]
      }
      return this.$typeIcons[index]
    },
    getColor (status) {
      const index = this.$buildingTypes.indexOf(status)
      if (index === -1) {
        console.warn('Invalid Building Status: ', status)
        return this.$typeColors[this.$typeColors.length - 1][0]
      }
      return this.$typeColors[index]
    },

    getIconColorForSaveButton (item) {
      return item.isActive ? '#09b' : '#888'
    },

    async saveItem (item) {
      if (!item.isActive) return
      const response = await this._saveBuilding()
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
    },

    deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteBuilding () {
      await this._deleteBuilding(this.items[this.editedIndex]._id)
      this.items.splice(this.editedIndex, 1)
      this.$nextTick(() => {
        this.expanded = []
        this.editedItem = null
        this.editedIndex = -1
      })
      this.dialogDelete = false
      this.deleteConfirmed = false
      this.$root.$emit('message-event', {
        type: 'Delete',
        message: 'Building removed'
      })
    }
  }
}
</script>

<style scoped>
.active {
  background: #900;
}
.passive {
  background: #fafafa;
}
</style>
