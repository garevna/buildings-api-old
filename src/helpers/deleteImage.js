export default async (endpoint) => {
  const response = await (await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.VUE_APP_BUILDINGS_API_KEY
    }
  })).json()

  return response
}
