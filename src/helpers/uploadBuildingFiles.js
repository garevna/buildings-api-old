const readFile = function (file) {
  return new Promise((resolve, reject) => {
    const reader = Object.assign(new FileReader(), {
      onload: (event) => resolve(event.target.result),
      onerror: () => reject(new Error(`Error reading the file ${file.name}`))
    })
    reader.readAsDataURL(file)
  })
}

export default async (file, route) => {
  const config = require('@/config/uploads').default

  if (Object.keys(config).indexOf(route) === -1) return { error: 'Invalid route' }
  if (file.type.indexOf(config[route].type) === -1) return { error: 'Invalid file type' }

  const fileResult = {
    body: null,
    error: null
  }

  fileResult.body = await readFile(file).catch((error) => { fileResult.error = error })
  if (fileResult.error) return fileResult
  if (fileResult.statusCode && fileResult.message) return Object.assign(fileResult, { error: fileResult.message })

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

  return response
}
