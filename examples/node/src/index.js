import { URLToBase64 } from '../../../dist/index'
import data from '../../data'

URLToBase64(data.url)
  .then(console.log)