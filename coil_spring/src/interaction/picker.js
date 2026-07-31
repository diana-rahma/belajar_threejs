import * as THREE from "three";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export function enablePicking(renderer,camera,spring){
    renderer.domElement.addEventListener(
        "pointerdown",
        onPointerDown
    );

    function onPointerDown(event){
        mouse.x=
            (event.offsetX/
            renderer.domElement.clientWidth)
            *2-1;
        mouse.y=
            -(event.offsetY/
            renderer.domElement.clientHeight)
            *2+1;
        
        raycaster.setFromCamera(mouse,camera);

        const intersects=raycaster.intersectObject(
            spring,
            true
        );

        if(intersects.length===0)
        return;

        const point=intersects[0].point;

        console.table({
            X:point.x,
            Y:point.y,
            Z:point.z
        });

        const marker=
            new THREE.Mesh(
            new THREE.SphereGeometry(
            0.03,
            16,
            16
            ),
            new THREE.MeshBasicMaterial({
            color:0xff0000
            })
        );

        marker.position.copy(point);

        spring.add(marker);
    }
}
