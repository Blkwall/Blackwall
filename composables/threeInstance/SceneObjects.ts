import { Texture, Vector2, Vector3, VideoTexture } from "three";
import * as TWEEN from "@tweenjs/tween.js";

import { ThreeInstance } from "./index";
import { SceneObject } from "./SceneObject";
import { HelixCurve } from "./spiral";

export class SceneObjectManager {
  threeInstance: ThreeInstance;
  objects: SceneObject[] = [];
  objectSize = 1;
  gap = 0.025;
  padding = 0.25;
  loop: boolean = true;
  lookAtCamera: boolean = false;

  introObject: SceneObject | null = null;
  animation: {
    duration: number;
    delay: number;
    distance: number;
    startPos: Vector3;
    endPos: Vector3;
    startCamPos: Vector3;
    endCamPos: Vector3;
  } = {
    duration: 7,
    delay: 1,
    distance: 0.5,
    startPos: new Vector3(0, 0, 0),
    endPos: new Vector3(0, 0, 0),
    startCamPos: new Vector3(0, 0, 0),
    endCamPos: new Vector3(0, 0, 0),
  };

  constructor(threeInstance: ThreeInstance, loop?: boolean) {
    this.threeInstance = threeInstance;
    this.loop = loop || this.loop;

    // Make texture array out of assets.
    const textures = Object.values(threeInstance.assets.textures);
    // reverse textures
    textures.reverse();

    this.drawObjects(textures);
  }

  get totalObjects() {
    return Object.keys(this.objects).length;
  }

  get totalHeight() {
    // Get total height of all objects.
    let totalHeight = 0;
    Object.keys(this.objects).forEach((key: any) => {
      totalHeight += this.objects[key].getHeight;
      // add padding
      totalHeight += this.padding;
    });
    // erase height of first clone to make sure first and last object are centered to spiral
    totalHeight -= this.objects[this.objects.length - 1].getHeight;
    totalHeight -= this.padding;
    // add padding
    return totalHeight;
  }

  resetModels() {
    // Reset models.
    Object.keys(this.objects).forEach((key: any) => {
      this.threeInstance.scene.remove(this.objects[key].object);
    });
    this.objects = [];
  }

  drawObjects(textures: (Texture | VideoTexture)[]) {
    this.resetModels();

    // Add new objects.
    textures.forEach((texture: Texture | VideoTexture, index: number) => {
      const layers = 5;
      const ratio = SceneObject.isVideoTexture(texture)
        ? 9 / 16
        : texture.image.height / texture.image.width;

      const sceneObject = new SceneObject({
        texture,
        sceneManager: this,
        ratio,
        layers,
        index,
      });
      this.objects.push(sceneObject);
    });

    // // Set loop.
    if (this.loop) {
      const last = this.objects[this.objects.length - 1];
      const clone = new SceneObject({
        texture: last.texture,
        sceneManager: this,
        ratio: last.ratio,
        layers: last.layers,
        index: -1,
      });
      this.objects.push(clone);
    }
  }

  placeObjects(helixCurve: HelixCurve) {
    this.threeInstance.spiral.updateCurve();

    // Make array of objects.
    const objects = Object.values(this.objects);
    objects.sort((a, b) => a.index - b.index);

    const firstObjectHeight = objects[0].getHeight;
    let lastHeight = firstObjectHeight * -0.5;
    objects.forEach((sceneObject: SceneObject, index: number) => {
      const { object, getHeight } = sceneObject;

      const alpha = (lastHeight + getHeight / 2) / this.totalHeight;
      lastHeight += getHeight + this.padding;
      sceneObject.alpha = alpha;

      const point = helixCurve.getPointAt(Math.min(1, alpha));

      const center = new Vector3(0, point.y, 0);
      const direction = point.clone().sub(center).normalize();
      sceneObject.direction = point.clone().add(direction);
      object.position.copy(point);
      sceneObject.pos = point;

      this.threeInstance.scene.add(object);

      // Setup. intro animation.
      if (index === objects.length - 1) {
        this.animation.startPos = point
          .clone()
          .add(new Vector3(0, this.animation.distance, 0));
        this.animation.endPos = point.clone();
        this.introObject = sceneObject;

        this.threeInstance.cameraManager.progressToCamPos(1);
        this.animation.endCamPos =
          this.threeInstance.cameraManager.camera.position.clone();

        this.animation.startCamPos = this.animation.startPos
          .clone()
          .add(direction.clone().multiplyScalar(0.25));
      }
    });

    document.body.style.height = this.totalObjects * 150 + "vh";
  }

  initIntroAnimation() {
    const { camera } = this.threeInstance.cameraManager;
    if (!this.introObject) return;
    this.introObject.object.position.copy(this.animation.startPos);

    // Move camera.
    camera.position.copy(this.animation.startCamPos);
    camera.lookAt(this.animation.startPos);
  }

  playIntroAnimation() {
    const { camera } = this.threeInstance.cameraManager;
    if (!this.introObject) return;

    return new Promise((resolve) => {
      const time = { t: 0 };
      new TWEEN.Tween(time)
        .to({ t: 1 }, this.animation.duration * 1000)
        .easing(TWEEN.Easing.Cubic.InOut)
        .delay(this.animation.delay * 1000)
        .onUpdate(() => {
          this.introObject?.object.position.lerpVectors(
            this.animation.startPos,
            this.animation.endPos,
            time.t
          );
        })
        .onComplete(resolve)
        .start();

      new TWEEN.Tween(time)
        .to({ t: 1 }, this.animation.duration * 1.1 * 1000)
        .easing(TWEEN.Easing.Cubic.InOut)
        .delay(this.animation.delay * 1000)
        .onUpdate(() => {
          camera.position.lerpVectors(
            this.animation.startCamPos,
            this.animation.endCamPos,
            time.t
          );
        })
        .start();
    });
  }

  update() {
    this.objects.forEach((object: SceneObject) => {
      const {
        progress,
        inputManager: { mousePosition },
        isIntro,
        cameraManager: { camera },
      } = this.threeInstance;

      if (isIntro) {
        if (object !== this.introObject) object.update(progress, mousePosition);
        else {
          object.object.lookAt(camera.position);
        }
      } else {
        object.update(progress, mousePosition);
      }
    });
  }
}