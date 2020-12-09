export default async (id) => {
  if (!id) {
    const building = localStorage.getItemByName('selectedBuilding')
    if (!building && !building._id) return { error: 'Invalid building' }
    id = building._id
  }

  const response = await (await fetch(`${process.env.VUE_APP_BUILDINGS_API_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_BUILDINGS_API_KEY
    }
  })).json()

  localStorage.removeBuilding(id)

  return response
}
