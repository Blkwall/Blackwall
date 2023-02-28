import { PerspectiveCamera, Vector3 } from "three";

import { ThreeInstance, config } from "./index";

export class CameraManager {
  instance: ThreeInstance;
  camera: PerspectiveCamera;
  cameraLookAtPos: Vector3 = new Vector3();
  constructor(instance: ThreeInstance) {
    this.instance = instance;
    this.camera = new PerspectiveCamera(50, 1, 0.1, 1000);
  }
  update() {
    this.camera.updateProjectionMatrix();
  }
}
