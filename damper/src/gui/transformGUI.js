import GUI from "lil-gui";
import * as THREE from "three";

export const transformParameters={

    positionX:0,
    positionY:0,
    positionZ:0,

    rotationX:0,
    rotationY:0,
    rotationZ:0,

    scaleX:1,
    scaleY:1,
    scaleZ:1

};

export function createTransformGUI(target){
    const gui=new GUI();
    const getObj = () => (typeof target === "function" ? target() : target);

    const folder=gui.addFolder("Transform");

    folder.add(transformParameters, "positionX", -10, 10, 0.01)
    .name("Position X")
    .onChange(value=>{
        const obj = getObj();
        if(obj) obj.position.x=value;
    });

    folder.add(transformParameters, "positionY", -10, 10, 0.01)
    .name("Position Y")
    .onChange(value=>{
        const obj = getObj();
        if(obj) obj.position.y=value;
    });

    folder.add(transformParameters, "positionZ", -10, 10, 0.01)
    .name("Position Z")
    .onChange(value=>{
        const obj = getObj();
        if(obj) obj.position.z=value;
    });

    // rotation
    folder.add(transformParameters, "rotationX", -180, 180, 1)
    .name("Rotation X")
    .onChange(value=>{
        const obj = getObj();
        if(obj) obj.rotation.x=THREE.MathUtils.degToRad(value);
    });

    folder.add(transformParameters, "rotationY", -180, 180, 1)
    .name("Rotation Y")
    .onChange(value=>{
        const obj = getObj();
        if(obj) obj.rotation.y=THREE.MathUtils.degToRad(value);
    });

    folder.add(transformParameters, "rotationZ", -180, 180, 1)
    .name("Rotation Z")
    .onChange(value=>{
        const obj = getObj();
        if(obj) obj.rotation.z=THREE.MathUtils.degToRad(value);
    });

    // scale
    folder.add(transformParameters, "scaleX", 0.1, 5, 0.01)
    .name("Scale X")
    .onChange(value=>{
        const obj = getObj();
        if(obj) obj.scale.x=value;
    });

    folder.add(transformParameters, "scaleY", 0.1, 5, 0.01)
    .name("Scale Y")
    .onChange(value=>{
        const obj = getObj();
        if(obj) obj.scale.y=value;
    });

    folder.add(transformParameters, "scaleZ", 0.1, 5, 0.01)
    .name("Scale Z")
    .onChange(value=>{
        const obj = getObj();
        if(obj) obj.scale.z=value;
    });

    folder.open();
}