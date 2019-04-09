import { URLToFile, imageFileToImageCroppedFile, FileToBase64, URLToBase64 } from '../../../dist/index'

(() => {
  const url = 'https://picsum.photos/1024/768/?random'
  const pixelCrop = {
    x: 0,
    y: 0,
    height: 800,
    width: 800
  }
  URLToFile(url)
    .then(file => imageFileToImageCroppedFile(file, pixelCrop, 0.2))
    .then(cropped => FileToBase64(cropped))
    .then(console.log)
})()
