<template>
  <v-app>
    <v-app-bar
      absolute
      color="white"
    >
      <v-toolbar-title>
        <h5>Buildings API</h5>
      </v-toolbar-title>
      <v-toolbar
        v-if="selectedBuildingId"
        flat
        class="transparent"
      >
        <v-spacer></v-spacer>

        <Button
          :clicked.sync="generalDescription"
          icon='generalDescription'
          color="#777"
          text="General Description"
        />

        <v-menu
          bottom
          close-on-click
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn
              color="#777"
              icon
              v-on="on"
            >
              <v-icon>$case</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="management = true">
              <v-list-item-title>
                Building Management
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="owner = true">
              <v-list-item-title>
                Building Owner
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu
          bottom
          close-on-click
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn
              color="#777"
              icon
              v-on="on"
            >
              <v-icon>$upload</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="startUpload('design')">
              <v-list-item-title>
                Design
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="startUpload('inspect')">
              <v-list-item-title>
                LAAN Inspect
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="startUpload('install')">
              <v-list-item-title>
                LAAN Install
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="startUpload('scope')">
              <v-list-item-title>
                Scope
              </v-list-item-title>
            </v-list-item>

            <v-list-item @click="startUpload('photos')">
              <v-list-item-title>
                Photos
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <Button
          :clicked.sync="levels"
          icon='buildingLevels'
          color="#777"
          text="Building Levels"
        />

        <Button
          :clicked.sync="infrastructure"
          icon='infrastructure'
          color="#777"
          text="Infrastructure"
        />

        <Button
          v-if="value !== 'list'"
          :clicked.sync="save"
          icon='save'
          color="#09b"
          text="Save current building data"
        />

        <Button
          v-if="value !== 'list'"
          :clicked.sync="confirmDeleteVisibility"
          icon='delete'
          color="#900"
          text="Remove current building forever"
        />
      </v-toolbar>
    </v-app-bar>

    <v-main id="dgtek-markers" class="mt-12">
      <Buildings
        v-show="value === 'home'"
        :buildingId.sync="selectedBuildingId"
      />

      <ListOfBuildings
        v-if="value === 'list'"
        :selectedBuildingId.sync="selectedBuildingId"
      />

      <WrapperDialog
        :opened.sync="dialog"
        :currentComponentName="componentName"
        :buildingId="selectedBuildingId"
        :uploadParam="uploadParam"
      />
      <Diagnostics
        v-if="diagnostics && !diagnosticsDone"
        :types="$buildingTypes"
        :finished.sync="diagnosticsDone"
        :opened.sync="diagnostics"
      />
    </v-main>

    <!-- =================== BOTTOM NAVIGATION ===================== -->
    <v-bottom-navigation fixed v-model="value" color="#079">

      <v-btn value="home">
        <span>Home</span>
        <v-icon>$map</v-icon>
      </v-btn>

      <v-btn value="list">
        <span>List of buildings</span>
        <v-icon>$list</v-icon>
      </v-btn>

      <v-btn value="diagnostics">
        <span>Addresses diagnostics</span>
        <v-icon>$diagnostics</v-icon>
      </v-btn>

      <!-- <v-btn value="search" v-if="selectedBuildingId">
        <span>Search Mode</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

    </v-bottom-navigation>

    <PopupDelete
      :opened.sync="confirmDeleteVisibility"
      :delete.sync="removingConfirmed"
    />
    <ErrorMessage
      :opened.sync="errorMessagePopupOpened"
      :type="errorType"
      :message="errorMessage"
    />
    <MessagePopup
      :opened.sync="messagePopupOpened"
      :type="messageType"
      :message="message"
    />
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    Button: () => import('@/components/Button.vue'),
    Buildings: () => import('@/components/Buildings.vue'),
    ListOfBuildings: () => import('@/components/ListOfBuildings.vue'),
    Diagnostics: () => import('@/components/Diagnostics.vue'),
    WrapperDialog: () => import('@/components/WrapperDialog.vue'),
    ErrorMessage: () => import('@/components/inputs/ErrorMessage.vue'),
    MessagePopup: () => import('@/components/inputs/MessagePopup.vue'),
    PopupDelete: () => import('@/components/inputs/PopupDelete.vue')
  },

  data: () => ({
    ready: false,
    save: false,
    address: '',
    selectedBuilding: false,
    selectedBuildingId: null,
    value: 'home',
    buildingLevels: null,
    confirmDeleteVisibility: false,
    removingConfirmed: false,
    levels: false,
    diagnosticsDone: false,
    dialog: false,
    generalDescription: false,
    infrastructure: false,
    management: false,
    owner: false,
    uploadParam: null,
    componentName: '',
    errorMessagePopupOpened: false,
    errorMessage: '',
    errorType: '',
    messageType: 'success',
    message: '',
    messagePopupOpened: false
  }),

  computed: {
    diagnostics: {
      get () {
        return this.value === 'diagnostics'
      },
      set (val) {
        this.value = val ? 'diagnostics' : 'home'
      }
    }
  },

  watch: {
    selectedBuildingId (val) {
      if (!val) {
        localStorage.setItemByName('selectedBuilding', null)
        return
      }
      this._getBuildingDetails(val)
        .then((response) => {
          if (response.error) {
            this.$root.$emit('error-event', {
              type: 'Data error',
              message: 'Reading current building\' data failed'
            })
          }
        })
    },
    value (val) {
      val === 'list' && this.$root.$map.resetSelectedMarker()
    },
    generalDescription (val) {
      if (val) {
        this.componentName = 'GeneralDescription'
        this.dialog = true
        this.generalDescription = false
      }
    },
    infrastructure (val) {
      if (val) {
        this.componentName = 'Infrastructure'
        this.dialog = true
        this.infrastructure = false
      }
    },
    management (val) {
      if (val) {
        this.componentName = 'BuildingManagement'
        this.dialog = true
        this.management = false
      }
    },
    owner (val) {
      if (val) {
        this.componentName = 'BuildingOwner'
        this.dialog = true
        this.owner = false
      }
    },
    levels (val) {
      if (val) {
        this.componentName = 'BuildingLevels'
        this.dialog = true
        this.levels = false
      }
    },
    save (val) {
      if (val) {
        this.saveBuldingData()
        this.save = false
      }
    },

    removingConfirmed (val) {
      if (val) {
        this._deleteBuilding()
        this.$root.$map.removeMarker()
        this.$emit('reset-selected-marker')
        this.removingConfirmed = false
        this.$root.$emit('message-event', {
          type: 'Delete',
          message: 'Building removed'
        })
      }
    }
  },

  methods: {
    startUpload (param) {
      this.uploadParam = param
      this.componentName = 'FilesUpload'
      this.dialog = true
    },
    async saveBuldingData () {
      const response = await this._saveBuilding()
      if (response.error) {
        this.$root.$emit('error-event', {
          type: 'Data save error',
          message: 'Error saving building\' data'
        })
      } else {
        localStorage.setBuilingsListItem(response.building._id, response.building)
        this.$root.$emit('message-event', {
          type: 'Success',
          message: 'Building\' data saved'
        })
      }
    }
  },

  beforeMount () {
    this._getBuildingsList()
      .then(() => {
        this.ready = true
        window.dispatchEvent(new Event('data-ready'))
      })
  },
  mounted () {
    this.$root.$on('error-event', function (event) {
      Object.assign(this.$children[0], {
        errorMessage: event.message,
        errorType: event.type,
        errorMessagePopupOpened: true
      })
    })
    this.$root.$on('message-event', function (event) {
      Object.assign(this.$children[0], {
        message: event.message,
        type: event.type,
        messagePopupOpened: true
      })
    })
  }
}
</script>

<style>
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #eaeaea;
}
::-webkit-scrollbar-thumb {
  background: #555;
}
::-webkit-scrollbar-thumb:hover {
  background: #900;
}
</style>
