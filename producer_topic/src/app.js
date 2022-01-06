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

    const exchange = 'chat_topic'

    channel.assertExchange(exchange, 'topic', {
      durable: false
    });

    let binding_keys = []
    setInterval(() => {

      if (binding_keys.length===0) {
        binding_keys = [
          'from_bot.test.message', 'from_customer.test.message', 'from_operator.test.message'
        ]
      }

      const bk = binding_keys.pop()
      let msg = JSON.stringify({
        msg: `Hello World 2022!! ${Date.now()} - ${bk}`
      })

      channel.publish(exchange, bk, Buffer.from(msg));

      channel.publish(exchange, '', Buffer.from(msg));

      console.log("MSG: %s", msg)

    }, 1000)

    // setTimeout(() => {
    //   connection.close()
    //   process.exit(0)
    // }, 500);

  })
});
