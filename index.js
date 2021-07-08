require('dotenv').config()
const express = require('express')
const Goodreads = require('./controllers/goodreads-controller')

const app = express()

const PORT = 5000

app.get('/search', async (req, res) => {
  const goodreads = new Goodreads()
  try {
    const { query, page, search } = req.query
    const rspBody = await goodreads.searchBooks(query, page, search)
    res.status(200).send(rspBody)
  } catch (err) {
    if (err?.response) {
      res.status(err.response.status).send(err.response.statusText)
    } else {
      res.status(500).send('Internal Server Error')
    }
  }
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
