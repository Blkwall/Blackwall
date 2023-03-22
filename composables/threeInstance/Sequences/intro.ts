import { Animation } from "../animation";
import * as TWEEN from "@tweenjs/tween.js";

let introProgress = 0;
export const sequence_intro = new Animation({
  keyframes: [
    {
      onUpdate: (_progress, instance) => {
        const { introObject, animation } = instance.sceneObjectManager;
        const { camera } = instance.cameraManager;

        if (introObject) {
          introObject.object.position.lerpVectors(
            animation.startPos,
            animation.endPos,
            introProgress
          );
        }
        camera.position.lerpVectors(
          animation.startCamPos,
          animation.endCamPos,
          introProgress
        );
      },
    },
  ],
  onInit: (instance) => {
    // document.body.style.overflow = "hidden";
    instance.sceneObjectManager.update(0);
    new TWEEN.Tween({ progress: 0 })
      .to({ progress: 1 }, 3000)
      .onUpdate((obj) => {
        introProgress = obj.progress;
      })
      .easing(TWEEN.Easing.Quadratic.InOut)
      .delay(500)
      .onComplete(() => {
        document.body.style.height =
          // instance.sceneObjectManager.totalObjects * 100 + "vh";
          instance.activeSequenceKey = "main";
        // document.body.style.overflow = "auto";
      })
      .start();
  },
  onEnd: (instance) => {},
});
