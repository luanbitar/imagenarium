(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";var _index=require("../../../src/index");!function(e){var n=e.url,i=e.pixelCrop,o=document.getElementById("originalImage"),t=document.getElementById("optmizedImage");console.log(_index.URLToBase64),(0,_index.URLToBase64)(n).then(function(e){return o.src=e,(0,_index.Base64ToFile)(e)}).then(function(e){return(0,_index.FileToCroppedFile)(e,i,.5)}).then(function(e){return(0,_index.FileToBase64)(e)}).then(function(e){t.src=e,console.log("original",(0,_index.SizeInBytesFromBase64)(o.src)/1e3,"KB"),console.log("optmized",(0,_index.SizeInBytesFromBase64)(t.src)/1e3,"KB")})}(data);
},{"../../../src/index":2}],2:[function(require,module,exports){
// Convert a Base64-encoded string to a File object
const Base64ToFile = (base64String, filename = 'fileName') => {
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
      const file = Base64ToFile(base64)
      resolve(file)
    })
})

// Download an Base64-encoded file
const DownloadFromBase64 = (base64Data, filename) => {
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
const Base64ToCanvas = (canvasRef, image64, pixelCrop, quality = 1.0) => new Promise((resolve, reject) => {
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
const FileToCroppedFile = (imageFile, pixelCrop, quality = undefined) => new Promise((resolve, reject) => {
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  FileToBase64(imageFile)
    .then(base64 => Base64ToCanvas(canvas, base64, pixelCrop, quality))
    .then(croppedBase64 => Base64ToFile(croppedBase64, imageFile.name))
    .then(file => {
      canvas.remove()
      resolve(file)
    })
})

const SizeInBytesFromBase64 = base64 => {
  const length = base64.length
  const lastTwoCharacters = base64.substring(length-2, length)
  let y = 1
  if(lastTwoCharacters === '==') y = 2
  return (length * (3/4)) - y
}

const imagenarium = {
  Base64ToFile,
  FileToBase64,
  URLToBase64,
  URLToFile,
  FileToCroppedFile,
  DownloadFromBase64,
  extractFileExtensionFromBase64,
  Base64ToCanvas,
  SizeInBytesFromBase64
}


console.log('importing...')
try {
  module.exports = imagenarium
  console.log('exported')
  
} catch (e) {
  // window.imagenarium = imagenarium
  // console.log(e instanceof ReferenceError)
  // if (e instanceof ReferenceError) {
  //   console.log('global')
  //   window.imagenarium = imagenarium
  // }
}
// if(module !== undefined && typeof module === 'object' && module.exports) {
//   module.exports = imagenarium
// } else {
//   window.imagenarium = imagenarium
// }
// if (typeof window !== 'undefined' && window) {
//   if (typeof module === 'object' && module.exports) {
//     module.exports = imagenarium
// 	} else {
// 	  window.imagenarium = imagenarium
//   }
// }
},{}]},{},[1])