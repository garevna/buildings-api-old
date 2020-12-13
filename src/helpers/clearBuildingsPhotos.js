/* Temporary to repair DB */

const getBuildingData = async (buildingId) => {
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

const saveBuildingData = async (buildingData) => {
  const response = await (await fetch(`${process.env.VUE_APP_BUILDINGS_API_ENDPOINT}/${buildingData._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_BUILDINGS_API_KEY
    },
    body: JSON.stringify(buildingData)
  })).json()

  return response
}

export default async () => {
  const response = await (await fetch(process.env.VUE_APP_BUILDINGS_API_ENDPOINT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_BUILDINGS_API_KEY
    }
  })).json()
  if (!response.description) {
    console.error('ERROR readin DB')
    return
  }
  response.description.forEach(async (building, index) => {
    const buildingData = await getBuildingData(building._id)
    buildingData.files.photos = []
    console.log(await saveBuildingData(buildingData))
  })
}
