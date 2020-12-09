export default async () => {
  const building = localStorage.getItemByName('selectedBuilding')
  const response = await (await fetch(`${process.env.VUE_APP_BUILDINGS_API_ENDPOINT}/${building._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_BUILDINGS_API_KEY
    },
    body: JSON.stringify(building)
  })).json()

  return response
}
