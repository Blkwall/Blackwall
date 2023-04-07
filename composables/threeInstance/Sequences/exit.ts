import { Animation } from "../animation";
import * as TWEEN from "@tweenjs/tween.js";

export const sequence_exit = new Animation({
  loop: false,
  keyframes: [
    {
      onUpdate: (_progress, instance) => {
        const { progress } = instance.inputManager;
        instance.sceneObjectManager.update(1 - progress);
        instance.cameraManager.update(1 - progress);
        instance.inputManager.updateTouchMove();
      },
    },
  ],
  onInit: (instance) => {
    // const { camera } = instance.cameraManager;
    // const camProgress =
    //   camera.position.y / instance.sceneObjectManager.totalHeight;
    // instance.inputManager.progressToCurrent(1 - camProgress);
  },
});
