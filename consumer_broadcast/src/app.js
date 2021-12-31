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

    const exchange = 'chat'

    channel.assertExchange(exchange, 'fanout', {
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
      channel.bindQueue(q.queue, exchange, '')

      channel.consume(q.queue, msg => {
        console.log(msg.content.toString())
      }, {
        noAck: true
      })
    })

  })
})
