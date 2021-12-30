import express from "express"
import amqp from "amqplib/callback_api.js"

const app = express()

app.get('/', (req, res) => {
  res.send('Server A Okay!!')
})

app.post('/go-to-queue', (req, res) => {
  res.send('Ok!!')
})

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
    const msg = JSON.stringify({
      msg: "Hello World 2022!!"
    })

    channel.assertQueue(queue, {
      durable: false
    })

    channel.sendToQueue(queue, Buffer.from(msg))

    console.log("MSG: %s", msg)

    setTimeout(() => {
      connection.close()
      process.exit(0)
    }, 500);

  })
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server A okay...')
})