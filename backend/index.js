const connectToMongo = require('./db');
var cors = require('cors');

const express = require('express');
const app = express()
const port = 5000

app.use(cors());
app.use(express.json());

app.get('/hi', (req, res) => {
  res.send('Hello World!')
})

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

connectToMongo();