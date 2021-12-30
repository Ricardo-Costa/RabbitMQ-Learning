import express from "express"
import amqp from "amqplib/callback_api.js"

const app = express()

amqp.connect('amqp://rabbit-mq:5672', (err, connection) => {
  if (err) {
    console.log(err)
    throw err
  }

  connection.createChannel((err, channel) => {
    if (err) {
      console.log(err)
      throw err
    }

    const queue = 'hello'

    channel.assertQueue(queue, {
      durable: false
    })

    channel.consume(queue, msg => {
      console.log("Received %s", msg.content.toString());
    }, {
      noAck: true
    })
  })
})

app.get('/', (req, res) => {
  res.send('Server B Okay!!')
})

app.listen(3001, '0.0.0.0', () => {
  console.log('Server B okay...')
})