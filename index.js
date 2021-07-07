require('dotenv').config();
const express = require('express');

const app = express();

const PORT = 5000;

app.get('/', (req, res) => {
    res.send({some: 'json'});
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
