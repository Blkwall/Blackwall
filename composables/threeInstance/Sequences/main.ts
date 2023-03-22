import { Animation } from "../animation";
import * as TWEEN from "@tweenjs/tween.js";

let lerpAlpha = 0;
export const sequence_main = new Animation({
  loop: true,
  keyframes: [
    {
      onUpdate: (progress, instance) => {
        instance.sceneObjectManager.update(1 - progress * lerpAlpha);
        instance.cameraManager.update(1 - progress * lerpAlpha);
        instance.inputManager.onScroll(progress);
      },
    },
  ],
  onInit: (instance) => {
    window.scrollTo(0, 0);
    new TWEEN.Tween({ alpha: 0 })
      .to({ alpha: 1 }, 200)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate((obj) => {
        lerpAlpha = obj.alpha;
      })
      .start();
  },
});
