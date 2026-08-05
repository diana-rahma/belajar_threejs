import * as THREE from "three";

const defaultParameters = {
    diameter: 0.40,
    length: 1.20,
    radialSegments: 64
};

export function createCylinder(parameters = {}) {

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
        color: 0x777777,
        metalness: 0.9,
        roughness: 0.18,
        clearcoat: 0.2
    });

    const cylinder = new THREE.Mesh(
        geometry,
        material
    );

    const edges = new THREE.EdgesGeometry(
        geometry
    );

    const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
            color: 0x000000
        })
    );

    cylinder.add(line);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    return cylinder;
}