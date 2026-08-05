import * as THREE from "three";
import "./style.css";

import scene from "./core/scene";
import camera from "./core/camera";
import renderer from "./core/renderer";
import controls from "./core/control";

import "./core/light";

import grid from "./helpers/grid";
import axes from "./helpers/axes";

import { createDamper } from "./objects/damper";
import { ObjectGUIManager, defaultDamperParameters } from "./gui/damperGUI";
import { SelectionManager } from "./helpers/selectionManager";

// Tambahkan helper ke scene
scene.add(grid);
scene.add(axes);

// Selection Manager
const selectionManager = new SelectionManager(scene, camera, renderer);

const objects = [];
let damperCounter = 0;

function createNewDamper(customParams = {}, name = null, position = new THREE.Vector3(0, 0, 0)) {
    damperCounter++;
    const objName = name || `Damper ${damperCounter}`;

    const params = {
        ...defaultDamperParameters,
        ...customParams,
        name: objName
    };

    const mesh = createDamper(params);
    mesh.position.copy(position);

    scene.add(mesh);
    objects.push(mesh);
    selectionManager.registerObject(mesh);

    selectionManager.selectObject(mesh);
    return mesh;
}

function updateDamperMesh(targetMesh) {
    if (!targetMesh) return;

    const idx = objects.indexOf(targetMesh);
    if (idx === -1) return;

    // Save transform and metadata
    const pos = targetMesh.position.clone();
    const rot = targetMesh.rotation.clone();
    const scale = targetMesh.scale.clone();
    const userData = { ...targetMesh.userData };

    // Remove old mesh
    scene.remove(targetMesh);
    selectionManager.unregisterObject(targetMesh);

    // Create new mesh with updated parameters
    const newMesh = createDamper(userData.parameters);
    newMesh.position.copy(pos);
    newMesh.rotation.copy(rot);
    newMesh.scale.copy(scale);
    newMesh.userData = userData;

    scene.add(newMesh);
    objects[idx] = newMesh;
    selectionManager.registerObject(newMesh);

    // Keep selection on updated mesh
    selectionManager.selectObject(newMesh);
}

function deleteDamperMesh(targetMesh) {
    if (!targetMesh) return;

    const idx = objects.indexOf(targetMesh);
    if (idx !== -1) {
        objects.splice(idx, 1);
    }

    scene.remove(targetMesh);
    selectionManager.unregisterObject(targetMesh);
    selectionManager.selectObject(null);
}

// GUI Manager
const guiManager = new ObjectGUIManager({
    onAddObject: () => {
        const offset = (objects.length % 5) * 1.5 - 3;
        createNewDamper({}, null, new THREE.Vector3(offset, 0, 0));
    },
    onDeleteObject: (targetMesh) => {
        deleteDamperMesh(targetMesh);
    },
    onUpdateObject: (targetMesh) => {
        updateDamperMesh(targetMesh);
    },
    onTransformChange: () => {
        selectionManager.updateSelectionBox();
    },
    onSelectObject: (targetMesh) => {
        selectionManager.selectObject(targetMesh);
    }
});

selectionManager.onSelectionChange((selectedObj) => {
    guiManager.rebindGUI(selectedObj, objects);
});

// Create initial 2 dampers in the scene
const damper1 = createNewDamper({}, "Damper 1", new THREE.Vector3(-1.5, 0, 0));
const damper2 = createNewDamper({}, "Damper 2", new THREE.Vector3(1.5, 0, 0));

// Select Damper 1 by default
selectionManager.selectObject(damper1);

// Atur posisi kamera
camera.position.set(4, 3, 5);
controls.target.set(0, 0, 0);
controls.update();

// Window Resize Handler
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animation Loop (Render Loop)
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    selectionManager.updateSelectionBox();
    renderer.render(scene, camera);
}

animate();