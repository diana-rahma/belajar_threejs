import * as THREE from "three";

const renderer = new THREE.WebGLRenderer({antialias:true});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

export default renderer;