const notFoundPDF = require('@/config/404.js').default
const notFoundImage = require('@/config/404-image.js').default

export default async (link, type = 'pdf') => {
  const response = await (await fetch(link)).json()
  if (response.error) {
    return type === 'pdf' ? notFoundPDF : notFoundImage
  } else {
    return response.file
  }
}
