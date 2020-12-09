export default {
  storage: localStorage,
  options: {
    container: document.body,
    height: '700px',
    width: '100%',
    center: { lat: -37.87013628, lng: 144.963058 },
    markerTypes: require('@/config/types').default.types,
    markerColors: require('@/config/types').default.colors,
    markers: {}
  },
  activeMarkerIcon: {
    path: 'M12,3L2,12H5V20H19V12H22L12,3M12,7.7C14.1,7.7 15.8,9.4 15.8,11.5C15.8,14.5 12,18 12,18C12,18 8.2,14.5 8.2,11.5C8.2,9.4 9.9,7.7 12,7.7M12,10A1.5,1.5 0 0,0 10.5,11.5A1.5,1.5 0 0,0 12,13A1.5,1.5 0 0,0 13.5,11.5A1.5,1.5 0 0,0 12,10Z',
    strokeColor: '#fff',
    strokeWeight: 1.3,
    strokeOpacity: 1,
    fillColor: '#f0f',
    fillOpacity: 1,
    scale: 1.2
  },
  searchMarkerIcon: {
    path: 'M11,2V4.07C7.38,4.53 4.53,7.38 4.07,11H2V13H4.07C4.53,16.62 7.38,19.47 11,19.93V22H13V19.93C16.62,19.47 19.47,16.62 19.93,13H22V11H19.93C19.47,7.38 16.62,4.53 13,4.07V2M11,6.08V8H13V6.09C15.5,6.5 17.5,8.5 17.92,11H16V13H17.91C17.5,15.5 15.5,17.5 13,17.92V16H11V17.91C8.5,17.5 6.5,15.5 6.08,13H8V11H6.09C6.5,8.5 8.5,6.5 11,6.08M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11Z',
    strokeColor: '#fff',
    strokeWeight: 1.0,
    strokeOpacity: 1,
    fillColor: '#900',
    fillOpacity: 1,
    scale: 2
  },
  setMapSize: function () {
    const box = this.container.getBoundingClientRect
    this.height = box && box.height ? box.height : typeof this.options.height === 'number' ? this.options.height : 400
    this.mapHeight = this.height + 'px'
    this.mapWidth = '100%'
    this.mapContainer.style = `
      height: ${this.mapHeight};
      width: ${this.mapWidth};
    `
  },
  loadScript: require('@/helpers/loadGoogleMapsScript').default
}
