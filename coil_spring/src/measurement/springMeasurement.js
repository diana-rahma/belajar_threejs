import * as THREE from "three";

export function measureSpring(mesh, parameters){
    const box = new THREE.Box3().setFromObject(mesh);

    const size = box.getSize(
        new THREE.Vector3()
    );

    const innerDiameter = parameters.outerDiameter-(parameters.wireDiameter*2);

    const meanDiameter = parameters.outerDiameter-parameters.wireDiameter;

    const totalCoils = parameters.activeCoils+parameters.endCoils;

    const pitch = parameters.freeLength/(totalCoils-1);

    console.table({

    WireDiameter:

    parameters.wireDiameter,

    OuterDiameter:

    parameters.outerDiameter,

    InnerDiameter:

    innerDiameter,

    MeanDiameter:

    meanDiameter,

    FreeLength:

    parameters.freeLength,

    Pitch:

    pitch,

    TotalCoils:

    totalCoils,

    BoundingX:

    size.x,

    BoundingY:

    size.y,

    BoundingZ:

    size.z

    });
}