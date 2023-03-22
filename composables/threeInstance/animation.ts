import { ThreeInstance } from "./index";

type AnimationKeyFrame = {
  onUpdate: (progress: number, instance: ThreeInstance) => void;
};

type AnimationProps = {
  keyframes: AnimationKeyFrame[];
  loop?: boolean;
  onInit?: (instance: ThreeInstance) => void;
  onEnd?: (instance: ThreeInstance) => void;
};

export class Animation {
  loop: boolean;
  progress: number = 0;
  keyframes: AnimationKeyFrame[];
  ended: boolean = false;
  onEnd?: (instance: ThreeInstance) => void;
  onInit?: (instance: ThreeInstance) => void;
  initFired: boolean = false;
  constructor({ keyframes, loop = false, onInit, onEnd }: AnimationProps) {
    this.loop = loop;
    this.keyframes = keyframes;
    this.onEnd = onEnd;
    this.onInit = onInit;
  }

  update(progress: number, instance: ThreeInstance) {
    if (!this.initFired) {
      if (this.onInit) this.onInit(instance);
      this.initFired = true;
    }
    if (this.ended) return;

    this.progress = progress;
    this.keyframes.forEach((keyframe) => {
      keyframe.onUpdate(progress, instance);
    });

    if (progress >= 1) {
      if (this.loop) {
        this.progress = 0;
        if (this.onEnd) this.onEnd(instance);
      } else {
        this.progress = 1;
        this.ended = true;
        if (this.onEnd) this.onEnd(instance);
      }
    }
  }
}
