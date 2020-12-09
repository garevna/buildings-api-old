<template>
  <v-layout row justify-center>
    <v-card flat class="mt-10 mr-10" max-width="600">
      <v-card-text>
        <h4>Infrastructure Type:</h4>
        <v-text-field
          v-model="infrastructure.type"
        />
      </v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">exist and usable</th>
              <th class="text-left">planned</th>
              <th class="text-left">installed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h4>Lead-In</h4>
              </td>
              <td></td>
              <td>
                <v-checkbox
                  v-model="infrastructure.leadIn.planned"
                  color="#09b"
                ></v-checkbox>
              </td>
              <td>
                <v-checkbox
                  v-model="infrastructure.leadIn.installed"
                  color="#090"
                ></v-checkbox>
              </td>
            </tr>

            <tr>
              <td>
                <h4>Backbone</h4>
              </td>
              <td></td>
              <td>
                <v-checkbox
                  v-model="infrastructure.backbone.planned"
                  color="#09b"
                ></v-checkbox>
              </td>
              <td>
                <v-checkbox
                  v-model="infrastructure.backbone.installed"
                  color="#090"
                ></v-checkbox>
              </td>
            </tr>

            <tr>
              <td>
                <h4>Customer Access cabling</h4>
              </td>
              <td></td>
              <td>
                <v-checkbox
                  v-model="infrastructure.customerAccessCabling.planned"
                  color="#09b"
                ></v-checkbox>
              </td>
              <td>
                <v-checkbox
                  v-model="infrastructure.customerAccessCabling.installed"
                  color="#090"
                ></v-checkbox>
              </td>
            </tr>

            <tr>
              <td>
                <h4>GPO in MDF</h4>
              </td>
              <td>
                <v-checkbox
                  v-model="infrastructure.gPOinMDF.exist"
                  color="#090"
                ></v-checkbox>
              </td>
              <td>
                <v-checkbox
                  v-if="!infrastructure.gPOinMDF.exist"
                  v-model="infrastructure.gPOinMDF.planned"
                  color="#09b"
                ></v-checkbox>
              </td>
              <td>
                <v-checkbox
                  v-if="!infrastructure.gPOinMDF.exist"
                  v-model="infrastructure.gPOinMDF.installed"
                  color="#090"
                ></v-checkbox>
              </td>
            </tr>

            <tr>
              <td>
                <h4>UPS in MDF</h4>
              </td>
              <td></td>
              <td>
                <v-checkbox
                  v-model="infrastructure.uPSinMDF.planned"
                  color="#09b"
                ></v-checkbox>
              </td>
              <td>
                <v-checkbox
                  v-model="infrastructure.uPSinMDF.installed"
                  color="#090"
                ></v-checkbox>
              </td>
            </tr>

            <tr>
              <td>
                <h4>GPO in risers</h4>
              </td>
              <td>
                <v-checkbox
                  v-model="infrastructure.gPOinRisers.exist"
                  color="#090"
                ></v-checkbox>
              </td>
              <td>
                <v-checkbox
                  v-if="!infrastructure.gPOinRisers.exist"
                  v-model="infrastructure.gPOinRisers.planned"
                  color="#09b"
                ></v-checkbox>
              </td>
              <td>
                <v-checkbox
                  v-if="!infrastructure.gPOinRisers.exist"
                  v-model="infrastructure.gPOinRisers.installed"
                  color="#090"
                ></v-checkbox>
              </td>
            </tr>

            <tr>
              <td>
                <h4>UPS in risers</h4>
              </td>
              <td></td>
              <td>
                <v-checkbox
                  v-model="infrastructure.uPSinRisers.planned"
                  color="#09b"
                ></v-checkbox>
              </td>
              <td>
                <v-checkbox
                  v-model="infrastructure.uPSinRisers.installed"
                  color="#090"
                ></v-checkbox>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-layout>
</template>

<script>

export default {
  name: 'Infrastructure',
  props: ['data'],
  data: () => ({
    infrastructure: {
      type: '',
      leadIn: {
        planned: false,
        installed: false
      },
      backbone: {
        planned: false,
        installed: false
      },
      customerAccessCabling: {
        planned: false,
        installed: false
      },
      gPOinMDF: {
        exist: false,
        planned: false,
        installed: false
      },
      uPSinMDF: {
        planned: false,
        installed: false
      },
      gPOinRisers: {
        exist: false,
        planned: false,
        installed: false
      },
      uPSinRisers: {
        planned: false,
        installed: false
      }
    }
  }),
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler (val) {
        this.infrastructure = JSON.parse(JSON.stringify(val.infrastructure))
        this.files = JSON.parse(JSON.stringify(val.files))
      }
    },
    infrastructure: {
      deep: true,
      handler (val) {
        const buildingData = localStorage.getItemByName('selectedBuilding')
        buildingData.infrastructure = val
        localStorage.setItemByName('selectedBuilding', buildingData)
        this.$emit('update:data', buildingData)
      }
    }
  },
  methods: {
    getValue (propName, option, defaultValue) {
      return this.data && this.data.infrastructure[propName] ? this.data.infrastructure[propName][option] : defaultValue
    },
    setValue (propName, option, val) {
      const infrastructure = JSON.parse(JSON.stringify(this.data.infrastructure))
      infrastructure[propName][option] = val
      Object.assign(this.data, infrastructure)
      return Object.assign({}, this.data)
    }
  }
}
</script>
