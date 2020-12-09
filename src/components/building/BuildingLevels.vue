<template>
  <v-container>
    <v-row justify="center">
        <v-spacer></v-spacer>
        <v-btn
          color="#09b"
          text
          class="my-2"
          @click="addLevel"
        >
          Add level
        </v-btn>
    </v-row>
    <v-row justify="center">
      <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
          multi-sort
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td>
                  <v-chip color="#888" dark>{{ item.name }}</v-chip>
                </td>
                <td>
                  <v-simple-checkbox color="#09b" :value="item.plannedRouter" :ripple="false" />
                </td>
                <td>
                  <v-simple-checkbox color="#09b" :value="item.plannedSplicingBox" :ripple="false" />
                </td>
                <td>
                  <v-simple-checkbox color="#09b" :value="item.plannedSplitter" :ripple="false" />
                </td>
                <td>
                  <v-simple-checkbox color="#09b" :value="item.plannedOFTU" :ripple="false" />
                </td>
                <td>
                  <v-text-field color="#090" :value="item.installedRouter" />
                </td>
                <td>
                  <v-simple-checkbox color="#090" :value="item.installedSplicingBox" :ripple="false" />
                </td>
                <td>
                  <v-simple-checkbox color="#090" :value="item.installedSplitter" :ripple="false" />
                </td>
                <td>
                  <v-text-field color="#090" :value="item.installedOFTU" />
                </td>
                <td style="width: 120px">
                    <v-icon
                      small
                      color="#090"
                      class="mr-2"
                      @click="editItem(item)"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon
                      small
                      color="#900"
                      @click="deleteItem(item)"
                    >
                      mdi-delete
                    </v-icon>
                </td>
              </tr>
            </tbody>
          </template>
      </v-data-table>
    </v-row>
    <EditBuildingLevel
      :opened.sync="levelDialog"
      :index="editedIndex"
      :level.sync="editedItem"
    />
  </v-container>
</template>

<script>

export default {
  name: 'BuildingLevels',
  components: {
    EditBuildingLevel: () => import('@/components/building/EditBuildingLevel.vue')
  },
  props: ['data'],
  data () {
    return {
      search: '',
      levelDialog: false,
      hide: false,
      save: false,
      value: 'save',
      items: [],
      headers: [
        { text: 'Levels', align: 'start', value: 'name' },
        { text: 'Planned Routers', value: 'plannedRouter' },
        { text: 'Planned Splicing Boxes', value: 'plannedSplicingBox' },
        { text: 'Planned Splitters', value: 'plannedSplitter' },
        { text: 'Planned OFTU', value: 'plannedOFTU' },
        { text: 'Installed Routers', value: 'installedRouter' },
        { text: 'Installed Splicing Boxes', value: 'installedSplicingBox' },
        { text: 'Installed Splitters', value: 'installedSplitter' },
        { text: 'Installed OFTU', value: 'installedOFTU' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        plannedRouter: false,
        plannedSplicingBox: false,
        plannedSplitter: false,
        plannedOFTU: false,
        installedRouter: '',
        installedSplicingBox: false,
        installedSplitter: false,
        installedOFTU: ''
      }
    }
  },
  watch: {
    data: {
      immediate: true,
      handler (val) {
        this.items = val.levels.map(this.convert)
      }
    },
    levelDialog (val) {
      val || this.close()
    },
    save (val) {
      if (!val) return
      this.saveBuildingData()
      this.save = false
    },
    items: {
      deep: true,
      handler (val) {
        if (!val) return
        const levels = val.map(item => ({
          name: item.name,
          planned: {
            router: item.plannedRouter,
            splicingBox: item.plannedSplicingBox,
            splitter: item.plannedSplitter,
            oftu: item.plannedOFTU
          },
          installed: {
            router: item.installedRouter,
            splicingBox: item.installedSplicingBox,
            splitter: item.installedSplitter,
            oftu: item.installedOFTU
          }
        }))
        Object.assign(this.data, { levels })
        const data = Object.assign({}, this.data)
        localStorage.setItemByName('selectedBuilding', data)
        this.$emit('update:data', data)
      }
    },
    editedItem: {
      deep: true,
      handler (val) {
        this.items.splice(this.editedIndex, 1, JSON.parse(JSON.stringify(val)))
      }
    }
  },
  methods: {
    convert (levelData) {
      return {
        name: levelData.name || '',
        plannedRouter: levelData.planned ? levelData.planned.router : false,
        plannedSplicingBox: levelData.planned ? levelData.planned.splicingBox : false,
        plannedSplitter: levelData.planned ? levelData.planned.splitter : false,
        plannedOFTU: levelData.planned ? levelData.planned.oftu : false,
        installedRouter: levelData.installed ? levelData.installed.router : '',
        installedSplicingBox: levelData.installed ? levelData.installed.splicingBox : false,
        installedSplitter: levelData.installed ? levelData.installed.splitter : false,
        installedOFTU: levelData.installed ? levelData.installed.oftu : ''
      }
    },
    reconvert (levelData) {
      return {
        name: levelData.name,
        planned: {
          router: levelData.plannedRouter,
          splicingBox: levelData.plannedSplicingBox,
          splitter: levelData.plannedSplitter,
          oftu: levelData.plannedOFTU
        },
        installed: {
          router: levelData.installedRouter,
          splicingBox: levelData.installedSplicingBox,
          splitter: levelData.installedSplitter,
          oftu: levelData.installedOFTU
        }
      }
    },
    getfromStorage () {
      const levels = localStorage.getItemByName('selectedBuilding')
      this.items = levels.map(this.convert)
    },
    saveToStorage (levelsData) {
      const _this = this
      Object.assign(this.data, levelsData.map(level => _this.reconvert(level)))
      const data = Object.assign({}, this.data)
      localStorage.setItemByName('selectedBuilding', data)
      this.$emit('update:data', data)
    },
    addLevel () {
      this.items.push({
        name: '',
        plannedRouter: false,
        plannedSplicingBox: false,
        plannedSplitter: false,
        plannedOFTU: false,
        installedRouter: '',
        installedSplicingBox: false,
        installedSplitter: false,
        installedOFTU: ''
      })
      this.editedIndex = this.items.length - 1
      this.editedItem = this.items[this.editedIndex]
      this.levelDialog = true
    },
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.levelDialog = true
    },

    deleteItem (item) {
      const index = this.items.indexOf(item)
      this.items.splice(index, 1)
    },

    close () {
      this.levelDialog = false
    },

    saveLevelData () {
      if (this.editedIndex !== -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    },

    saveBuildingData () {
      const building = localStorage.getItemByName('selectedBuilding')
      localStorage.setItemByName('selectedBuilding', Object.assign(building, { levels: this.levels }))
      this._saveBuilding()
    }
  }
}
</script>
