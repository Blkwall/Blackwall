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
    distance: 0.9,
  };

  constructor(instance: ThreeInstance) {
    this.instance = instance;
    this.camera = new PerspectiveCamera(50, 1, 0.1, 1000);
    this.debugCamera = new PerspectiveCamera(50, 1, 0.1, 1000);
    this.debugCamera.position.set(0, 0, 20);

    this.helper = new CameraHelper(this.camera);
    this.instance.scene.add(this.helper);
  }

  progressToCamPos(progress: number) {
    const spiral = this.instance.spiral;
    const currentPoint = spiral.helixCurve.getPointAt(progress);

    const center = new Vector3(0, currentPoint.y, 0);
    const direction = currentPoint.clone().sub(center).normalize();
    const cameraPos = currentPoint
      .clone()
      .add(direction.multiplyScalar(this.config.distance));

    return cameraPos;
  }

  update(progress: number) {
    const cameraPos = this.progressToCamPos(progress);
    const pointHeight = this.instance.spiral.helixCurve.getPointAt(progress).y;
    this.camera.position.copy(cameraPos);
    this.camera.lookAt(new Vector3(0, pointHeight, 0));
    this.debugCamera.position.y = pointHeight;

    this.camera.updateProjectionMatrix();
  }
}
