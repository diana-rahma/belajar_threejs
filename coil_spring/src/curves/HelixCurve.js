import * as THREE from "three";

export class HelixCurve extends THREE.Curve{
    constructor(
        radius,
        pitch,
        turns,
        hand="right"
    ){
    super();
        this.radius = radius;
        this.pitch = pitch;
        this.turns = turns;
        this.hand = hand;
    }

    getPoint(t){
        const direction=this.hand==="right"?1:-1;
        const angle=direction*2*Math.PI*this.turns*t;
        const x = this.radius*Math.cos(angle);
        const z = this.radius*Math.sin(angle);
        const y = this.pitch * this.turns * t;
        return new THREE.Vector3(
            x,
            y,
            z
        );
    }
}