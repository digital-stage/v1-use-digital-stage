export interface GlobalVideoProducer {
  _id: string;
  deviceId: string; // <-- RELATION

  routerId: string;
  routerProducerId: string;

  // Optimizations for performance
  userId: string;
}
