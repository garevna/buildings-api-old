export default async (buildingData) => {
  const response = await (await fetch(process.env.VUE_APP_BUILDINGS_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_BUILDINGS_API_KEY
    },
    body: JSON.stringify(buildingData)
  })).json()

  if (response.error) {
    console.warn(response.error)
    return response
  }

  localStorage.setItemByName('selectedBuilding', Object.assign(buildingData, { _id: response.data }))
  const { address, addressComponents, buildingName, coordinates, distanceFromFootprint, status, _id } = buildingData
  localStorage.addNewBuilding(_id, Object.assign({}, {
    address,
    addressComponents,
    buildingName,
    coordinates,
    distanceFromFootprint,
    status,
    _id
  }))

  return response
}
