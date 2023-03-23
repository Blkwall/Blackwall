import { Animation } from "../animation";
import * as TWEEN from "@tweenjs/tween.js";
import { Box3, Vector3 } from "three";

let introProgress = 0;
const animation = {
  object: {
    instance: null,
    start: null,
    end: null,
    progress: 0,
  },
  camera: {
    instance: null,
    start: null,
    end: null,
    progress: 0,
  },
} as any;

export const sequence_intro = new Animation({
  keyframes: [
    {
      onUpdate: (_progress, instance) => {
        const { object, camera } = animation;

        if (!object.instance) return;
        if (!camera.instance) return;
        object.instance.position.lerpVectors(
          object.start,
          object.end,
          object.progress
        );

        camera.instance.position.lerpVectors(
          camera.start,
          camera.end,
          camera.progress
        );
        const center = new Vector3(0, camera.instance.position.y, 0);
        camera.instance.lookAt(center);
      },
    },
  ],
  onInit: (instance) => {
    const { camera } = instance.cameraManager;
    const {
      sceneObjectManager: { objects, totalObjects },
    } = instance;
    instance.sceneObjectManager.update(0);
    instance.cameraManager.update(1);

    // Set object.
    const lastObject = objects[totalObjects - 1];
    const direction = lastObject.direction.clone();
    direction.y = 0;
    const objectStartPos = lastObject.object.position
      .clone()
      .add(direction.multiplyScalar(3))
      .add(new Vector3(0, 3, 0));
    animation.object.instance = lastObject.object;
    animation.object.start = objectStartPos;
    animation.object.end = lastObject.pos;

    // Set camera.
    const startCamPos = objectStartPos
      .clone()
      .add(direction.multiplyScalar(0.1));
    animation.camera.instance = camera;
    animation.camera.start = startCamPos;

    // Get midpoint between last and second last object.
    const box1 = new Box3();
    box1.setFromObject(objects[totalObjects - 2].object);

    const box2 = new Box3();
    box2.setFromObject(lastObject.object);

    const box1Top = box1.max.y;
    const box2Bottom = box2.min.y;
    const midPoint = (box1Top + box2Bottom) / 2;

    const y = midPoint / instance.sceneObjectManager.totalHeight;
    animation.camera.end = instance.cameraManager.progressToCamPos(y);

    // Start Object animation.
    new TWEEN.Tween({ progress: 0 })
      .to({ progress: 1 }, 4000)
      .onUpdate((obj) => {
        animation.object.progress = obj.progress;
      })
      .easing(TWEEN.Easing.Quadratic.InOut)
      .delay(500)
      .start();

    // Start Cam animation.
    new TWEEN.Tween({ progress: 0 })
      .to({ progress: 1 }, 4000)
      .onUpdate((obj) => {
        animation.camera.progress = obj.progress;
      })
      .easing(TWEEN.Easing.Quadratic.InOut)
      .delay(500)
      .onComplete(() => {
        document.body.style.height = instance.activeSequenceKey = "main";
      })
      .start();
  },
});
