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
} from "three";

import { ThreeInstance } from "./index";
import { HelixCurve } from "./spiral";

type ImageModel = {
  group: Group;
  direction?: Vector3;
};

export class ImageManager {
  threeInstance: ThreeInstance;
  models: { [key: string]: ImageModel } = {};
  imageSize = 10;
  imageGap = 0.5;
  loop: boolean = true;
  lookAtCamera: boolean = false;

  constructor(threeInstance: ThreeInstance, images: Texture[], loop?: boolean) {
    this.threeInstance = threeInstance;
    this.loop = loop || this.loop;
    this.drawModels(images);
  }

  get totalModels() {
    return Object.keys(this.models).length;
  }

  makeMaterial(texture: Texture, normalMode: boolean) {
    return new MeshBasicMaterial({
      map: texture,
      side: DoubleSide,
      transparent: true,
      color: 0xffffff,
      blending: normalMode ? NormalBlending : AdditiveBlending,
    });
  }

  drawModels(images: Texture[]) {
    // Reset models.
    Object.keys(this.models).forEach((key: any) => {
      this.threeInstance.scene.remove(this.models[key].group);
    });
    this.models = {};

    // Add new models.
    Object.keys(images).forEach((key: any) => {
      const texture = images[key];
      const ratio = texture.image.height / texture.image.width;

      const group = new Group();
      const geometry = new PlaneGeometry(
        this.imageSize,
        this.imageSize * ratio
      );

      const numberOfImagesRepeated = Math.ceil(Math.random() * 4) + 1;
      for (let i = 0; i < numberOfImagesRepeated; i++) {
        const material = this.makeMaterial(
          texture,
          i === numberOfImagesRepeated - 1
        );
        const mesh = new Mesh(geometry, material);
        mesh.position.z -= this.imageGap * i;
        group.add(mesh);
      }

      this.models[key] = {
        group,
      };
    });

    // Set loop.
    if (this.loop) {
      const clone = {
        group: this.models[0].group.clone(),
        direction: this.models[0].direction,
      };
      this.models["clone"] = clone;
    }
  }

  placeModels(helixCurve: HelixCurve) {
    Object.keys(this.models).forEach((key: any, index: number) => {
      const { group } = this.models[key];
      const alpha = index / (this.totalModels - 1);
      const mappedAlpha = map(alpha, 0, 1, 0.05, 0.95);
      const point = helixCurve.getPointAt(mappedAlpha);

      const center = new Vector3(0, point.y, 0);
      const direction = point.clone().sub(center).normalize();
      this.models[key].direction = point.clone().add(direction);
      group.position.copy(point);

      this.threeInstance.scene.add(group);
    });

    document.body.style.height = this.totalModels * 100 + "vh";
  }

  update() {
    const cameraPos = this.threeInstance.cameraManager.camera.position.clone();

    Object.keys(this.models).forEach((key: any) => {
      const { group, direction } = this.models[key];
      if (!this.lookAtCamera && direction) group.lookAt(direction);
      else group.lookAt(cameraPos);
    });

    // this.models.forEach((model) => {
    //   const pos = model.position.clone();
    //   const fakeCameraPos = cameraPos;
    //   if (this.fixLookAtAxis) fakeCameraPos.y = pos.y;
    //   // model.lookAt(fakeCameraPos);
    // });
  }
}
