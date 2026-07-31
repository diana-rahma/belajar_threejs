import * as THREE from "three";

let pointA = null;
let pointB = null;

let markerA = null;
let markerB = null;

let line = null;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export function enableDistanceTool(renderer, camera, scene, spring) {

    renderer.domElement.addEventListener(
        "pointerdown",
        onPointerDown
    );

    function onPointerDown(event) {

        mouse.x =
            (event.offsetX / renderer.domElement.clientWidth) * 2 - 1;

        mouse.y =
            -(event.offsetY / renderer.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObject(
            spring,
            true
        );

        if (intersects.length === 0) return;

        const point = intersects[0].point.clone();

        // Klik pertama
        if (pointA === null) {

            // Bersihkan measurement sebelumnya
            if (markerA) scene.remove(markerA);
            if (markerB) scene.remove(markerB);
            if (line) scene.remove(line);

            markerA = null;
            markerB = null;
            line = null;

            pointA = point;

            markerA = createMarker(pointA);
            scene.add(markerA);

        }

        // Klik kedua
        else {

            pointB = point;

            markerB = createMarker(pointB);
            scene.add(markerB);

            const distance = pointA.distanceTo(pointB);

            console.log(
                "Distance :",
                distance.toFixed(3)
            );

            const geometry = new THREE.BufferGeometry()
                .setFromPoints([
                    pointA,
                    pointB
                ]);

            const material = new THREE.LineBasicMaterial({
                color: 0x00ff00
            });

            line = new THREE.Line(
                geometry,
                material
            );

            scene.add(line);

            // Reset agar bisa mengukur lagi
            pointA = null;
            pointB = null;
        }

    }

}

// Di luar enableDistanceTool
function createMarker(point) {

    const marker = new THREE.Mesh(

        new THREE.SphereGeometry(
            0.03,
            16,
            16
        ),

        new THREE.MeshBasicMaterial({
            color: 0xff0000
        })

    );

    marker.position.copy(point);

    return marker;

}