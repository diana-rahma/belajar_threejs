import GUI from 'lil-gui';

export const springParameters={
    wireDiameter:0.05,
    outerDiameter:1,
    freeLength:2.5,
    activeCoils:8,
    endCoils:2,
    hand:"right",
    endType:"open",
    wireframe:false
}

export function createSpringGUI(regenerate){
    const gui=new GUI();

    gui.title("Coil Spring Generator");

    gui.add(
        springParameters,
        "outerDiameter",
        0.3,
        3,
        0.01
    )
    .name("Outer Diameter")
    .onChange(regenerate);

    gui.add(
        springParameters,
        "wireDiameter",
        0.01,
        0.20,
        0.005
    ).name("Wire Diameter")
    .onChange(regenerate);

    gui.add(
        springParameters,
        "activeCoils",
        2,
        20,
        1
    )
    .name("Active Coils")
    .onChange(regenerate);

    gui.add(
        springParameters,
        "freeLength",
        0.5,
        8,
        0.1
    )
    .name("Free Length")
    .onChange(regenerate);

        gui.add(
        springParameters,
        "endCoils",
        0,
        4,
        1
    )
    .name("End Coils")
    .onChange(regenerate);

    gui.add(
        springParameters,
        "hand",
        ["right","left"]
    )
    .name("Hand")
    .onChange(regenerate);

    gui.add(
        springParameters,
        "endType",
        ["open","closed"]
    )
    .name("End Type")
    .onChange(regenerate);


    gui.add(
        springParameters,
        "wireframe"
    )
    .name("Wireframe")
    .onChange(regenerate);




}