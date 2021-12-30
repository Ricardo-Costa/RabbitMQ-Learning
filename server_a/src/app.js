import express from "express"

const app = express()

app.get('/', (req, res) => {
  res.send('Server A Okay!!')
})

app.post('/go-to-queue', (req, res) => {
  res.send('Ok!!')
})

app.listen(3000, '0.0.0.0', () => {
  console.log('Server A okay...')
})