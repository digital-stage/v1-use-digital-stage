import {
  CustomGroup,
  CustomStageMember,
  Group,
  StageMember,
  ThreeDimensionAudioProperties,
} from 'use-digital-stage';

const calculate3DAudioParameters = (
  group: Group,
  customGroup: CustomGroup | undefined,
  stageMember: StageMember,
  customStageMember: CustomStageMember | undefined,
  track: ThreeDimensionAudioProperties
): {
  x: number;
  y: number;
  z: number;
  rX: number;
  rY: number;
  rZ: number;
} => {
  let x = customStageMember?.x || stageMember.x || 0;
  let y = customStageMember?.y || stageMember.y || 0;
  let z = customStageMember?.z || stageMember.z || 0;
  if (customGroup) {
    x = x + (customGroup.x || 0);
    y = y + (customGroup.y || 0);
    z = z + (customGroup.z || 0);
  } else {
    x = x + (group.x || 0);
    y = y + (group.y || 0);
    z = z + (group.z || 0);
  }
  x = x + (track.x || 0);
  y = y + (track.y || 0);
  z = z + (track.z || 0);

  const rX = customStageMember ? customStageMember.rX : stageMember.rX;
  const rY = customStageMember ? customStageMember.rY : stageMember.rY;
  const rZ = customStageMember ? customStageMember.rZ : stageMember.rZ

  return {
    x,
    y,
    z,
    rX,
    rY,
    rZ,
  };
};

const zRotationToVector = (degrees: number) => {
  // convert degrees to radians and offset the angle so 0 points towards the listener
  const radians = (degrees - 90) * (Math.PI / 180);
  // using cosine and sine here ensures the output values are always normalised
  // i.e. they range between -1 and 1
  const x = Math.cos(radians);
  const y = Math.sin(radians);

  // we hard-code the Z component to 0, as Y is the axis of rotation
  return [x, y, 0];
};

const calculateDirectionVector = (x: number, y: number, z: number, rX: number, rY: number, rZ: number) => {
  console.log("Rotation (degrees):", rZ);
  const radiansZ = (rZ - 90) * (Math.PI / 180);
  console.log("Rotation (radians):", radiansZ);
  //const y1 = y + (y*Math.cos(radiansZ) - x*Math.sin(radiansZ));
  //const x1 = x + (y*(Math.sin(radiansZ) + x*Math.cos(radiansZ)));
  //const z1 = z;
  const x1 = Math.cos(radiansZ);
  const y1 = Math.sin(radiansZ);
  //return [Math.round(x1), Math.round(y1), z];

  return [x1, y1, 0]
}

export { calculate3DAudioParameters, zRotationToVector, calculateDirectionVector };
