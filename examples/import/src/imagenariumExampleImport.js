import { base64StringtoFile, imageFileToImageCroppedFile, FileToBase64, URLToBase64, sizeInBytesFromBase64, downloadFromBase64 } from '../../../dist/index'

(({ url, pixelCrop }) => {
  const originalImage = document.getElementById('originalImage'),
        optmizedImage = document.getElementById('optmizedImage')

  URLToBase64(url)
    .then(b64 => {
      originalImage.src = b64
      return base64StringtoFile(b64)
    })
    .then(file => imageFileToImageCroppedFile(file, pixelCrop, 0.5))
    .then(cropped => FileToBase64(cropped))
    .then(b64 => {
      optmizedImage.src=b64
      console.log('original', sizeInBytesFromBase64(originalImage.src)/1000, 'KB')
      console.log('optmized', sizeInBytesFromBase64(optmizedImage.src)/1000, 'KB')
    })

})(data)

