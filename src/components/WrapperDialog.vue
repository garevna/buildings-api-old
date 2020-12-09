<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card flat class="mx-auto pa-4" max-width="100%">
        <v-toolbar dark color="#777">
          <v-toolbar-title>{{ address }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="$emit('update:opened', false)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <keep-alive>
          <component
            :is="currentComponent"
            :data="data"
            :changed.sync="changed"
            :param="uploadParam"
          ></component>
        </keep-alive>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

export default {
  props: [
    'currentComponentName',
    'opened',
    'buildingId',
    'uploadParam'
  ],
  data () {
    return {
      currentComponent: null,
      components: {
        GeneralDescription: () => import('@/components/building/GeneralDescription.vue'),
        Infrastructure: () => import('@/components/building/Infrastructure.vue'),
        BuildingLevels: () => import('@/components/building/BuildingLevels.vue'),
        BuildingManagement: () => import('@/components/building/BuildingManagement.vue'),
        BuildingOwner: () => import('@/components/building/BuildingOwner.vue'),
        FilesUpload: () => import('@/components/building/FilesUpload.vue')
      },
      data: null,
      changed: false
    }
  },
  watch: {
    currentComponentName (val) {
      this.data = localStorage.getItemByName('selectedBuilding')
      this.currentComponent = this.components[val]
    },
    buildingId: {
      immediate: true,
      handler (val) {
        if (val) {
          this.data = localStorage.getItemByName('selectedBuilding')
          this.data || this.$emit('update:opened', false)
        } else this.$emit('update:opened', false)
      }
    },
    changed (val) {
      if (val) {
        this.data = localStorage.getItemByName('selectedBuilding')
        this.changed = false
      }
    }
  },
  computed: {
    dialog: {
      get () {
        return this.opened
      },
      set (val) {
        this.$emit('update:opened', val)
      }
    },
    address () {
      return this.data ? this.data.address : ''
    }
  }
}
</script>
