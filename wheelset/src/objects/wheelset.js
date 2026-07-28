import * as THREE from "three";

import { createWheel } from "./wheel";
import { createAxle } from "./axle";

const defaultParameters = {
    semiBase: 1.20,
    axleLength: 2.40,
    diameter: 0.92
};

export function createWheelset(parameters = {}) {
    parameters = { ...defaultParameters, ...parameters };

    const wheelset = new THREE.Group();

    const leftWheel = createWheel(parameters);

    const rightWheel = createWheel(parameters);

    const axle = createAxle(parameters);

    leftWheel.position.x = -parameters.semiBase;

    rightWheel.position.x = parameters.semiBase;

    wheelset.add(leftWheel);
    wheelset.add(rightWheel);
    wheelset.add(axle);

    return wheelset;

}