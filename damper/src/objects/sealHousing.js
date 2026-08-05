import * as THREE from "three";

const defaultParameters = {
    diameter:0.30,
    thickness:0.10,
    rodDiameter:0.12,
    radialSegments:64
};

export function createSealHousing(parameters={}){
    parameters={
        ...defaultParameters,
        ...parameters
    };

    const geometry=new THREE.CylinderGeometry(
        parameters.diameter/2,
        parameters.diameter/2,
        parameters.thickness,
        parameters.radialSegments
    );

    const material=new THREE.MeshPhysicalMaterial({
        color:0x666666,
        metalness:0.95,
        roughness:0.12,
        clearcoat:0.25
    });

    const housing=new THREE.Mesh(
        geometry,
        material
    );

    const edges=new THREE.EdgesGeometry(geometry);

    const line=new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
            color:0x000000
        })
    );
    housing.add(line);

    housing.castShadow=true;
    housing.receiveShadow=true;

    return housing;

}