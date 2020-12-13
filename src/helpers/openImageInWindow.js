export default (src) => {
  const parts = src.slice(5).split(',')
  const bytes = new Uint8Array(atob(parts[1]).split('').map(char => char.charCodeAt(0)))
  const file = new Blob([bytes], { type: parts[0] })
  const fileURL = URL.createObjectURL(file)
  window.open(fileURL)
}
