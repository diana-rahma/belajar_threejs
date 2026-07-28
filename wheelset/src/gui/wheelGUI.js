import GUI from "lil-gui";

export const wheelParameters = {
    diameter: 0.92,
    axleLength: 2.40,
    semiBase: 1.20,
    hubRadius:0.10,
    holeRadius:0.045,
    posX:0,
    posY:0,
    posZ:0
};

export function createWheelGUI(onUpdate) {

    const gui = new GUI({
        title: "Wheel Generator"
    });

   gui.add(
        wheelParameters,
        "diameter",
        0.7,
        1.2,
        0.01
    ).onChange(onUpdate);

    gui.add(
        wheelParameters,
        "semiBase",
        0.8,
        2.0,
        0.01
    ).onChange(onUpdate);

    gui.add(
        wheelParameters,
        "axleLength",
        1.5,
        3.5,
        0.01
    ).onChange(onUpdate);

    gui.add(wheelParameters,"posX",
    -10,
    10,
    0.01
    ).name("Position X").onChange(onUpdate);

    gui.add(wheelParameters,"posY",
    -10,
    10,
    0.01
    ).name("Position Y").onChange(onUpdate);

    gui.add(wheelParameters,"posZ",
    -10,
    10,
    0.01
    ).name("Position Z").onChange(onUpdate);

    return gui;
}