const {PubSub} = require('@google-cloud/pubsub');

var topicName = 'verify_email';
var subname = 'cloud-sub';
projectId = 'dev-assignment4'

async function quickstart() {

  const pubsub = new PubSub({projectId});

  const payload = {
    to: 'emailhere',
    from: 'emailhere2',
    body: 'Hello from PubSub!'
  }
  const data = JSON.stringify(payload)
  pubsub.topic(topicName).publishMessage({data: Buffer.from(data)});
}

quickstart();