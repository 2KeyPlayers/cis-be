const { pool } = require('./config')
const { validationResult } = require('express-validator');

// const Pool = require('pg').Pool
// const pool = new Pool({
//   Veduci: 'me',
//   host: 'localhost',
//   database: 'api',
//   password: 'password',
//   port: 5432,
// })

const getVeduci = (request, response) => {
  pool.query('SELECT * FROM veduci ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getVeduciById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM veduci WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addVeduci = (request, response) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() })
  }

  const { meno, priezvisko, titul } = request.body

  pool.query('INSERT INTO veduci (meno, priezvisko, titul) VALUES ($1, $2, $3) RETURNING id', [meno, priezvisko, titul], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send({message: `Added Veduci with ID: ${results.rows[0].id}`})
  })
}

const updateVeduci = (request, response) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() })
  }

  const id = parseInt(request.params.id)
  const { meno, priezvisko, titul } = request.body

  pool.query(
    'UPDATE veduci SET meno = $1, priezvisko = $2, titul = $3 WHERE id = $3',
    [meno, priezvisko, titul, id],
    (error, results) => {
      if (error) {
        throw error
      }
      if (results.rowCount > 0) {
      // response.status(204)
      response.status(200).send({ message: `Modified Veduci with ID: ${id}` })
      } else {
        response.status(400).json({ error: `Veduci with ID: ${id} not found` })
      }
    }
  )
}

const deleteVeduci = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM veduci WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rowCount > 0) {
      // response.status(204)
      response.status(200).send({ message: `Deleted Veduci with ID: ${id}` })
    } else {
      response.status(400).json({ error: `Veduci with ID: ${id} not found` })
    }
  })
}

module.exports = {
  getVeduci,
  getVeduciById,
  addVeduci,
  updateVeduci,
  deleteVeduci
}
