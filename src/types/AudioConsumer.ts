import mediasoupClient from 'mediasoup-client';

export type AudioConsumer = {
  _id: string;
  stage: string;
  stageMember: string;
  audioProducer: string;
  msConsumer: mediasoupClient.types.Consumer;
};
