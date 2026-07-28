// ===============================
// IMPORT
// ===============================

import "./style.css";

import scene from "./core/scene";
import camera from "./core/camera";
import renderer from "./core/renderer";
import controls from "./core/controls";
import "./core/light";

import grid from "./helpers/grid";
import axes from "./helpers/axes";

import { createWheelset } from "./objects/wheelset";
import { createWheelGUI, wheelParameters } from "./gui/wheelGUI";

// ===============================
// HELPER
// ===============================

scene.add(grid);
scene.add(axes);

// ===============================
// OBJECT
// ===============================

let activeWheelset = null;

// ===============================
// ANIMATION
// ===============================

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function regenerateWheelset() {
    if (activeWheelset) {
        scene.remove(activeWheelset);
    }

    activeWheelset = createWheelset(wheelParameters);
    scene.add(activeWheelset);

    activeWheelset.position.set(
        wheelParameters.posX,
        wheelParameters.posY,
        wheelParameters.posZ
    );
}

createWheelGUI(regenerateWheelset);
regenerateWheelset();



animate();

// ===============================
// RESIZE
// ===============================

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

