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
    });

    let binding_keys = []
    setInterval(() => {

      if (binding_keys.length===0) {
        binding_keys = [
          'from_bot', 'from_customer', 'from_operator'
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
