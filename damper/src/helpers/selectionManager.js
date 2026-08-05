import * as THREE from 'three';

export class SelectionManager {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        this.selectableObjects = [];
        this.selectedObject = null;
        this.onSelectionChangeCallbacks = [];

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // Visual selection indicator
        this.boxHelper = new THREE.BoxHelper(new THREE.Object3D(), 0x00e5ff);
        this.boxHelper.visible = false;
        this.scene.add(this.boxHelper);

        this.pointerDownPos = { x: 0, y: 0 };
        this._initEvents();
    }

    _initEvents() {
        const dom = this.renderer.domElement;

        dom.addEventListener('pointerdown', (e) => {
            this.pointerDownPos = { x: e.clientX, y: e.clientY };
        });

        dom.addEventListener('pointerup', (e) => {
            const dist = Math.hypot(e.clientX - this.pointerDownPos.x, e.clientY - this.pointerDownPos.y);
            // Ignore click if mouse was dragged (orbiting camera)
            if (dist > 5) return;

            const rect = dom.getBoundingClientRect();
            this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            this._performRaycast();
        });
    }

    _performRaycast() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.selectableObjects, true);

        if (intersects.length > 0) {
            // Find root selectable object
            let hit = intersects[0].object;
            while (hit.parent && !this.selectableObjects.includes(hit)) {
                hit = hit.parent;
            }
            if (this.selectableObjects.includes(hit)) {
                this.selectObject(hit);
                return;
            }
        }
    }

    registerObject(object) {
        if (!this.selectableObjects.includes(object)) {
            this.selectableObjects.push(object);
        }
    }

    unregisterObject(object) {
        const idx = this.selectableObjects.indexOf(object);
        if (idx !== -1) {
            this.selectableObjects.splice(idx, 1);
        }
        if (this.selectedObject === object) {
            this.selectObject(null);
        }
    }

    selectObject(object) {
        this.selectedObject = object;
        if (object) {
            this.boxHelper.setFromObject(object);
            this.boxHelper.visible = true;
        } else {
            this.boxHelper.visible = false;
        }

        this.onSelectionChangeCallbacks.forEach(cb => cb(this.selectedObject));
    }

    updateSelectionBox() {
        if (this.selectedObject && this.boxHelper.visible) {
            this.boxHelper.update();
        }
    }

    onSelectionChange(callback) {
        this.onSelectionChangeCallbacks.push(callback);
    }
}
