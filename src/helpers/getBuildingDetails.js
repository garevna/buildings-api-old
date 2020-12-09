export default async (buildingId) => {
  const response = await (await fetch(`${process.env.VUE_APP_BUILDINGS_API_ENDPOINT}/${buildingId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_BUILDINGS_API_KEY
    }
  })).json()
  localStorage.setItemByName('selectedBuilding', response.building)
  return response.building
}
