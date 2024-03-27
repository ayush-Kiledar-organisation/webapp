const {PubSub} = require('@google-cloud/pubsub');

var topicName = 'verify_email';
var subname = 'cloud-sub';
projectId = 'dev-assignment4'

const pubsubFunc = () => {

  const pubsub = new PubSub({projectId});

  // const data = JSON.stringify(payload)
  pubsub.topic(topicName).publishMessage({data: Buffer.from("Hello pubsub")});
}

pubsubFunc();