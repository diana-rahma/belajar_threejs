import GUI from "lil-gui";

export const defaultDamperParameters = {
    cylinderDiameter: 0.45,
    cylinderLength: 1.40,
    rodDiameter: 0.12,
    rodLength: 1.80,
    rodExtension: 0.50,
    eyeRadius: 0.18,
    eyeThickness: 0.06
};

// Kept for backward compatibility
export const damperParameters = { ...defaultDamperParameters };

export class ObjectGUIManager {
    constructor({ onAddObject, onDeleteObject, onUpdateObject, onTransformChange, onSelectObject }) {
        this.gui = new GUI({ title: "3D Object Inspector" });
        this.onAddObject = onAddObject;
        this.onDeleteObject = onDeleteObject;
        this.onUpdateObject = onUpdateObject;
        this.onTransformChange = onTransformChange;
        this.onSelectObject = onSelectObject;

        this.selectedObject = null;
        this.allObjects = [];

        this.sceneFolder = null;
        this.damperFolder = null;
        this.transformFolder = null;
        this.objectDropdown = null;

        this.initGUI();
    }

    initGUI() {
        this.sceneFolder = this.gui.addFolder("Scene Management");
        
        const actions = {
            addDamper: () => this.onAddObject && this.onAddObject(),
            deleteSelected: () => {
                if (this.selectedObject && this.onDeleteObject) {
                    this.onDeleteObject(this.selectedObject);
                }
            }
        };

        this.sceneFolder.add(actions, "addDamper").name("➕ Add New Damper");
        this.deleteController = this.sceneFolder.add(actions, "deleteSelected").name("🗑️ Delete Selected");
        this.sceneFolder.open();

        this.damperFolder = this.gui.addFolder("Damper Parameters");
        this.transformFolder = this.gui.addFolder("Transform Controls");

        this.damperFolder.open();
        this.transformFolder.open();

        this.rebindGUI(null, []);
    }

    updateObjectDropdown(allObjects) {
        this.allObjects = allObjects;

        if (this.objectDropdown) {
            this.objectDropdown.destroy();
            this.objectDropdown = null;
        }

        if (allObjects.length > 0) {
            const dropdownOptions = { "None (Click Object)": "" };
            allObjects.forEach((obj, i) => {
                const label = `${obj.userData.name || 'Object'} #${i + 1}`;
                dropdownOptions[label] = obj.uuid;
            });

            const dropdownState = {
                activeUuid: this.selectedObject ? this.selectedObject.uuid : ""
            };

            this.objectDropdown = this.sceneFolder
                .add(dropdownState, "activeUuid", dropdownOptions)
                .name("Selected Object")
                .onChange(uuid => {
                    const targetObj = allObjects.find(o => o.uuid === uuid) || null;
                    if (this.onSelectObject) {
                        this.onSelectObject(targetObj);
                    }
                });
        }
    }

    rebindGUI(selectedObject, allObjects = this.allObjects) {
        this.selectedObject = selectedObject;
        this.allObjects = allObjects;

        if (this.deleteController) {
            if (selectedObject) {
                this.deleteController.enable();
            } else {
                this.deleteController.disable();
            }
        }

        this.updateObjectDropdown(allObjects);

        this._clearFolder(this.damperFolder);
        this._clearFolder(this.transformFolder);

        if (!selectedObject) {
            this.damperFolder.title = "Damper Parameters (None Selected)";
            this.transformFolder.title = "Transform Controls (None Selected)";
            return;
        }

        const objName = selectedObject.userData.name || 'Object';
        this.damperFolder.title = `Damper: ${objName}`;
        this.transformFolder.title = `Transform: ${objName}`;

        const params = selectedObject.userData.parameters;
        if (params) {
            const cylFolder = this.damperFolder.addFolder("Cylinder");
            cylFolder.add(params, "cylinderDiameter", 0.20, 0.80, 0.01).name("Diameter").onChange(() => this.triggerUpdate());
            cylFolder.add(params, "cylinderLength", 0.50, 3.00, 0.01).name("Length").onChange(() => this.triggerUpdate());
            cylFolder.open();

            const rodFolder = this.damperFolder.addFolder("Rod");
            rodFolder.add(params, "rodDiameter", 0.05, 0.30, 0.01).name("Diameter").onChange(() => this.triggerUpdate());
            rodFolder.add(params, "rodLength", 0.50, 3.00, 0.01).name("Length").onChange(() => this.triggerUpdate());
            rodFolder.add(params, "rodExtension", 0.10, 1.20, 0.01).name("Extension").onChange(() => this.triggerUpdate());
            rodFolder.open();

            const eyeFolder = this.damperFolder.addFolder("Eye");
            eyeFolder.add(params, "eyeRadius", 0.08, 0.40, 0.01).name("Radius").onChange(() => this.triggerUpdate());
            eyeFolder.add(params, "eyeThickness", 0.02, 0.15, 0.01).name("Thickness").onChange(() => this.triggerUpdate());
            eyeFolder.open();
        }

        const radToDeg = (rad) => (rad * 180) / Math.PI;
        const degToRad = (deg) => (deg * Math.PI) / 180;

        const transformState = {
            posX: selectedObject.position.x,
            posY: selectedObject.position.y,
            posZ: selectedObject.position.z,
            rotX: Math.round(radToDeg(selectedObject.rotation.x)),
            rotY: Math.round(radToDeg(selectedObject.rotation.y)),
            rotZ: Math.round(radToDeg(selectedObject.rotation.z)),
            scaleX: selectedObject.scale.x,
            scaleY: selectedObject.scale.y,
            scaleZ: selectedObject.scale.z,
        };

        const posFolder = this.transformFolder.addFolder("Position");
        posFolder.add(transformState, "posX", -10, 10, 0.01).name("X").onChange(v => { selectedObject.position.x = v; this.triggerTransform(); });
        posFolder.add(transformState, "posY", -10, 10, 0.01).name("Y").onChange(v => { selectedObject.position.y = v; this.triggerTransform(); });
        posFolder.add(transformState, "posZ", -10, 10, 0.01).name("Z").onChange(v => { selectedObject.position.z = v; this.triggerTransform(); });
        posFolder.open();

        const rotFolder = this.transformFolder.addFolder("Rotation");
        rotFolder.add(transformState, "rotX", -180, 180, 1).name("X (deg)").onChange(v => { selectedObject.rotation.x = degToRad(v); this.triggerTransform(); });
        rotFolder.add(transformState, "rotY", -180, 180, 1).name("Y (deg)").onChange(v => { selectedObject.rotation.y = degToRad(v); this.triggerTransform(); });
        rotFolder.add(transformState, "rotZ", -180, 180, 1).name("Z (deg)").onChange(v => { selectedObject.rotation.z = degToRad(v); this.triggerTransform(); });
        rotFolder.open();

        const scaleFolder = this.transformFolder.addFolder("Scale");
        scaleFolder.add(transformState, "scaleX", 0.1, 5, 0.01).name("X").onChange(v => { selectedObject.scale.x = v; this.triggerTransform(); });
        scaleFolder.add(transformState, "scaleY", 0.1, 5, 0.01).name("Y").onChange(v => { selectedObject.scale.y = v; this.triggerTransform(); });
        scaleFolder.add(transformState, "scaleZ", 0.1, 5, 0.01).name("Z").onChange(v => { selectedObject.scale.z = v; this.triggerTransform(); });
        scaleFolder.open();
    }

    triggerUpdate() {
        if (this.selectedObject && this.onUpdateObject) {
            this.onUpdateObject(this.selectedObject);
        }
    }

    triggerTransform() {
        if (this.selectedObject && this.onTransformChange) {
            this.onTransformChange(this.selectedObject);
        }
    }

    _clearFolder(folder) {
        if (!folder) return;
        while (folder.controllers.length > 0) {
            folder.controllers[0].destroy();
        }
        while (folder.folders.length > 0) {
            folder.folders[0].destroy();
        }
    }
}

// Legacy helper for single GUI
export function createDamperGUI(onChange) {
    const gui = new GUI();
    return gui;
}