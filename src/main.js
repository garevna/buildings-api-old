import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './config/Storage.js'

const {
  _validateAddress,
  _getBuildingsList,
  _getBuildingDetails,
  _createNewBuilding,
  _saveBuilding,
  _deleteBuilding,
  _deleteImage,
  _uploadBuildingFiles,
  _getBase64ByLink
} = require('@/helpers/').default

Object.assign(Vue.prototype, {
  _validateAddress,
  _getBuildingsList,
  _getBuildingDetails,
  _createNewBuilding,
  _saveBuilding,
  _deleteBuilding,
  _deleteImage,
  _uploadBuildingFiles,
  _getBase64ByLink
})

Vue.config.productionTip = false

const { types, colors, icons, defaultType } = require('@/config/types').default;

[Vue, Storage].forEach(constructor => Object.assign(constructor.prototype, {
  $buildingTypes: Object.assign([], types, {
    default: defaultType
  }),
  $typeColors: Object.assign([], colors),
  $typeIcons: Object.assign([], icons)
}))

Vue.prototype.availableBuildingTypes = {
  dwelling: ['single dwelling unit', 'multi dwelling unit with raiser', 'multi dwelling unit without raiser'],
  type: ['business park', 'duplex', 'standalone', 'warehouse', 'shopping mall'],
  category: ['residential', 'commercial', 'mixed'],
  field: ['brownfield', 'greenfield']
}

Vue.prototype.$role = location.pathname.slice(1)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
