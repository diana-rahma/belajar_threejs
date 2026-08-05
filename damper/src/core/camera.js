import * as THREE from "three";

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,0.1,100);
    camera.position.set(3, 2, 4);

export default camera;