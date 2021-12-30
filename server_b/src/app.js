import express from "express"

const app = express()

app.get('/', (req, res) => {
  res.send('Server B Okay!!')
})

app.listen(3001, '0.0.0.0', () => {
  console.log('Server B okay...')
})