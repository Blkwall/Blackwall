import { Animation } from "../animation";

export const sequence_main = new Animation({
  loop: true,
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
    instance.inputManager.current = 0;
  },
});
