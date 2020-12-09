import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      map: 'mdi-map',
      marker: 'mdi-map-marker',
      list: 'mdi-view-list',
      diagnostics: 'mdi-marker-check',
      generalDescription: 'mdi-file-table',
      buildingLevels: 'mdi-home-city-outline',
      infrastructure: 'mdi-pencil-ruler',
      edit: 'mdi-pencil',
      save: 'mdi-content-save',
      delete: 'mdi-trash-can',
      dropdown: 'mdi-menu-down',
      case: 'mdi-briefcase-variant',
      face: 'mdi-account-circle',
      rightArrow: 'mdi-arrow-right-bold',
      instruments: 'mdi-hammer-screwdriver',
      empty: 'mdi-checkbox-blank-outline',
      block: 'mdi-checkbox-blank',
      pdf: 'mdi-file-pdf',
      upload: 'mdi-file-upload',
      error: 'mdi-alert',
      message: 'mdi-message-reply-text'
    }
  }
})
