require('dotenv').config()
const express = require('express')
const Goodreads = require('./controllers/goodreads-controller')

const app = express()
app.use((req, rsp, next) => {
  console.log()
  console.log('*** Received request***')
  console.log(req.query);
  console.log(req.headers);
  next();
  // Open the API up to codepen.io
  rsp.setHeader('Access-Control-Allow-Origin', '*')
  console.log('***Sending response***')
  console.log(`${rsp.statusCode} ${rsp.statusMessage || ''}`);
  console.log()
})

const PORT = 5000

app.get('/', (req, res) => {
  res.send('OK')
})

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
