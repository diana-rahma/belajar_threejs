import * as THREE from "three";
import { HelixCurve } from "../curves/HelixCurve";

const defaultParameters={
    wireDiameter:0.05,
    coilDiameter:1.00,
    freeLength:2.50,
    turns:8
}

export function createSpring(parameters={}){
    parameters={
        ...defaultParameters,
        ...parameters
    }

    const meanDiameter = parameters.outerDiameter - parameters.wireDiameter;

    const radius = meanDiameter / 2;

    const totalCoils = parameters.activeCoils + parameters.endCoils;

    const pitch = parameters.freeLength / (totalCoils - 1);

    const path = new HelixCurve(
        radius,
        pitch,
        totalCoils,
        parameters.hand
    );


    const geometry = new THREE.TubeGeometry(
        path,
        500,
        parameters.wireDiameter/2,
        24,
        false
    );

    const edges = new THREE.EdgesGeometry(geometry);

    const edgeLines = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
            color: 0x000000
        })
    );

    const material= new THREE.MeshPhysicalMaterial({
        color:0x777777,
        metalness:0.9,
        roughness:0.18,
        clearcoat:0.2,
        wireframe:parameters.wireframe
    });

    const spring = new THREE.Mesh(
        geometry,
        material
    );

    if(parameters.endType==="closed"){
        console.log("Closed End");
    } else{
        console.log("Open End");
    }

    spring.add(edgeLines);

    spring.castShadow=true;
    spring.receiveShadow=true;

    return spring;

    
}

