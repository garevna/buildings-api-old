<template>
  <v-dialog v-model="dialog" max-width="640px">
    <v-card flat class="pa-6 pb-12">
      <v-row align="start" justify="end">
        <v-btn icon color="#333" text @click="$emit('update:opened', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
      <v-row justify="center">
        <v-card flat width="70%" class="mx-auto mb-6">
          <v-text-field v-model="name" label="Level name" />
        </v-card>
      </v-row>
      <v-row justify="center">
        <v-card flat>
          <table>
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Planned</th>
                <th>Installed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Router</td>
                <td>
                  <v-checkbox
                    v-model="plannedRouter"
                    color="#09b"
                  ></v-checkbox>
                </td>
                <td>
                  <v-text-field
                    v-model="installedRouter"
                    label="Serial Number"
                  ></v-text-field>
                </td>
              </tr>
              <tr>
                <td>Splicing Box</td>
                <td>
                  <v-checkbox
                   v-model="plannedSplicingBox"
                   color="#09b"
                 ></v-checkbox>
                </td>
                <td>
                  <v-checkbox
                    v-model="installedSplicingBox"
                    color="#090"
                  ></v-checkbox>
                </td>
              </tr>
              <tr>
                <td>Splitter</td>
                <td>
                  <v-checkbox
                    v-model="plannedSplitter"
                    color="#09b"
                  ></v-checkbox>
                </td>
                <td>
                  <v-checkbox
                    v-model="installedSplitter"
                    color="#090"
                  ></v-checkbox>
                </td>
              </tr>
              <tr>
                <td>OFTU</td>
                <td>
                  <v-checkbox
                    v-model="plannedOFTU"
                    color="#09b"
                  ></v-checkbox>
                </td>
                <td>
                  <v-text-field
                    v-model="installedOFTU"
                    label="Serial number"
                  ></v-text-field>
                </td>
              </tr>
            </tbody>
          </table>
        </v-card>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'EditBuildingLevel',
  props: ['opened', 'level'],
  computed: {
    dialog: {
      get () {
        return this.opened
      },
      set (val) {
        this.$emit('update:opened', val)
      }
    },
    name: {
      get () {
        return this.level.name
      },
      set (val) {
        this.setValue('name', val)
      }
    },
    plannedRouter: {
      get () {
        return this.level.plannedRouter
      },
      set (val) {
        this.setValue('plannedRouter', val)
      }
    },
    installedRouter: {
      get () {
        return this.level.installedRouter
      },
      set (val) {
        this.setValue('installedRouter', val)
      }
    },
    plannedSplicingBox: {
      get () {
        return this.level.plannedSplicingBox
      },
      set (val) {
        this.setValue('plannedSplicingBox', val)
      }
    },
    installedSplicingBox: {
      get () {
        return this.level.installedSplicingBox
      },
      set (val) {
        this.setValue('installedSplicingBox', val)
      }
    },
    plannedSplitter: {
      get () {
        return this.level.plannedSplitter
      },
      set (val) {
        this.setValue('plannedSplitter', val)
      }
    },
    installedSplitter: {
      get () {
        return this.level.installedSplitter
      },
      set (val) {
        this.setValue('installedSplitter', val)
      }
    },
    plannedOFTU: {
      get () {
        return this.level.plannedOFTU
      },
      set (val) {
        this.setValue('plannedOFTU', val)
      }
    },
    installedOFTU: {
      get () {
        return this.level.installedOFTU
      },
      set (val) {
        this.setValue('installedOFTU', val)
      }
    }
  },
  methods: {
    setValue (propName, propValue) {
      const level = Object.assign({}, Object.assign(this.level, { [propName]: propValue }))
      this.$emit('update:level', level)
    }
  }
}
</script>

<style scoped>
  td {
    padding: 0 16px;
    border: solid 1px #999;
  }
</style>
