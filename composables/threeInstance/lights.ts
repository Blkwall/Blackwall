import { AmbientLight, DirectionalLight, RectAreaLight, Vector3 } from "three";

import { ThreeInstance } from "./index";

export class Lights {
  instance: ThreeInstance;
  lights: any[] = [];
  constructor(instance: ThreeInstance) {
    this.instance = instance;

    const ambientLight = new AmbientLight(0xf4fffa, 0.7);
    this.lights.push(ambientLight);

    const directionalLight = new DirectionalLight(0xf4fffa, 0.35);
    directionalLight.position.set(0.65, -0.5, 1);
    this.lights.push(directionalLight);
  }
}
