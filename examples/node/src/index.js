import { URLToBase64 } from '../../../dist/index'
import * as data from '../../data'

URLToBase64(data.url)
  .then(console.log)