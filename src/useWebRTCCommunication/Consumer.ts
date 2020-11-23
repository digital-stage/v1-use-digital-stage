import mediasoupClient from 'mediasoup-client';

export interface Consumer {
  stage: string;
  stageMember: string;
  videoProducer: string;
  msConsumer: mediasoupClient.types.Consumer;
}
