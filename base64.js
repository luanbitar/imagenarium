// Convert a Base64-encoded string to a File object
export const base64StringtoFile = (base64String, filename = 'fileName') => {
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

// Convert an URL File to Base64-encoded string
export const URLToBase64 = url => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.onload = function() {
      var reader = new FileReader()
      reader.onloadend = function() {
        resolve(reader.result)
      }
      reader.readAsDataURL(xhr.response)
    }
    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.send()
  })
}

// Convert an URL File to File
export const URLToFile = url => {
  return new Promise(async (resolve, reject) => {
    const base64 = await URLToBase64(url)
    const file = base64StringtoFile(base64)
    resolve(file)
  })
}

// Convert an image File to Base64-encoded string
export const FileToBase64 = imageFile => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      resolve(reader.result)
    })
    reader.readAsDataURL(imageFile)
  })
}

// Download an Base64-encoded file
export const downloadBase64File = (base64Data, filename) => {
  var element = document.createElement('a')
  element.setAttribute('href', base64Data)
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

// Extract an Base64 Image's File Extension
export const extractImageFileExtensionFromBase64 = base64Data => {
  return base64Data.substring('data:image/'.length, base64Data.indexOf('base64'))
}

// Base64 Image to Canvas with a Crop
export const image64toCanvasRef = (canvasRef, image64, pixelCrop) => {
  return new Promise((resolve, reject) => {
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
      resolve(canvas.toDataURL('image/jpeg', 1.0))
    }
  })
}

// Receives Image File and return an Cropped Image File
export const imageFileToImageCroppedFile = (imageFile, pixelCrop) => {
  return new Promise(async (resolve, reject) => {
    const canvas = document.createElement('canvas')
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
    const base64 = await FileToBase64(imageFile)
    const croppedBase64 = await image64toCanvasRef(canvas, base64, pixelCrop)
    const file = base64StringtoFile(croppedBase64, imageFile.name)
    canvas.remove()
    resolve(file)
  })
}
