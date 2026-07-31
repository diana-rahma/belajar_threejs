import "./style.css";

import scene from "./core/scene";
import camera from "./core/camera";
import renderer from "./core/renderer";
import controls from "./core/control";

import "./core/light";

import grid from "./helpers/grid";
import axes from "./helpers/axes";

import * as THREE from "three";
import { HelixCurve } from "./curves/HelixCurve";
import { createSpring } from "./objects/spring";
import { createSpringGUI, springParameters } from "./gui/springGUI";
import { measureSpring } from "./measurement/springMeasurement";
import { enablePicking } from "./interaction/picker";
import { enableDistanceTool } from "./measurement/distanceTool";
import { createTransformGUI, transformParameters } from "./gui/transformGUI";

scene.add(grid);
scene.add(axes);

let spring;

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(
        scene,
        camera
    );

}

function regenerateSpring(){
    if(spring){
        scene.remove(spring);
    }
    spring = createSpring(springParameters);

    spring.position.set(
        transformParameters.positionX,
        transformParameters.positionY,
        transformParameters.positionZ
    );

    spring.rotation.set(
        THREE.MathUtils.degToRad(transformParameters.rotationX),
        THREE.MathUtils.degToRad(transformParameters.rotationY),
        THREE.MathUtils.degToRad(transformParameters.rotationZ)
    );

    spring.scale.setScalar(transformParameters.scale);

    scene.add(spring);
    enableDistanceTool(
        renderer,
        camera,
        scene,
        spring
    );
    
}

regenerateSpring();
createTransformGUI(() => spring);
createSpringGUI(regenerateSpring);

animate();

window.addEventListener("resize",()=>{
    camera.aspect =
    window.innerWidth /
    window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});