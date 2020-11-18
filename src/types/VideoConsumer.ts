import mediasoupClient from 'mediasoup-client';

export type VideoConsumer = {
  _id: string;
  stage: string;
  stageMember: string;
  videoProducer: string;
  msConsumer: mediasoupClient.types.Consumer;
};
