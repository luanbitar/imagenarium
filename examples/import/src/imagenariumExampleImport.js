import { Base64ToFile, FileToCroppedFile, FileToBase64, URLToBase64, SizeInBytesFromBase64 } from '../../../src/index'

(({ url, pixelCrop }) => {
  let originalImage = document.getElementById('originalImage'),
        optmizedImage = document.getElementById('optmizedImage')
  console.log(URLToBase64)
  URLToBase64(url)
    .then(b64 => {
      originalImage.src = b64
      return Base64ToFile(b64)
    })
    .then(file => FileToCroppedFile(file, pixelCrop, 0.5))
    .then(cropped => FileToBase64(cropped))
    .then(b64 => {
      optmizedImage.src=b64
      console.log('original', SizeInBytesFromBase64(originalImage.src)/1000, 'KB')
      console.log('optmized', SizeInBytesFromBase64(optmizedImage.src)/1000, 'KB')
    })
})(data)

