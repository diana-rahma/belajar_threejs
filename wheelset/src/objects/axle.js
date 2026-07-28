import * as THREE from "three";

const defaultParameters = {
    axleLength: 2.40
};

export function createAxle(parameters = {}){
    parameters = { ...defaultParameters, ...parameters };

    const geometry = new THREE.CylinderGeometry(
        0.08,
        0.08,
        parameters.axleLength,
        64
    )

    const material = new THREE.MeshStandardMaterial({
        color:0x777777,
        metalness:0.7,
        roughness:0.25
    });

    const axle = new THREE.Mesh(
        geometry,
        material
    );

    axle.rotation.z = Math.PI/2;
    axle.castShadow=true;
    axle.receiveShadow=true;

    return axle;
}