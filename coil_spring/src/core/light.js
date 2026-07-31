import * as THREE from "three";
import scene from "./scene";

const ambient = new THREE.AmbientLight(
    0xffffff,
    1.2
);

scene.add(ambient);

const directional = new THREE.DirectionalLight(
    0xffffff,
    2
);

directional.position.set(5,8,5);

directional.castShadow = true;

scene.add(directional);