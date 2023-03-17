import {
  AdditiveBlending,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  NormalBlending,
  PlaneGeometry,
  Texture,
  Vector3,
  VideoTexture,
} from "three";

import { ThreeInstance } from "./index";
import { SceneObject } from "./SceneObject";
import { HelixCurve } from "./spiral";
import { InputManager } from "./input";

export class SceneObjectManager {
  threeInstance: ThreeInstance;
  objects: { [key: string]: SceneObject } = {};
  objectSize = 1;
  gap = 0.025;
  loop: boolean = true;
  lookAtCamera: boolean = false;

  constructor(threeInstance: ThreeInstance, loop?: boolean) {
    this.threeInstance = threeInstance;
    this.loop = loop || this.loop;

    // Make texture array out of assets.
    const textures = Object.values(threeInstance.assets.textures);

    this.drawObjects(textures);
  }

  get totalObjects() {
    return Object.keys(this.objects).length;
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
    textures.forEach((texture: Texture | VideoTexture) => {
      const layers = Math.ceil(Math.random() * 4) + 1;
      const ratio = SceneObject.isVideoTexture(texture)
        ? 9 / 16
        : texture.image.height / texture.image.width;

      this.objects[texture.id] = new SceneObject(
        texture,
        this.objectSize,
        ratio,
        layers,
        this.gap
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
        first.gap
      );
      this.objects["clone"] = clone;
    }
  }

  placeObjects(helixCurve: HelixCurve) {
    Object.keys(this.objects).forEach((key: any, index: number) => {
      const { object } = this.objects[key];
      const alpha = index / (this.totalObjects - 1);
      // const mappedAlpha = map(alpha, 0, 1, 0.05, 0.95);
      const mappedAlpha = map(alpha, 0, 1, 0, 1);
      this.objects[key].alpha = mappedAlpha;
      const point = helixCurve.getPointAt(mappedAlpha);

      const center = new Vector3(0, point.y, 0);
      const direction = point.clone().sub(center).normalize();
      this.objects[key].direction = point.clone().add(direction);
      object.position.copy(point);

      this.threeInstance.scene.add(object);
    });

    document.body.style.height = this.totalObjects * 100 + "vh";
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
