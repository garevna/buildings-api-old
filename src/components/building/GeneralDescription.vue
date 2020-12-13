<template>
  <v-container>
    <BuildingTypes :buildingType.sync="buildingType" />
    <v-card flat class="mx-auto pa-4" max-width="100%">
      <table class="mt-12 mx-auto">
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <v-checkbox v-model="footprint" label="Footprint"></v-checkbox>
            </td>
            <td v-if="!footprint">
              <NumberInput
                placeholder="Distance from the footprint"
                :value.sync="distance"
              />
            </td>
          </tr>
          <tr>
            <td>
              <NumberInput
                placeholder="Number of Levels "
                :value.sync="levels"
              />
            </td>
            <td>
              <NumberInput
                placeholder="Number of dwellings"
                :value.sync="dwellings"
              />
            </td>
            <td>
              <NumberInput
                placeholder="Avg Height of each floor"
                :value.sync="avgFloorHeight"
              />
            </td>
          </tr>
          <tr>
            <td>
              <v-checkbox
                v-model="approvalRequired"
                label="Customer Install requires approval"
              ></v-checkbox>
            </td>
            <td></td>
            <td>
              <v-checkbox
                v-model="inductionRequired"
                label="Induction required"
              ></v-checkbox>
            </td>
            <td>
            </td>
          </tr>
        </tbody>
      </table>
      <v-card flat max-width="600" class="mx-auto mt-12">
        <Difficulty
          :value.sync="leadInInstallationDifficulty"
          label="Lead-In Installation Difficulty"
        />
        <Difficulty
          :value.sync="backboneInstallationDifficulty"
          label="Backbone Installation Difficulty"
        />
        <Difficulty
          :value.sync="customerInstallationDifficulty"
          label="Customer Installation Difficulty"
        />
      </v-card>
    </v-card>
  </v-container>
</template>

<script>

import NumberInput from '@/components/inputs/Number.vue'

export default {
  name: 'GeneralDescription',
  components: {
    NumberInput,
    Difficulty: () => import('@/components/inputs/Difficulty.vue'),
    BuildingTypes: () => import('@/components/building/BuildingTypes.vue')
  },
  props: ['data', 'changed'],
  computed: {
    ready () {
      return !!this.data
    },
    buildingType: {
      get () {
        return this.data ? this.data.buildingType : ''
      },
      set (val) {
        this.setValue('buildingType', val)
      }
    },
    footprint: {
      get () {
        return this.data ? this.data.footprint : false
      },
      set (val) {
        this.setValue('footprint', val)
      }
    },
    distance: {
      get () {
        return this.data ? this.data.distanceFromFootprint : 0
      },
      set (val) {
        this.setValue('distanceFromFootprint', val)
      }
    },
    levels: {
      get () {
        return this.data ? this.data.numberOfLevels : 1
      },
      set (val) {
        this.setValue('numberOfLevels', val)
      }
    },
    dwellings: {
      get () {
        return this.data ? this.data.numberOfDwellings : 1
      },
      set (val) {
        this.setValue('numberOfDwellings', val)
      }
    },
    avgFloorHeight: {
      get () {
        return this.data ? this.data.avgFloorHeight : 3
      },
      set (val) {
        this.setValue('avgFloorHeight', val)
      }
    },
    approvalRequired: {
      get () {
        return this.data ? this.data.customerInstallApprovalRequired : false
      },
      set (val) {
        this.setValue('customerInstallApprovalRequired', val)
      }
    },
    inductionRequired: {
      get () {
        return this.data ? this.data.inductionRequired : false
      },
      set (val) {
        this.setValue('inductionRequired', val)
      }
    },
    leadInInstallationDifficulty: {
      get () {
        return this.data && this.data.difficultyLevel ? this.data.difficultyLevel.leadInInstallation : 0
      },
      set (val) {
        this.setDifficulty('leadInInstallation', val)
      }
    },
    backboneInstallationDifficulty: {
      get () {
        return this.data ? this.data.difficultyLevel.backboneInstallation : 0
      },
      set (val) {
        this.setDifficulty('backboneInstallation', val)
      }
    },
    customerInstallationDifficulty: {
      get () {
        return this.data ? this.data.difficultyLevel.customerInstallation : 0
      },
      set (val) {
        this.setDifficulty('customerInstallation', val)
      }
    }
  },
  watch: {
    footprint (val) {
      this.setValue('footprint', val)
    },
    distance (val) {
      this.setValue('distanceFromFootprint', val)
    },
    levels (val) {
      this.setValue('numberOfLevels', val)
    },
    dwellings (val) {
      this.setValue('numberOfDwellings', val)
    },
    avgFloorHeight (val) {
      this.setValue('avgFloorHeight', val)
    },
    approvalRequired (val) {
      this.setValue('customerInstallApprovalRequired', val)
    },
    inductionRequired (val) {
      this.setValue('inductionRequired', val)
    },
    leadInInstallationDifficulty (val) {
      this.setDifficulty('leadInInstallation', val)
    },
    backboneInstallationDifficulty (val) {
      this.setDifficulty('backboneInstallation', val)
    },
    customerInstallationDifficulty (val) {
      this.setDifficulty('customerInstallation', val)
    }
  },
  methods: {
    setValue (prop, val) {
      const data = localStorage.getItemByName('selectedBuilding')
      localStorage.setItemByName('selectedBuilding', Object.assign(data, {
        [prop]: val
      }))
      this.$emit('update:data', JSON.parse(JSON.stringify(data)))
      this.$emit('update:changed', true)
    },
    setDifficulty (prop, val) {
      const data = localStorage.getItemByName('selectedBuilding')
      Object.assign(data.difficultyLevel, { [prop]: val })
      localStorage.setItemByName('selectedBuilding', data)
      this.$emit('update:data', JSON.parse(JSON.stringify(data)))
      this.$emit('update:changed', true)
    }
  }
}
</script>
