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
    });

    setInterval(() => {

      let msg = JSON.stringify({
        msg: `Hello World 2022!! ${Date.now()}`
      })

      channel.publish(exchange, '', Buffer.from(msg));

      console.log("MSG: %s", msg)

    }, 1000)

    // setTimeout(() => {
    //   connection.close()
    //   process.exit(0)
    // }, 500);

  })
});
