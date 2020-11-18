import { ThreeDimensionAudioProperties } from './ThreeDimensionAudioProperty';

export interface CustomStageMemberAudioProducer
  extends ThreeDimensionAudioProperties {
  _id: string;
  userId: string; // <-- RELATION
  stageMemberAudioProducerId: string; // <-- RELATION

  // Optimizations for performance
  stageId: string;
}
