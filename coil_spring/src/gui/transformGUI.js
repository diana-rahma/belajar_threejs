import GUI from "lil-gui";
import * as THREE from "three";

export const transformParameters = {
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    scale: 1
};

export function createTransformGUI(target) {
    const gui = new GUI();
    const folder = gui.addFolder("Transform");
    const getObject = typeof target === "function" ? target : () => target;

    folder.add(
        transformParameters,
        "positionX",
        -10,
        10,
        0.01
    )
    .name("Position X")
    .onChange(value => {
        const obj = getObject();
        if (obj) obj.position.x = value;
    });

    folder.add(
        transformParameters,
        "positionY",
        -10,
        10,
        0.01
    )
    .name("Position Y")
    .onChange(value => {
        const obj = getObject();
        if (obj) obj.position.y = value;
    });

    folder.add(
        transformParameters,
        "positionZ",
        -10,
        10,
        0.01
    )
    .name("Position Z")
    .onChange(value => {
        const obj = getObject();
        if (obj) obj.position.z = value;
    });

    folder.add(
        transformParameters,
        "rotationX",
        -180,
        180,
        1
    )
    .name("Rotation X")
    .onChange(value => {
        const obj = getObject();
        if (obj) obj.rotation.x = THREE.MathUtils.degToRad(value);
    });

    folder.add(
        transformParameters,
        "rotationY",
        -180,
        180,
        1
    )
    .name("Rotation Y")
    .onChange(value => {
        const obj = getObject();
        if (obj) obj.rotation.y = THREE.MathUtils.degToRad(value);
    });

    folder.add(
        transformParameters,
        "rotationZ",
        -180,
        180,
        1
    )
    .name("Rotation Z")
    .onChange(value => {
        const obj = getObject();
        if (obj) obj.rotation.z = THREE.MathUtils.degToRad(value);
    });

    folder.add(
        transformParameters,
        "scale",
        0.1,
        5,
        0.01
    )
    .name("Scale")
    .onChange(value => {
        const obj = getObject();
        if (obj) obj.scale.setScalar(value);
    });

    folder.open();
}