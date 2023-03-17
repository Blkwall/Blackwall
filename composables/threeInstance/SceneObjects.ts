import { Texture, Vector3, VideoTexture } from "three";

import { ThreeInstance } from "./index";
import { SceneObject } from "./SceneObject";
import { HelixCurve } from "./spiral";

export class SceneObjectManager {
  threeInstance: ThreeInstance;
  objects: { [key: string]: SceneObject } = {};
  objectSize = 1;
  gap = 0.025;
  padding = 0.01;
  loop: boolean = true;
  lookAtCamera: boolean = false;

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
    totalHeight -= this.objects[Object.keys(this.objects)[0]].getHeight;
    totalHeight -= this.padding;
    // add padding
    return totalHeight;
  }

  resetModels() {
    // Reset models.
    Object.keys(this.objects).forEach((key: any) => {
      this.threeInstance.scene.remove(this.objects[key].object);
    });
    this.objects = {};
  }

  drawObjects(textures: (Texture | VideoTexture)[]) {
    this.resetModels();

    // Add new objects.
    textures.forEach((texture: Texture | VideoTexture, index: number) => {
      const layers = Math.ceil(Math.random() * 4) + 1;
      const ratio = SceneObject.isVideoTexture(texture)
        ? 9 / 16
        : texture.image.height / texture.image.width;

      this.objects[texture.id] = new SceneObject(
        texture,
        this.objectSize,
        ratio,
        layers,
        this.gap,
        index
      );
    });

    // Set loop.
    if (this.loop) {
      const first = this.objects[Object.keys(this.objects)[0]];
      const clone = new SceneObject(
        first.texture,
        first.size,
        first.ratio,
        first.layers,
        first.gap,
        -1
      );
      this.objects["clone"] = clone;
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
      // add padding
      // sceneObject.alpha = alpha;

      const point = helixCurve.getPointAt(Math.min(1, alpha));

      const center = new Vector3(0, point.y, 0);
      const direction = point.clone().sub(center).normalize();
      sceneObject.direction = point.clone().add(direction);
      object.position.copy(point);

      this.threeInstance.scene.add(object);
    });

    document.body.style.height = this.totalObjects * 150 + "vh";
  }

  update() {
    Object.keys(this.objects).forEach((key: any) => {
      const {
        progress,
        inputManager: { mousePosition },
      } = this.threeInstance;

      this.objects[key].update(progress, mousePosition);
    });
  }
}
