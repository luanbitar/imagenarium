// Convert a Base64-encoded string to a File object
// TODO: rename to Base64ToFile
const base64StringtoFile = (base64String, filename = 'fileName') => {
  let arr = base64String.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

// Convert an image File to Base64-encoded string
const FileToBase64 = imageFile => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => {
    resolve(reader.result)
  })
  reader.readAsDataURL(imageFile)
})

// Convert an URL File to Base64-encoded string
const URLToBase64 = url => new Promise((resolve, reject) => {
  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      var reader = new FileReader()
      reader.onloadend = function() {
        resolve(reader.result)
      }
      reader.readAsDataURL(blob)
    })
})

// Convert an URL File to File
const URLToFile = url => new Promise((resolve, reject) => {
  URLToBase64(url)
    .then(base64 => {
      const file = base64StringtoFile(base64)
      resolve(file)
    })
})

// Download an Base64-encoded file
const downloadFromBase64 = (base64Data, filename) => {
  var element = document.createElement('a')
  element.setAttribute('href', base64Data)
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

// Extract an Base64 Image's File Extension
const extractFileExtensionFromBase64 = base64Data => base64Data.substring('data:image/'.length, base64Data.indexOf('base64'))

// Base64 Image to Canvas with a Crop
// TODO: rename to Base64ToCanvas
const image64toCanvasRef = (canvasRef, image64, pixelCrop, quality = 1.0) => new Promise((resolve, reject) => {
  const canvas = canvasRef
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')
  const image = new Image()
  image.src = image64
  image.onload = function () {
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    )
    resolve(canvas.toDataURL('image/jpeg', quality))
  }
})

// Receives Image File and return an Cropped Image File
// TODO: rename to FileToCroppedFile
const imageFileToImageCroppedFile = (imageFile, pixelCrop, quality = undefined) => new Promise((resolve, reject) => {
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  FileToBase64(imageFile)
    .then(base64 => image64toCanvasRef(canvas, base64, pixelCrop, quality))
    .then(croppedBase64 => base64StringtoFile(croppedBase64, imageFile.name))
    .then(file => {
      canvas.remove()
      resolve(file)
    })
})

const imagenarium = {
  URLToFile,
  URLToBase64,
  FileToBase64,
  base64StringtoFile,
  imageFileToImageCroppedFile,
  downloadFromBase64,
  extractFileExtensionFromBase64,
  image64toCanvasRef
}

if (typeof window !== 'undefined' && window) {
  if (typeof module === 'object' && module.exports) {
	  module.exports = imagenarium;
	} else {
	  window.imagenarium = imagenarium;
  }
}