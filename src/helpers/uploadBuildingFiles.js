const readFile = function (file) {
  return new Promise((resolve) => {
    const reader = Object.assign(new FileReader(), {
      onload: (event) => resolve({ body: event.target.result, error: null }),
      onerror: () => resolve({ body: null, error: `Error reading the file ${file.name}` })
    })
    reader.readAsDataURL(file)
  })
}

export default async (file, route) => {
  const config = require('@/config/uploads').default

  if (Object.keys(config).indexOf(route) === -1) return { error: 'Invalid route' }
  if (file.type.indexOf(config[route].type) === -1) return { error: 'Invalid file type' }

  const fileResult = await readFile(file)
  if (fileResult.error) return fileResult

  const building = localStorage.getItemByName('selectedBuilding')

  const response = await (await fetch(`${process.env.VUE_APP_BUILDINGS_API_ENDPOINT}/upload/${route}/${building._id}`, {
    method: 'POST',
    headers: {
      Authorization: process.env.VUE_APP_BUILDINGS_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: route,
      data: fileResult.body
    })
  })).json()

  if (response.statusCode && response.message) Object.assign(response, { error: response.message })

  return response
}
