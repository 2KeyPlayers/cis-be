const express = require('express')
const bodyParser = require('body-parser')
const { check } = require('express-validator');
const cors = require('cors')
const db = require('./queries')
const port = 3000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// CORS
app.use(cors())
// const origin = {
//   origin: isProduction ? 'https://www.cvcmoldava.edu.sk' : '*',
// }
// app.use(cors(origin))

// HTTP headers and compression
// app.use(compression())
// app.use(helmet())

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute
//   max: 5, // 5 requests,
// })
// app.use(limiter)

app.get('/', (request, response) => {
  response.json({ info: 'RESTful API for CIS' })
})

/*app.route('/veduci')
  // GET endpoint
  .get(db.getVeduci)
  // POST endpoint
  .post(db.addVeduci)
app.route('/veduci/:id')
  // GET endpoint
  .get(db.getVeduciById)
  // POST endpoint
  .put(db.updateVeduci)
  // DELETE endpoint
  .delete(db.deleteVeduci)*/

app.get('/veduci', db.getVeduci)
app.post('/veduci', [
  check('meno')
    .not()
    .isEmpty()
    .isLength({ max: 255 })
    .trim(),
  check('priezvisko')
    .not()
    .isEmpty()
    .isLength({ max: 255 })
    .trim()
], db.addVeduci)
app.get('/veduci/:id', db.getVeduciById)
app.put('/veduci/:id', [
  check('meno')
    .not()
    .isEmpty()
    .isLength({ max: 255 })
    .trim(),
  check('priezvisko')
    .not()
    .isEmpty()
    .isLength({ max: 255 })
    .trim()
], db.updateVeduci)
app.delete('/veduci/:id', db.deleteVeduci)

// Start server
app.listen(process.env.PORT || port, () => {
  console.log(`App running on port ${process.env.PORT || port}.`)
})
