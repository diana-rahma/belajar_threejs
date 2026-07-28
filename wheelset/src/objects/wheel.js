import * as THREE from "three";

const defaultParameters = {
    diameter: 0.92,
    width: 0.14,
    flangeHeight: 0.03,
    hubRadius: 0.18,
    hubWidth: 0.09
};

export function createWheel(parameters = {}) {
    parameters = { ...defaultParameters, ...parameters };

    const profile = generateProfile(parameters);
    const geometry = new THREE.LatheGeometry(profile, 256);

    geometry.computeBoundingBox();
    geometry.center();
    geometry.computeVertexNormals();

    const material = new THREE.MeshPhysicalMaterial({
        color: 0x777777,
        metalness: 0.9,
        roughness: 0.18,
        clearcoat: 0.2
    });

    const wheel = new THREE.Mesh(geometry, material);

    material.wireframe = parameters.wireframe ?? false;

    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x000000 })
    );

    wheel.add(line);
    wheel.rotation.z = Math.PI / 2;

    wheel.castShadow = true;
    wheel.receiveShadow = true;

    return wheel;
}

function generateProfile(parameters) {
    const radius = parameters.diameter / 2;
    const flange = radius + parameters.flangeHeight;

    return [
        new THREE.Vector2(parameters.hubRadius, 0),
        new THREE.Vector2(radius * 0.72, 0),
        new THREE.Vector2(radius * 0.9, parameters.width * 0.25),
        new THREE.Vector2(radius, parameters.width * 0.45),
        new THREE.Vector2(flange, parameters.width * 0.6),
        new THREE.Vector2(radius, parameters.width),
        new THREE.Vector2(parameters.hubRadius, parameters.width),
        new THREE.Vector2(parameters.hubRadius, 0)
    ];
}
