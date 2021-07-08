require('dotenv').config()
const express = require('express')
const Goodreads = require('./controllers/goodreads-controller')

const app = express()

const PORT = 5000

app.get('/search', async (req, res) => {
  const goodreads = new Goodreads()
  try {
    const rspBody = await goodreads.searchBooks(req.query)
    res.status(200).send(rspBody)
  } catch (err) {
    // TODO: more specific error handling
    res.status(500).send(err)
  }
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
