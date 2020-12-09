export default async () => {
  localStorage.clear()
  localStorage.$buildingTypes.forEach(type => localStorage.setItemByName(type, []))
  const response = await (await fetch(process.env.VUE_APP_BUILDINGS_API_ENDPOINT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_BUILDINGS_API_KEY
    }
  })).json()
  if (!response.description) {
    console.warn('ERROR readin DB')
    return
  }
  response.description.forEach((building, index) => {
    const status = localStorage.$buildingTypes.indexOf(building.status) !== -1 ? building.status : localStorage.$buildingTypes.default
    localStorage.setItemByName(building._id, building)
    localStorage.addBuildingToCollection(building._id, status)
  })
  localStorage.setItemByName('selectedBuilding', null)
}
