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

    const queue = 'hello'

    channel.assertQueue(queue, {
      durable: false
    })
    channel.prefetch(1)

    // ------------------- NO -> Acknowledgement --------------------------------- //
    /*
    channel.consume(queue, msg => {
      console.log("Received %s", msg.content.toString());
    }, {
      noAck: true
    })
    */

    // ------------------- Acknowledgement --------------------------------- //
    channel.consume(queue, msg => {
      console.log("Received %s", msg.content.toString());

      // do something
      setTimeout(() => {
        channel.ack(msg)

        connection.close()
        process.exit(0)
      }, 1000);

    }, {
      // manual acknowledgment mode,
      noAck: false
    })
  })
})
