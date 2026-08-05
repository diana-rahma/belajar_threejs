import * as THREE from "three";

const defaultParameters={

    diameter:0.48,

    thickness:0.08,

    holeDiameter:0.14

};

export function createEndCap(parameters={}){

    parameters={

        ...defaultParameters,

        ...parameters

    };

    const geometry=new THREE.CylinderGeometry(

        parameters.diameter/2,

        parameters.diameter/2,

        parameters.thickness,

        64

    );

    geometry.computeVertexNormals();

    const material=new THREE.MeshPhysicalMaterial({

        color:0x777777,

        metalness:0.9,

        roughness:0.18,

        clearcoat:0.2

    });

    const endCap=new THREE.Mesh(

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

    endCap.add(line);

    endCap.castShadow=true;
    endCap.receiveShadow=true;

    return endCap;

}