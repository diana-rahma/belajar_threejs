import * as THREE from 'three';

const defaultParameters = {
    diameter: 0.20,
    thickness: 0.05,
    radialSegments: 64
};

export function createRodGuide(parameters={}){
    parameters = {
        ...defaultParameters,
        ...parameters
    };

    const geometry = new THREE.CylinderGeometry(
        parameters.diameter / 2,
        parameters.diameter / 2,
        parameters.thickness,
        parameters.radialSegments
    );

    const material = new THREE.MeshPhysicalMaterial({
        color:0x999999,
        metalness:1,
        roughness:0.08,
        clearcoat:0.3
    });

    const rodGuide = new THREE.Mesh(
        geometry,
        material
    );

    const edges = new THREE.EdgesGeometry(geometry);

    const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
            color:0x000000
        })
    );
    rodGuide.add(line);

    rodGuide.castShadow = true;
    rodGuide.receiveShadow = true;

    return rodGuide;
}