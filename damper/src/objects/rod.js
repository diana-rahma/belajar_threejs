import * as THREE from 'three';

const defaultParameters = {
    diameter: 0.12,
    length: 1.60,
    radialSegments: 64
};

export function createRod(parameters = {}) {

    parameters = {
        ...defaultParameters,
        ...parameters
    };

    const geometry = new THREE.CylinderGeometry(
        parameters.diameter / 2,
        parameters.diameter / 2,
        parameters.length,
        parameters.radialSegments
    );

    geometry.computeVertexNormals();

    const material = new THREE.MeshPhysicalMaterial({
        color:0xcfcfcf,
        metalness:1,
        roughness:0.08,
        clearcoat:1
    });

    const rod = new THREE.Mesh(
        geometry,
        material
    );

    const edges = new THREE.EdgesGeometry(
        geometry
    );

    const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
            color:0x000000
        })
    );
    rod.add(line);
    rod.castShadow = true;
    rod.receiveShadow = true;
    return rod;
}