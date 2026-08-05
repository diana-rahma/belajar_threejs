import * as THREE from 'three';

const defaultParameters={
    eyeRadius:0.18,
    eyeThickness:0.06,
    holeRadius:0.07,
    neckLength:0.18,
    neckDiameter:0.08
}

export function createEye(parameters={}){
    parameters={
        ...defaultParameters,
        ...parameters
    }

    const eye = new THREE.Group();

    const ringGeometry = new THREE.RingGeometry(
        parameters.eyeRadius,
        parameters.eyeThickness,
        32,
        64
    );

    const material = new THREE.MeshPhysicalMaterial({
        color:0x777777,
        metalness:0.9,
        roughness:0.18,
        clearcoat:0.2
    });

    const ring = new THREE.Mesh(
        ringGeometry,
        material
    );

    ring.rotation.x=Math.PI/2

    const edge = new THREE.EdgesGeometry(
        ringGeometry
    );

    const line = new THREE.LineSegments(
        edge,
        new THREE.LineBasicMaterial({
            color:0x000000
        })
    );

    ring.add(line);

    const neckGeometry = new THREE.CylinderGeometry(
        parameters.neckDiameter/2, 
        parameters.neckDiameter/2,
        parameters.neckLength,
        32
    );

    const neck = new THREE.Mesh(
        neckGeometry,
        material
    );

    neck.position.y=
        -parameters.eyeRadius
        -parameters.neckLength/2;
    
    ring.castShadow=true;
    ring.receiveShadow=true;

    neck.castShadow=true;
    neck.receiveShadow=true;

    eye.add(ring);
    eye.add(neck);
    return eye;
}