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
    const msg = JSON.stringify({
      msg: "Hello World 2022!!"
    })

    channel.assertQueue(queue, {
      durable: false
    })

    channel.sendToQueue(
      queue,
      Buffer.from(msg),
      { persistent: true }
    )

    console.log("MSG: %s", msg)

    setTimeout(() => {
      connection.close()
      process.exit(0)
    }, 500);

  })
});
