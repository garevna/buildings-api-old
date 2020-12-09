Storage.prototype.getItemByName = function (name) {
  return JSON.parse(this.getItem(name))
}
Storage.prototype.setItemByName = function (name, payload) {
  this.setItem(name, JSON.stringify(payload))
}

/* KEYS FOR SEARCH */

Storage.prototype.getAllKeys = function () {
  const streets = new Set()
  const cities = new Set()
  const postalCodes = new Set()
  const states = new Set()
  const admins = new Set()
  for (const status of this.$buildingTypes) {
    const collection = this.getItemByName(status)
    for (const markerId of collection) {
      const marker = this.getItemByName(markerId)
      if (marker.properties) {
        streets.add(marker.properties.street)
        cities.add(marker.properties.city)
        postalCodes.add(marker.properties.postCode)
        states.add(marker.properties.state)
        admins.add(marker.properties.admin)
      }
    }
  }
  return { streets, cities, postalCodes, states, admins }
}

/* SEARCH */

Storage.prototype.findMarkersByAddress = function (address) {
  let result = []
  for (const status of this.$buildingTypes) {
    const collection = this.getItemByName(status)
    result = result.concat(collection.filter(markerId => this.getItemByName(markerId).address === address))
  }
  return result
}

Storage.prototype.findMarkersByProperty = function (propName, propValue) {
  let result = []
  for (const status of this.$buildingTypes) {
    const collection = this.getItemByName(status)
    result = result.concat(collection.filter(markerId => {
      const marker = this.getItemByName(markerId)
      return marker.properties && marker.properties[propName] === propValue
    }))
  }
  return result
}

Storage.prototype.findMarkersByStreet = function (street) {
  return this.findMarkersByProperty('street', street)
}
Storage.prototype.findMarkersByCity = function (city) {
  return this.findMarkersByProperty('city', city)
}
Storage.prototype.findMarkersByState = function (state) {
  return this.findMarkersByProperty('state', state)
}
Storage.prototype.findMarkersByAdminArea = function (area) {
  return this.findMarkersByProperty('admin', area)
}
Storage.prototype.findMarkersByPostalCode = function (postCode) {
  return this.findMarkersByProperty('postCode', postCode)
}

Storage.prototype.findMarker = function (address, coordinates) {
  for (const status of this.$buildingTypes) {
    const collection = this.getItemByName(status)
    for (const markerId of collection) {
      const marker = this.getItemByName(markerId)
      if (marker.address === address) return Object.assign(marker, { id: markerId })
      if (marker.address.indexOf(address) >= 0) {
        console.warn('Partial consilience found')
      }
      if (JSON.stringify(marker.coordinates) === JSON.stringify(coordinates)) {
        this.setItemByName(markerId, {
          address,
          coordinates,
          status: marker.status
        })
        return Object.assign(marker, { id: markerId })
      }
    }
  }
  return null
}

Storage.prototype.getMarkerCoordinates = function (markerId) {
  return this.getItemByName(markerId).coordinates
}
Storage.prototype.setMarkerCoordinates = function (markerId, coordinates) {
  const marker = this.getItemByName(markerId)
  marker.coordinates = coordinates
  this.setItemByName(markerId, marker)
}

Storage.prototype.setBuilingsListItem = function (_id, payload) {
  this.setItemByName(_id, {
    _id,
    address: payload.address,
    addressComponents: payload.addressComponents,
    buildingName: payload.buildingName,
    coordinates: payload.coordinates,
    distanceFromFootprint: payload.distanceFromFootprint,
    status: payload.status
  })
}

Storage.prototype.getMarkerType = function (markerId) {
  return this.getItemByName(markerId).status
}

Storage.prototype.addNewBuilding = function (id, payload) {
  payload.status = this.$buildingTypes.indexOf(payload.status) !== -1 ? payload.status
    : this.$buildingTypes.default
  this.addBuildingToCollection(id, payload.status)
  this.setItemByName('selectedBuilding', payload)
  this.setBuilingsListItem(id, payload)
  this.emit({
    eventType: 'new-marker-added',
    markerId: id,
    status: payload.status,
    coordinates: payload.coordinates
  })
}

Storage.prototype.addBuildingToCollection = function (id, status) {
  if (this.$buildingTypes.indexOf(status) === -1) {
    console.warn(`Building ${id} has ivalid status`)
    status = this.$buildingTypes.default
  }
  let buildingExist = false
  for (const type of this.$buildingTypes) {
    buildingExist = this.getItemByName(type).indexOf(id) !== -1
    if (buildingExist) {
      console.warn(`Building ${id} already exist`)
      return
    }
  }

  const collection = this.getItemByName(status)
  collection.push(id)
  this.setItemByName(status, collection)
}

Storage.prototype.removeBuildingFromCollection = function (id) {
  for (const status of this.$buildingTypes) {
    const collection = this.getItemByName(status)
    const index = collection.indexOf(id)
    if (index !== -1) {
      collection.splice(index, 1)
      this.setItemByName(status, collection)
      break
    }
  }
}

Storage.prototype.removeBuilding = function (id) {
  this.removeBuildingFromCollection(id)
  this.removeItem(id)
}

Storage.prototype.updateMarkerType = function (status) {
  const currentBuilding = this.getItemByName('selectedBuilding')
  if (this.$buildingTypes.indexOf(status) === -1) {
    return false
  }
  this.removeBuildingFromCollection(currentBuilding._id)
  this.addBuildingToCollection(currentBuilding._id, status)

  this.setItemByName(currentBuilding._id, Object.assign(this.getItemByName(currentBuilding._id), { status }))
  this.setItemByName('selectedBuilding', Object.assign(this.getItemByName('selectedBuilding'), { status }))
  this.emit({
    eventType: 'marker-type-changed',
    markerId: currentBuilding._id,
    status
  })
}

Storage.prototype.getAllBuildings = function () {
  const list = []
  for (const status of this.$buildingTypes) {
    this.getItemByName(status).forEach((buildingId) => {
      list.push(this.getItemByName(buildingId))
    })
  }
  return list
}

Storage.prototype.emit = function (data) {
  const { eventType, ...details } = data
  this.eventHandler.dispatchEvent(Object.assign(new Event(eventType), { details }))
}
