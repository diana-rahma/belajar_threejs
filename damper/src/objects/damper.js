import * as THREE from 'three';

import { createCylinder } from "./cylinder";
import { createRod } from "./rod";
import { createEye } from './eye';
import { createEndCap } from './endCap';
import { createSealHousing } from "./sealHousing";
import { createRodGuide } from "./rodGuide";


const defaultParameters = {
    cylinderDiameter: 0.45,
    cylinderLength: 1.40,
    rodDiameter: 0.12,
    rodLength: 1.80,
    eyeRadius: 0.18,
    eyeThickness: 0.06,
    rodExtension: 0.50
};

export function createDamper(parameters = {}) {

    parameters = {
        ...defaultParameters,
        ...parameters
    };

    const damper = new THREE.Group();
    damper.userData = {
        type: 'damper',
        name: parameters.name || 'Damper',
        parameters: { ...parameters }
    };

    const cylinder=createCylinder({
        diameter:parameters.cylinderDiameter,
        length:parameters.cylinderLength
    });

    const rod=createRod({
        diameter:parameters.rodDiameter,
        length:parameters.rodLength
    });


    const cylinderLength = 1.4;
    const rodLength = 1.8;
    const eyeRadius = 0.18;

    const topEye=createEye({
        eyeRadius:parameters.eyeRadius,
        eyeThickness:parameters.eyeThickness
    });

    const bottomEye=createEye({
        eyeRadius:parameters.eyeRadius,
        eyeThickness:parameters.eyeThickness
    });

    const endCap = createEndCap({
        diameter: parameters.cylinderDiameter + 0.03,
        thickness: 0.08
    });

    const sealHousing=createSealHousing({
        diameter:parameters.cylinderDiameter*0.72,
        thickness:0.10,
        rodDiameter:parameters.rodDiameter
    });

    const rodGuide = createRodGuide({
        diameter: parameters.rodDiameter * 1.8,
        thickness: 0.05
    });

    const housingY = parameters.cylinderLength / 2 + 0.05;
    sealHousing.position.y = housingY;

    const rodGuideY = housingY + 0.075;
    rodGuide.position.y = rodGuideY;

    cylinder.position.set(0, 0, 0);

    const cylinderHalf=parameters.cylinderLength/2;
    const rodHalf=parameters.rodLength/2;

    const rodY = cylinderHalf + rodHalf - parameters.rodExtension;
    rod.position.y=rodY;

    const topEyeY=rodY+rodHalf+parameters.eyeRadius;

    endCap.position.y = cylinderHalf;
    topEye.position.y=topEyeY;

    const bottomEyeY=-cylinderHalf-parameters.eyeRadius;
    bottomEye.position.y=bottomEyeY;

    // const cylinderHalf = parameters.cylinderLength / 2;

    damper.add(cylinder);
    damper.add(endCap);
    damper.add(rod);
    damper.add(topEye);
    damper.add(rodGuide);
    damper.add(bottomEye);
    damper.add(sealHousing);

    return damper;
}