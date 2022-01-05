import amqp from "amqplib/callback_api.js"

amqp.connect(process.env.AMQP_CONNECTION, (err, connection) => {
  if (err) {
    console.log(err)
    throw err
  }

  connection.createChannel((err, channel) => {
    if (err) {
      console.log(err)
      throw err
    }

    const exchange = 'chat_direct'

    channel.assertExchange(exchange, 'direct', {
      durable: false
    })


    channel.assertQueue('', {
      exclusive: true
    }, (err, q) => {
      if (err) {
        console.log(err)
        throw err
      }

      console.log("Waiting for messages in %s", q.queue)
      if (process.env.BINDING_KEY === 'bot') {
        channel.bindQueue(q.queue, exchange, 'from_bot')
      } else {
        channel.bindQueue(q.queue, exchange, 'from_customer')
        channel.bindQueue(q.queue, exchange, 'from_operator')
      }

      channel.consume(q.queue, msg => {
        console.log(msg.content.toString())
      }, {
        noAck: true
      })
    })

  })
})
