import mapConfig from '@/config/map.js'
// const searchIcon = require('@/assets/magnify.svg')

class Map {
  constructor (options) {
    /* PUBLIC PROPERTIES DESCRIPTION */
    this.map = null
    this.selectedMarkerId = null

    const { container, ...rest } = options

    if (container && container.nodeType === 1) this.container = container
    else {
      this.container = document.body.appendChild(document.createElement('div'))
      this.container.id = 'dgtek-container-for-map'
    }

    this.mapContainer = this.container.appendChild(document.createElement('div'))

    this.storage.constructor.prototype.eventHandler = this.container

    this.createMap()

    for (const option in rest) {
      this.options[option] = rest[option]
    }
    this.center = this.options.center

    this.setMapSize()
  }

  changeMarkerAddress (markerId, address, location) {
    if (!this.selectedMarkerId) return
    if (this.selectedMarkerId !== markerId) return
    this[this.selectedMarkerId].address = address
    this[this.selectedMarkerId].setOptions({
      title: address,
      position: location
    })
    this.map.panTo(location)
  }

  setSearchMarker (coordinates, address) {
    if (this.searchMarker) {
      this.searchMarker.setOptions({
        map: this.map,
        position: { lat: coordinates[1], lng: coordinates[0] },
        title: address
      })
    } else {
      this.searchMarker = new window.google.maps.Marker({
        map: this.map,
        position: { lat: coordinates[1], lng: coordinates[0] },
        scale: 1,
        icon: this.searchMarkerIcon,
        draggable: false,
        raiseOnDrag: false,
        title: address || 'Search'
      })
    }
    this.map.setCenter({ lat: coordinates[1], lng: coordinates[0] })
  }

  resetSearchMarker () {
    if (!this.searchMarker) return
    this.searchMarker.setOptions({
      map: null
    })
  }

  changeMarkerCoordinates (event) {
    const latLng = new window.google.maps.LatLng(event.details.markerCoordinates[1], event.details.markerCoordinates[0])
    this[this.selectedMarkerId].setPosition(latLng)
  }

  changeMarkerType (event) {
    this[this.selectedMarkerId].setOptions({
      icon: this.options.markers[event.details.status]
    })
  }

  setMarkerActive (event) {
    if (!this.selectedMarkerId) return
    this[this.selectedMarkerId].setOptions({
      icon: this.activeMarkerIcon,
      zIndex: 9999999
    })
    this.container.dispatchEvent(Object.assign(new Event('marker-selected'), {
      details: { id: this.selectedMarkerId }
    }))
    this.map.panTo(this[this.selectedMarkerId].position)
  }

  resetSelectedMarker () {
    if (this.selectedMarkerId && this[this.selectedMarkerId]) {
      this[this.selectedMarkerId].setOptions({
        icon: this.options.markers[this[this.selectedMarkerId].status]
      })
    }

    this.container.dispatchEvent(new Event('reset-selected-marker'))
  }

  mapClickEventHandler (event) {
    this.map.setCenter(event.latLng)
    if (this.selectedMarkerId) this.resetSelectedMarker()
    this.container.dispatchEvent(Object.assign(new Event('empty-field-click'), {
      details: {
        coordinates: [event.latLng.lat(), event.latLng.lng()]
      }
    }))
  }

  selectMarkerById (markerId) {
    this.selectedMarkerId = markerId
    setTimeout(this.setMarkerActive.bind(this))
  }

  placeMarker (markerData) {
    const marker = Object.assign(new window.google.maps.Marker({
      map: this.map,
      position: { lat: markerData.coordinates[1], lng: markerData.coordinates[0] },
      icon: this.options.markers[markerData.status],
      draggable: false,
      raiseOnDrag: false,
      title: markerData.address,
      status: markerData.status
    }), { id: markerData.id })
    const markerClickHandler = this.createMarkerClickHandler(markerData.id, marker)
    marker.addListener('click', markerClickHandler.bind(this))
    return marker
  }

  createMarkerClickHandler (markerId, marker) {
    return function (event) {
      marker.setOptions({
        icon: this.activeMarkerIcon
      })
      if (this.selectedMarkerId && this.selectedMarkerId !== marker.id) {
        this[this.selectedMarkerId].setOptions({
          icon: this.options.markers[this[this.selectedMarkerId].status]
        })
      }
      this.selectedMarkerId = marker.id
      this.container.dispatchEvent(Object.assign(new Event('marker-selected'), {
        details: { id: markerId }
      }))
      setTimeout(this.setMarkerActive.bind(this))
    }.bind(this)
  }

  placeMarkers () {
    for (const status of localStorage.$buildingTypes) {
      const collection = localStorage.getItemByName(status)
      collection.forEach(markerId => {
        const markerData = localStorage.getItemByName(markerId)
        markerData.id = markerId
        this[markerId] = this.placeMarker(markerData, status)
      })
    }
  }

  removeMarker () {
    if (!this.selectedMarkerId) return
    this[this.selectedMarkerId].setOptions({
      map: null
    })
    this.selectedMarkerId = null
  }
}

Object.assign(Map.prototype, require('@/config/Map.config').default)

Map.prototype.createMap = async function () {
  if (!await this.loadScript()) return console.error('Error accessing Google Maps API')
  window.google.maps.SymbolPath.MARKER = 'M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z'
  Object.assign(Map.prototype, {
    __geo: window.google.maps,
    Polygon: window.google.maps.Polygon,
    __places: window.google.maps.places,
    __geoCoder: new window.google.maps.Geocoder(),
    Autocomplete: window.google.maps.places.Autocomplete,
    __geoLocation: window.google.maps.geometry.poly.containsLocation
  })

  const markers = Map.prototype.options.markerTypes.map((type, index) => ({
    [type]: {
      path: window.google.maps.SymbolPath.MARKER,
      strokeColor: '#fff',
      strokeWeight: 1.2,
      strokeOpacity: 1,
      fillColor: Map.prototype.options.markerColors[index],
      fillOpacity: 1,
      scale: 1
    }
  }))
  Map.prototype.options.markers = Object.assign({}, ...markers)

  this.map = new window.google.maps.Map(this.mapContainer, {
    center: this.center,
    zoom: 14,
    styles: mapConfig,
    disableDefaultUI: true
  })

  window.google.maps.event.addListener(this.map, 'click', this.mapClickEventHandler.bind(this))

  this.placeMarkers()

  this.container.dispatchEvent(new Event('map-is-ready'))
}

export default Map
