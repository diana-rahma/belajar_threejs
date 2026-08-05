import * as THREE from "three";
import scene from "./scene";

const ambient = new THREE.AmbientLight(
    0xffffff,
    0.8
);

scene.add(ambient);

const mainLight = new THREE.DirectionalLight(
    0xffffff,
    2.5
);

mainLight.position.set(5, 8, 5);
mainLight.castShadow = true;

scene.add(mainLight);

const fillLight = new THREE.DirectionalLight(
    0xffffff,
    1.2
);

fillLight.position.set(-5, 3, -5);

scene.add(fillLight);