import { CameraHelper, PerspectiveCamera, Vector3 } from "three";

import { ThreeInstance } from "./index";

export class CameraManager {
  instance: ThreeInstance;
  camera: PerspectiveCamera;
  helper: CameraHelper;
  debugCamera: PerspectiveCamera;
  config: {
    distance: number;
  } = {
    distance: 30,
  };

  constructor(instance: ThreeInstance) {
    this.instance = instance;
    this.camera = new PerspectiveCamera(50, 1, 0.1, 1000);
    this.debugCamera = new PerspectiveCamera(50, 1, 0.1, 1000);
    this.debugCamera.position.set(0, 0, 200);

    this.helper = new CameraHelper(this.camera);
    this.instance.scene.add(this.helper);
  }

  update(progress: number) {
    const spiral = this.instance.spiral;
    const currentPoint = spiral.helixCurve.getPointAt(progress);
    const direction = spiral.helixCurve.getTangentAt(progress);
    // const direction = currentPoint.clone().normalize();

    const cameraPos = currentPoint
      .clone()
      .add(direction.multiplyScalar(this.config.distance))
      .add(new Vector3(0, -1, 0));
    // const cameraPos = new Vector3(0, currentPoint.y, 0);
    this.camera.position.copy(cameraPos);
    const lookAtPos = new Vector3(0, cameraPos.y, 0);
    this.camera.lookAt(lookAtPos);

    this.camera.updateProjectionMatrix();
  }
}
