const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')
const path = require('path')
const app = express()

const PORT = process.env.PORT || config.get('port')

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200
  })
);
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/auth', require('./routes/auth.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

async function start() {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology:true
    })
    await app.listen(PORT, () => {
      console.log('Server has been started on port', PORT)
    })
  } catch (e) {
    console.log('Чтото пошло не так, попробуйте снова', e)
    process.exit(1)
  }
}

start()

